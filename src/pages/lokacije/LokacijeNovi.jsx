import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import LokacijeService from "../../services/lokacije/LokacijeService";


export default function SvirkaNovi() {

    const navigate = useNavigate()

    async function dodaj(lokacija) {
        await LokacijeService.dodaj(lokacija).then(() => {
            navigate(RouteNames.LOKACIJE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            klub: podaci.get('mjesto'),
            grad: parseFloat(podaci.get('cijena')),
            

        })
    }

    return (
        <>
            <h3>
                Unos nove Svirke
            </h3>

            <Form onSubmit={odradiSubmit}>

               
                <Form.Group controlId="klub">
                    <Form.Label>Klub</Form.Label>
                    <Form.Control type="text" name="klub" required />
                </Form.Group>


                <Form.Group controlId="grad">
                    <Form.Label>Grad</Form.Label>
                    <Form.Control type="number" name="grad" step={0.01} />
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