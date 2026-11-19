import { Button, Container } from "react-bootstrap";

import { svirke } from "../services/svirke/SvirkaPodaci";
import { pjesme } from "../services/pjesme/PjesmePodaci";
import { lokacije } from "../services/lokacije/LokacijePodaci";
import { operateri } from "../services/operateri/OperaterPodaci";
import { galerija } from "../services/galerija/GalerijaPodaci";
import OperaterServiceFireBase from "../services/operateri/OperaterServiceFireBase";
import GalerijaServiceFirebase from "../services/galerija/GalerijaServiceFirebase";
import LokacijeServiceFirebase from "../services/lokacije/LokacijeServiceFirebase";
import PjesmeServiceFirebase from "../services/pjesme/PjesmeServiceFirebase";
import SvirkaServiceFirebase from "../services/svirke/SvirkaServiceFirebase";
import useLoading from "../hooks/useLoading";


export default function GeneriranjePodataka() {

    const { showLoading, hideLoading } = useLoading()
    
    async function prebaciMemorijaULocalStorage() {
        localStorage.setItem('svirke',JSON.stringify(svirke))
        localStorage.setItem('pjesme',JSON.stringify(pjesme))
        localStorage.setItem('lokacije',JSON.stringify(lokacije))
        localStorage.setItem('galerija',JSON.stringify(galerija))
        localStorage.setItem('operateri',JSON.stringify(operateri))

        alert('Uspješno prebačeno')
    }
   

    const prebaciMemorijaUFirebase = async () => {
    if (!window.confirm('Jeste li sigurni da želite pretočiti iz memorije u firebase?')) {
        return;
    }

    showLoading()

    try {
        // 1. Operateri (mogu ići paralelno jer ne trebamo njihove ID-ove za kasnije)
        const operateriPromises = operateri.map(e => {
            const { sifra, ...ostatak } = e;
            return OperaterServiceFireBase.dodajBezHash(ostatak);
        });
        await Promise.all(operateriPromises);


        // 2. Galerija (može ići paralelno jer nijedan drugi entitet ne ovisi o njenim šiframa)
        const galerijaPromises = galerija.map(e => {
            const { sifra, ...ostatak } = e;
            return GalerijaServiceFirebase.dodaj(ostatak);
        });
        await Promise.all(galerijaPromises);


        // 3. Lokacije (trebamo nove Firebase ID-ove za svirke)
        let mapiranjeSifriLokacija = [];
        for (const e of lokacije) {
            const { sifra, ...ostatak } = e;
            const fb = await LokacijeServiceFirebase.dodaj(ostatak);
            const noviId = fb.id;
            mapiranjeSifriLokacija.push({ sifram: sifra, sifraf: noviId });
        }


        // 4. Pjesme (trebamo nove Firebase ID-ove za svirke)
        let mapiranjeSifriPjesama = [];
        for (const e of pjesme) {
            const { sifra, ...ostatak } = e;
            const fb = await PjesmeServiceFirebase.dodaj(ostatak);
            const noviId = fb.id;
            mapiranjeSifriPjesama.push({ sifram: sifra, sifraf: noviId });
        }


        // 5. Svirke (povezivanje starih šifri lokacije i pjesama s novim Firebase ID-ovima)
        for (const e of svirke) {
            const { sifra, ...ostatak } = e;

            // Pronađi novi ID lokacije
            const mLokacija = mapiranjeSifriLokacija.find(m => m.sifram == ostatak.lokacija);
            ostatak.lokacija = mLokacija ? mLokacija.sifraf : null;

            // Mapiraj pjesme na njihove nove ID-ove
            ostatak.pjesme = (ostatak.pjesme || []).map(pSifra => {
                const mPjesma = mapiranjeSifriPjesama.find(m => m.sifram == pSifra);
                return mPjesma ? mPjesma.sifraf : null;
            }).filter(id => id !== null);

            await SvirkaServiceFirebase.dodaj(ostatak);
        }



    } catch (error) {
        console.error("Greška pri presipanju:", error);
        
    } finally {
       hideLoading()
    }
};

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            
            <p className="text-muted">
                Koristite ovaj alat za generiranje podataka.
            </p>

            <Button onClick={()=>prebaciMemorijaULocalStorage()}>
                Prebaci iz memorije u LocalStorage
            </Button>

             <Button onClick={()=>prebaciMemorijaUFirebase()}>
                Prebaci iz memorije u Firebase
            </Button>

           
        </Container>
    );
}
