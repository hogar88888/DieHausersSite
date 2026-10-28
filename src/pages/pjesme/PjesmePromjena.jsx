import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import PjesmeService from "../../services/pjesme/PjesmeService";
import { useEffect, useState } from "react";


export default function PjesmePromjena() {
  const navigate = useNavigate()
    const params = useParams()
    const [pjesma, setPjesma] = useState({})

    useEffect(()=>{
        ucitajPjesmu()
    },[])

    async function ucitajPjesmu(){
        await PjesmeService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            setPjesma(s)
        })
    }
    

    async function promijeni(pjesma) {
        await PjesmeService.promijeni(params.sifra, pjesma).then(()=>{
            navigate(RouteNames.PJESME)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naslov: podaci.get('naslov'),
            trajanje: podaci.get('trajanje')

        })
    }

    return (
        <>
            <h3>
                Unos nove Pjesme
            </h3>

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naslov">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control type="text" name="naslov" required 
                    defaultValue={pjesma.naslov}/>
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="text" name="trajanje" required 
                    defaultValue={pjesma.trajanje}/>
                </Form.Group>
                



                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.PJESME} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni pjesmu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}