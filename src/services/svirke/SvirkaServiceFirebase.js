import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

// 1/4 Read - dohvati sve
async function get() {
    try {
        const skupSvirki = collection(getFirebaseDB(), PrefixStorage.SVIRKE);
        const snapshot = await getDocs(skupSvirki);
        
        const data = snapshot.docs.map(doc => {
            const podaci = doc.data();
            const d = podaci.datum ? podaci.datum.toDate() : new Date();
            
            return {
                sifra: doc.id,
                ...podaci,
                datum: d.toISOString(),
                pjesme: podaci.pjesme || []
            };
        });
        
        return { success: true, data: data };
    } catch (e) {
        console.error("Greška kod dohvaćanja svirki: ", e);
        return { success: false, message: e.message };
    }
}

// Dohvati jednu po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SVIRKE, sifra);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const podaci = docSnap.data();
            const d = podaci.datum ? podaci.datum.toDate() : new Date();
            
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...podaci,
                    datum: d.toISOString(),
                    pjesme: podaci.pjesme || []
                }
            };
        } else {
            return { success: false, message: "Svirka s tom šifrom ne postoji." };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja svirke po šifri: ", e);
        return { success: false, message: e.message };
    }
}

// 2/4 Create - dodaj novu
async function dodaj(svirka) {
    try {
        const podaciZaSpremanje = {
            ...svirka,
            pjesme: svirka.pjesme || []
        };

        if (podaciZaSpremanje.datum) {
            podaciZaSpremanje.datum = Timestamp.fromDate(new Date(podaciZaSpremanje.datum));
        }

        const skupSvirki = collection(getFirebaseDB(), PrefixStorage.SVIRKE);
        const docRef = await addDoc(skupSvirki, podaciZaSpremanje);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja svirke: ", e);
        return { success: false, message: e.message };
    }
}

// 3/4 Update - promijeni postojeću
async function promijeni(sifra, svirka) {
    try {
        const podaciZaPromjenu = {
            ...svirka,
            pjesme: svirka.pjesme || []
        };

        if (podaciZaPromjenu.datum) {
            podaciZaPromjenu.datum = Timestamp.fromDate(new Date(podaciZaPromjenu.datum));
        }

        const docRef = doc(getFirebaseDB(), PrefixStorage.SVIRKE, sifra);
        await updateDoc(docRef, podaciZaPromjenu);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene svirke: ", e);
        return { success: false, message: e.message };
    }
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SVIRKE, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja svirke: ", e);
        return { success: false, message: e.message };
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
};