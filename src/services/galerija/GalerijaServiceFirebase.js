import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

async function get() {
    const skupGalerija = collection(getFirebaseDB(), PrefixStorage.GALERIJA);
    const galerijaSnapshot = await getDocs(skupGalerija);
    return {
        success: true,
        data: galerijaSnapshot.docs.map(doc => {
            const data = doc.data();
            const d = data.datum ? data.datum.toDate() : new Date();
            const isoDatum = d.toISOString();
            return {
                sifra: doc.id,
                ...data,
                datum: isoDatum
            };
        })
    };
}

async function dodaj(galerija) {
    const dateObj = new Date(galerija.datum);
    const firestoreTimestamp = Timestamp.fromDate(dateObj);
    const podaciZaSpremanje = {
        ...galerija,
        datum: firestoreTimestamp
    };
    try {
        const skupGalerija = collection(getFirebaseDB(), PrefixStorage.GALERIJA);
        const docRef = await addDoc(skupGalerija, podaciZaSpremanje);

        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.GALERIJA, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const d = data.datum ? data.datum.toDate() : new Date();
            const isoDatum = d.toISOString();

            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...data,
                    datum: isoDatum
                }
            };
        } else {
            return {
                success: false,
                message: "Stavka galerije s tom šifrom ne postoji u bazi."
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function promijeni(sifra, galerija) {
    try {
        const dateObj = new Date(galerija.datum);
        const firestoreTimestamp = Timestamp.fromDate(dateObj);
        const podaciZaPromjenu = {
            ...galerija,
            datum: firestoreTimestamp
        };
        const docRef = doc(getFirebaseDB(), PrefixStorage.GALERIJA, sifra);
        await updateDoc(docRef, podaciZaPromjenu);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.GALERIJA, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

export default {
    get,
    dodaj,
    promijeni,
    getBySifra,
    obrisi
}