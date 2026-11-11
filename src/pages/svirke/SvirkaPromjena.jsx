import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SvirkaService from "../../services/svirke/SvirkaService";
import { useEffect, useState } from "react";
import LokacijeService from "../../services/lokacije/LokacijeService";
import PjesmeService from "../../services/pjesme/PjesmeService";
import { useTranslation } from "../../services/i18n/i18nService";


export default function SvirkaPromjena() {
    const navigate = useNavigate()
    const params = useParams()
    const { t } = useTranslation()
    const [svirka, setSvirka] = useState({})
    const [lokacije, setLokacije] = useState([])
    const [odrzana, setOdrzana] = useState(false)

    const [pjesme, setPjesme] = useState([])
    const [odabranePjesme, setOdabranePjesme] = useState([])
    const [pretragaPjesme, setPretragaPjesme] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

    useEffect(() => {
        ucitajSvirku()
        ucitajPjesme()
        ucitajLokacije()
        
    }, [])

    useEffect(() => {
        if (svirka.pjesme && pjesme.length > 0) {
            const odabrani = pjesme.filter(p => svirka.pjesme.includes(p.sifra))
            setOdabranePjesme(odabrani)
        }
    }, [svirka, pjesme])

    async function ucitajSvirku() {
        await SvirkaService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data
            s.datum = s.datum.substring(0, 10)
            setSvirka(s)
            setOdrzana(s.odrzana)
        })
    }

    async function ucitajLokacije() {
        await LokacijeService.get().then((odgovor) => {
            //console.table(odgovor.data)
            setLokacije(odgovor.data)
        })
    }



    async function promijeni(smjer) {
        await SvirkaService.promijeni(params.sifra, smjer).then(() => {
            navigate(RouteNames.SVIRKE)
        })
    }


     async function ucitajPjesme() {
            await PjesmeService.get().then((odgovor) => {
                setPjesme(odgovor.data)
            })
        }
    
        function dodajPjesmu(pjesma) {
            if (!odabranePjesme.find(p => p.sifra === pjesma.sifra)) {
                setOdabranePjesme([...odabranePjesme, pjesma])
            }
            setPretragaPjesme('')
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    
        function ukloniPjesmu(sifra) {
            setOdabranePjesme(odabranePjesme.filter(p => p.sifra !== sifra))
        }
    
        function filtrirajPjesme() {
            if (!pretragaPjesme) return []
            return pjesme.filter(p =>
                !odabranePjesme.find(op => op.sifra === p.sifra) &&
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
        promijeni({
            lokacija: parseInt(podaci.get('lokacija')),
            cijena: parseFloat(podaci.get('cijena')),
            datum: new Date(podaci.get('datum')).toISOString(),
            odrzana: odrzana,
            pjesme: odabranePjesme.map(p => p.sifra)
        })
    }

    return (
        <>
            <h3>
                {t('svirka.naslovNovi')}
            </h3>

            <Form onSubmit={odradiSubmit}>

                <Row>
                    <Col>
                        <Form.Group controlId="lokacija">
                            <Form.Label>{t('svirka.lokacija')}</Form.Label>
                            <Form.Select name="lokacija" required
                                value={svirka.lokacija}
                                onChange={(e) => { setSvirka({ ...svirka, lokacija: parseInt(e.target.value) }) }}>
                                <option value="">{t('svirka.odaberiLokaciju')}</option>
                                {lokacije && lokacije.map((lokacija) => (
                                    <option value={lokacija.sifra} key={lokacija.sifra}>
                                        {lokacija.klub} ({lokacija.grad})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group controlId="cijena">
                            <Form.Label>{t('svirka.cijena')}</Form.Label>
                            <Form.Control type="number" name="cijena" step={0.01}
                                value={svirka.cijena ?? ''}
                                onChange={(e) => { setSvirka({ ...svirka, cijena: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group controlId="datum">
                            <Form.Label>{t('svirka.datum')}</Form.Label>
                            <Form.Control type="date" name="datum"
                                value={svirka.datum ?? ''}
                                onChange={(e) => { setSvirka({ ...svirka, datum: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group controlId="odrzana" className="mt-3">
                            <Form.Check label={t('svirka.odrzana')} name="odrzana"
                                checked={odrzana}
                                onChange={(e) => setOdrzana(e.target.checked)} />
                        </Form.Group>

                    </Col>
                    <Col>
                         <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">{t('svirka.setLista')}</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">{t('svirka.dodajPjesmu')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={t('svirka.pretraziPjesmu')}
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
                                    {odabranePjesme.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>{t('svirka.naslov')}</th>
                                                        <th style={{ width: '80px' }}>{t('svirka.akcija')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabranePjesme.map(pjesma => (
                                                        <tr key={pjesma.sifra}>
                                                            <td>{pjesma.naslov}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniPjesmu(pjesma.sifra)}
                                                                >
                                                                    {t('svirka.obrisi')}
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabranePjesme.length === 0 && (
                                        <p className="text-muted">{t('svirka.nemaPjesama')}</p>
                                    )}
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.SVIRKE} className="btn btn-danger">
                            {t('svirka.odustani')}
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            {t('svirka.promijeniSvirku')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}