import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SvirkaService from "../../services/svirke/SvirkaService";


export default function SvirkaNovi() {

    const navigate = useNavigate()

    async function dodaj(svirka) {
        await SvirkaService.dodaj(svirka).then(() => {
            navigate(RouteNames.SVIRKE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            mjesto: podaci.get('mjesto'),
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
                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control type="text" name="mjesto" required />
                </Form.Group>


                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} />
                </Form.Group>

                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="date" name="datum" />
                </Form.Group>

                <Form.Group controlId="odrzana" className="mt-3">
                    <Form.Check label="Održana" name="odrzana" />
                </Form.Group>




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