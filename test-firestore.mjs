import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const isDocRef = (v) => v && typeof v === 'object' && typeof v.path === 'string' && typeof v.id === 'string';

const config = {
    apiKey: "AIzaSyB8ac5ah89wyh1etN6UgbPdA6KIr68FDNU",
    authDomain: "edunovafd1.firebaseapp.com",
    projectId: "edunovafd1",
    storageBucket: "edunovafd1.firebasestorage.app",
    messagingSenderId: "1046693539769",
    appId: "1:1046693539769:web:2795e405d0d9566e2619b1"
};

const app = initializeApp(config);
const db = getFirestore(app);

const svirke = (await getDocs(collection(db, 'e7.svirke'))).docs.map(d => ({ id: d.id, data: d.data() }));
console.log('=== SVIRKE (' + svirke.length + ') ===');
for (const s of svirke) {
    const { datum, ...ostalo } = s.data;
    const lok = s.data.lokacija;
    console.log(s.id, JSON.stringify(ostalo, (k, v) => isDocRef(v) ? 'REF[' + v.path + ']' : v));
    if (lok) console.log('   lokacija field type:', typeof lok, isDocRef(lok) ? 'isDocRef' : lok);
}

const lokacije = (await getDocs(collection(db, 'e7.lokacije'))).docs.map(d => ({ id: d.id, data: d.data() }));
console.log('\n=== LOKACIJE (' + lokacije.length + ') ===');
for (const l of lokacije) {
    const { datum, ...ostalo } = l.data;
    console.log(l.id, JSON.stringify(ostalo));
}