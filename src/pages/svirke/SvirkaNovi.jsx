import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SvirkaService from "../../services/svirke/SvirkaService";
import { useEffect, useEffectEvent, useState } from "react";
import LokacijeService from "../../services/lokacije/LokacijeService";


export default function SvirkaNovi() {

    const navigate = useNavigate()
    const [lokacije, setLokacije] = useState([])

    async function ucitajLokacije() {
        await LokacijeService.get().then((odgovor) => {
            //console.table(odgovor.data)
            setLokacije(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajLokacije()
    }, [])

    async function dodaj(svirka) {
        await SvirkaService.dodaj(svirka).then(() => {
            navigate(RouteNames.SVIRKE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            lokacija: parseInt(podaci.get('lokacija')),
            cijena: parseFloat(podaci.get('cijena')),
            datum: new Date(podaci.get('datum')).toISOString(),
            odrzana: podaci.get('odrzana') === 'on'

        })
    }

    return (
        <>
            <h3>
                Unos nove Svirke
            </h3>

            <Form onSubmit={odradiSubmit}>

                <Row>
                    <Col>
                        <Form.Group controlId="lokacija">
                            <Form.Label>Lokacije</Form.Label>
                            <Form.Select name="lokacija" required>
                                <option value="">Odaberite lokaciju</option>
                                {lokacije && lokacije.map((lokacija) => (
                                    <option value={lokacija.sifra} key={lokacija.sifra}>
                                        {lokacija.klub} ({lokacija.grad})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="cijena">
                            <Form.Label>Cijena</Form.Label>
                            <Form.Control type="number" name="cijena" />
                        </Form.Group>

                        <Form.Group controlId="datum">
                            <Form.Label>Datum</Form.Label>
                            <Form.Control type="date" name="datum" />
                        </Form.Group>

                        <Form.Group controlId="odrzana" className="mt-3">
                            <Form.Check label="Održana" name="odrzana" />
                        </Form.Group>
                    </Col>
                    <Col>
                        Ovdje dođe odabir pjesama
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.SVIRKE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novu svirku
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}