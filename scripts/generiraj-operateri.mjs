// Pokretanje:  node --env-file=.env scripts/generiraj-operateri.mjs
// Dodaje početne operatere (admin + operater) u Firestore kolekciju "operateri".
// Idempotentno — ako kolekcija već ima dokumenata, preskače se.
// Lozinke su prethodno hashirane (bcryptjs) u OperaterPodaci.js (lozinka: "Edunova123!")

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
import { PrefixStorage } from "../src/constants.js";
import { operateri } from "../src/services/operateri/OperaterPodaci.js";

const config = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const nedostaje = Object.entries(config).filter(([_, v]) => !v).map(([k]) => k);
if (nedostaje.length) {
    console.error("❌ Nedostajuće Firebase varijable u .env:", nedostaje.join(", "));
    process.exit(1);
}

const app = initializeApp(config);
const db = getFirestore(app);
const kolekcija = collection(db, PrefixStorage.OPERATERI);

const postojece = await getDocs(kolekcija);
if (!postojece.empty) {
    console.log(`Kolekcija '${PrefixStorage.OPERATERI}' već ima ${postojece.size} dokumenata — preskačem generiranje.`);
    process.exit(0);
}

for (const operater of operateri) {
    const { sifra, ...podaci } = operater; // sifra dolazi iz doc.id u Firestore verziji
    const noviRef = await addDoc(kolekcija, podaci);
    console.log(`✅ Dodan: ${operater.email} (uloga: ${operater.uloga}, id: ${noviRef.id})`);
}

console.log(`\nKraj — u Firestore je dodano ${operateri.length} operatera. Lozinka za sve: "Edunova123!"`);
process.exit(0);
