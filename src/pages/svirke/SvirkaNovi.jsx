import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SvirkaService from "../../services/svirke/SvirkaService";
import { useEffect, useEffectEvent, useState } from "react";
import LokacijeService from "../../services/lokacije/LokacijeService";
import PjesmeService from "../../services/pjesme/PjesmeService";


export default function SvirkaNovi() {

    const navigate = useNavigate()
    const [lokacije, setLokacije] = useState([])
    const [pjesme, setPjesme] = useState([])
    const [odabraniPjesme, setOdabraniPjesme] = useState([])
    const [pretragaPjesme, setPretragaPjesme] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)


    async function ucitajLokacije() {
        await LokacijeService.get().then((odgovor) => {
            //console.table(odgovor.data)
            setLokacije(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajPjesme()
        ucitajLokacije()
    }, [])

    async function dodaj(svirka) {
        await SvirkaService.dodaj(svirka).then(() => {
            navigate(RouteNames.SVIRKE)
        })
    }

      async function ucitajPjesme() {
        await PjesmeService.get().then((odgovor) => {
            setPjesme(odgovor.data)
        })
    }

    function dodajPjesmu(pjesma) {
        if (!odabraniPjesme.find(p => p.sifra === pjesma.sifra)) {
            setOdabraniPjesme([...odabraniPjesme, pjesma])
        }
        setPretragaPjesme('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniPjesmu(sifra) {
        setOdabraniPjesme(odabraniPjesme.filter(p => p.sifra !== sifra))
    }

    function filtrirajPjesme() {
        if (!pretragaPjesme) return []
        return pjesme.filter(p =>
            !odabraniPjesme.find(op => op.sifra === p.sifra) &&
            (p.naslov.toLowerCase().includes(pretragaPjesme.toLowerCase()))
        )
    }

    function handleKeyDown(e) {
        const filtriranePjesme = filtrirajPjesme()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriranePjesme.length) {
                    return 0
                }
                return prev < filtriranePjesme.length - 1 ? prev + 1 : prev
            }

            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if(prev===0){
                    return filtriranePjesme.length-1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriranePjesme.length > 0) {
            e.preventDefault()
            dodajPjesmu(filtriranePjesme[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }

  

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            lokacija: parseInt(podaci.get('lokacija')),
            cijena: parseFloat(podaci.get('cijena')),
            datum: new Date(podaci.get('datum')).toISOString(),
            odrzana: podaci.get('odrzana') === 'on',
            pjesme: odabraniPjesme.map(p => p.sifra)

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
                         <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Set lista</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj pjesmu</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži pjesmaa..."
                                            value={pretragaPjesme}
                                            onChange={(e) => {
                                                setPretragaPjesme(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaPjesme.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajPjesme().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajPjesme().map((pjesma, index) => (
                                                    <div
                                                        key={pjesma.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajPjesmu(pjesma)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {pjesma.naslov} 
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih pjesmaa */}
                                    {odabraniPjesme.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Naslov</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraniPjesme.map(pjesma => (
                                                        <tr key={pjesma.sifra}>
                                                            <td>{pjesma.naslov}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniPjesmu(pjesma.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabraniPjesme.length === 0 && (
                                        <p className="text-muted">Nema odabranih pjesama</p>
                                    )}
                                </Card.Body>
                            </Card>
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