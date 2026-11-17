import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, query, where, limit } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";
import bcrypt from 'bcryptjs';

// 1/4 Read - dohvati sve operatere (bez lozinki)
async function get() {
    try {
        const skupOperatera = collection(getFirebaseDB(), PrefixStorage.OPERATERI);
        const snapshot = await getDocs(skupOperatera);

        const data = snapshot.docs.map(doc => {
            const operater = doc.data();
            return {
                sifra: doc.id,
                email: operater.email,
                uloga: operater.uloga
            };
        });

        return { success: true, data: data };
    } catch (e) {
        console.error("Greška kod dohvaćanja operatera: ", e);
        return { success: false, message: e.message };
    }
}

// Dohvati jednog operatera po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OPERATERI, sifra);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    email: data.email,
                    uloga: data.uloga
                }
            };
        }
        return { success: false, message: "Operater nije pronađen" };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 2/4 Create - dodaj novog operatera
async function dodaj(operater) {
    try {
        const hashiranaLozinka = bcrypt.hashSync(operater.lozinka, 10);
        const noviOperater = {
            email: operater.email,
            uloga: operater.uloga,
            lozinka: hashiranaLozinka
        };
        const skupOperatera = collection(getFirebaseDB(), PrefixStorage.OPERATERI);
        const docRef = await addDoc(skupOperatera, noviOperater);
        return {
            success: true,
            data: { sifra: docRef.id, email: operater.email }
        };
    } catch (e) {
        console.error("Greška kod dodavanja operatera: ", e);
        return { success: false, message: e.message };
    }
}

// Dodaj operatera BEZ hashiranja (za generiranje početnih podataka)
async function dodajBezHash(operater) {
    try {
        const noviOperater = {
            email: operater.email,
            uloga: operater.uloga,
            lozinka: operater.lozinka
        };
        const skupOperatera = collection(getFirebaseDB(), PrefixStorage.OPERATERI);
        const docRef = await addDoc(skupOperatera, noviOperater);
        return {
            success: true,
            data: { sifra: docRef.id, email: operater.email }
        };
    } catch (e) {
        console.error("Greška kod dodavanja operatera (bez hash): ", e);
        return { success: false, message: e.message };
    }
}

// 3/4 Update - promijeni postojećeg operatera
async function promijeni(sifra, operater) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OPERATERI, sifra);
        await updateDoc(docRef, {
            email: operater.email,
            uloga: operater.uloga
        });

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene operatera: ", e);
        return { success: false, message: e.message };
    }
}

// Promjena lozinke (hashira novu lozinku)
async function promjeniLozinku(sifra, novaLozinka) {
    try {
        const hashiranaLozinka = bcrypt.hashSync(novaLozinka, 10);
        const docRef = doc(getFirebaseDB(), PrefixStorage.OPERATERI, sifra);

        await updateDoc(docRef, {
            lozinka: hashiranaLozinka
        });

        return { success: true, message: "Lozinka uspješno promijenjena" };
    } catch (e) {
        console.error("Greška kod promjene lozinke: ", e);
        return { success: false, message: e.message };
    }
}

// 4/4 Delete - obriši operatera
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OPERATERI, sifra);
        await deleteDoc(docRef);
        return { success: true, message: "Operater obrisan" };
    } catch (e) {
        console.error("Greška kod brisanja operatera: ", e);
        return { success: false, message: e.message };
    }
}

// Prijava - traži operatera po emailu i provjerava lozinku
async function prijava(email, lozinka) {
    try {
        const skupOperatera = collection(getFirebaseDB(), PrefixStorage.OPERATERI);

        const q = query(skupOperatera, where("email", "==", email), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, message: "Email i lozinka ne odgovaraju" };
        }

        const operaterDoc = querySnapshot.docs[0];
        const operaterPodaci = operaterDoc.data();
        const isMatch = bcrypt.compareSync(lozinka, operaterPodaci.lozinka);

        if (!isMatch) {
            return { success: false, message: "Email i lozinka ne odgovaraju" };
        }

        return {
            success: true,
            data: {
                sifra: operaterDoc.id,
                email: operaterPodaci.email,
                uloga: operaterPodaci.uloga
            }
        };
    } catch (e) {
        console.error("Greška kod prijave: ", e);
        return { success: false, message: "Greška kod prijave: " + e.message };
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    promjeniLozinku,
    obrisi,
    prijava,
    dodajBezHash
};