import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

async function get() {
    const skupPjesama = collection(getFirebaseDB(), PrefixStorage.PJESME);
    const pjesmeSnapshot = await getDocs(skupPjesama);
    return {
        success: true,
        data: pjesmeSnapshot.docs.map(doc => {
            return {
                sifra: doc.id,
                ...doc.data()
            };
        })
    };
}

async function dodaj(pjesma) {
    try {
        const skupPjesama = collection(getFirebaseDB(), PrefixStorage.PJESME);
        const docRef = await addDoc(skupPjesama, pjesma);

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
        const docRef = doc(getFirebaseDB(), PrefixStorage.PJESME, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...docSnap.data()
                }
            };
        } else {
            return {
                success: false,
                message: "Pjesma s tom šifrom ne postoji u bazi."
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

async function promijeni(sifra, pjesma) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.PJESME, sifra);
        await updateDoc(docRef, pjesma);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.PJESME, sifra);
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