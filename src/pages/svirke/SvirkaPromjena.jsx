import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SvirkaService from "../../services/svirke/SvirkaService";
import { useEffect, useState } from "react";
import LokacijeService from "../../services/lokacije/LokacijeService";


export default function SvirkaPromjena() {
  const navigate = useNavigate()
    const params = useParams()
    const [svirka, setSvirka] = useState({})
    const [lokacije, setLokacije] = useState([])
    const [odrzana, setOdrzana] = useState(false)

    useEffect(()=>{
        ucitajLokacije()
        ucitajSvirku()
    },[])

    async function ucitajSvirku(){
        await SvirkaService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            s.datum = s.datum.substring(0,10)
            setSvirka(s)
            setOdrzana(s.odrzana)
        })
    }

     async function ucitajLokacije(){
                 await LokacijeService.get().then((odgovor)=>{
                     //console.table(odgovor.data)
                     setLokacije(odgovor.data)
                 })
             }
    
    

    async function promijeni(smjer) {
        await SvirkaService.promijeni(params.sifra, smjer).then(()=>{
            navigate(RouteNames.SVIRKE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
           lokacija: parseInt( podaci.get('lokacija')),
            cijena: parseFloat(podaci.get('cijena')),
            datum: new Date(podaci.get('datum')).toISOString(),
            odrzana: odrzana
        })
    }

    return (
        <>
            <h3>
                Unos nove Svirke
            </h3>

            <Form onSubmit={odradiSubmit}>

                 <Form.Group controlId="lokacija">
                    <Form.Label>Lokacije</Form.Label>
                     <Form.Select name="lokacija" required
                     value={svirka.lokacija}
                    onChange={(e)=>{setSvirka({...svirka, lokacija: parseInt(e.target.value)})}}>
                        <option value="">Odaberite lokaciju</option>
                        {lokacije && lokacije.map((lokacija)=>(
                            <option value={lokacija.sifra} key={lokacija.sifra}>
                                {lokacija.klub} ({lokacija.grad})
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
               

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} 
                    defaultValue={svirka.cijena}/>
                </Form.Group>

                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="date" name="datum" 
                    defaultValue={svirka.datum}/>
                </Form.Group>

                <Form.Group controlId="odrzana" className="mt-3">
                    <Form.Check label="Održana" name="odrzana"
                    checked={odrzana} 
                    onChange={(e)=>setOdrzana(e.target.checked)}/>
                </Form.Group>




                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.SVIRKE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni svirku
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}