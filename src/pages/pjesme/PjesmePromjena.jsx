import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import LokacijeService from "../../services/lokacije/LokacijeService";
import { useEffect, useState } from "react";


export default function LokacijePromjena() {
  const navigate = useNavigate()
    const params = useParams()
    const [lokacija, setLokacija] = useState({})

    useEffect(()=>{
        ucitajLokaciju()
    },[])

    async function ucitajLokaciju(){
        await LokacijeService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            setLokacija(s)
        })
    }
    

    async function promijeni(lokacija) {
        await LokacijeService.promijeni(params.sifra, lokacija).then(()=>{
            navigate(RouteNames.LOKACIJE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            klub: podaci.get('klub'),
            grad: podaci.get('grad')

        })
    }

    return (
        <>
            <h3>
                Unos nove Lokacije
            </h3>

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="klub">
                    <Form.Label>Klub</Form.Label>
                    <Form.Control type="text" name="klub" required 
                    defaultValue={lokacija.klub}/>
                </Form.Group>

                <Form.Group controlId="grad">
                    <Form.Label>Grad</Form.Label>
                    <Form.Control type="text" name="grad" required 
                    defaultValue={lokacija.grad}/>
                </Form.Group>
                



                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.LOKACIJE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni lokaciju
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}