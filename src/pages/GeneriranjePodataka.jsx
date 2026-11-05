import { Button, Container } from "react-bootstrap";
import { svirke } from "../services/svirke/SvirkaPodaci";
import { pjesme } from "../services/pjesme/PjesmePodaci";
import { lokacije } from "../services/lokacije/LokacijePodaci";


export default function GeneriranjePodataka() {
    
    async function prebaci() {
        localStorage.setItem('svirke',JSON.stringify(svirke))
        localStorage.setItem('pjesme',JSON.stringify(pjesme))
        localStorage.setItem('lokacije',JSON.stringify(lokacije))
        alert('Uspješno prebačeno')
    }
   

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje podataka.
            </p>

            <Button onClick={()=>prebaci()}>
                Prebaci iz memorije u LocalStorage
            </Button>

           
        </Container>
    );
}
