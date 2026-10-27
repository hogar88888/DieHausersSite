import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import LokacijeService from "../../services/lokacije/PjesmeService";


export default function PjesmeNovi() {

    const navigate = useNavigate()

    async function dodaj(pjesma) {
        await PjesmeService.dodaj(pjesma).then(() => {
            navigate(RouteNames.PJESME)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            klub: podaci.get('klub'),
            grad: podaci.get('grad'),
            

        })
    }

    return (
        <>
            <h3>
                Unos nove pjesme
            </h3>

            <Form onSubmit={odradiSubmit}>

               
                <Form.Group controlId="klub">
                    <Form.Label>Klub</Form.Label>
                    <Form.Control type="text" name="klub" required />
                </Form.Group>


                <Form.Group controlId="grad">
                    <Form.Label>Grad</Form.Label>
                    <Form.Control type="text" name="grad"  />
                </Form.Group>


              


                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.PJESME} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novu pjesmu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}