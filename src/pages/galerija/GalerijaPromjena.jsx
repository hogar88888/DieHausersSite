import { useEffect, useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import GalerijaService from "../../services/galerija/GalerijaService"
import { FaImage } from "react-icons/fa"


export default function GalerijaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [fotografija, setFotografija] = useState({})
    const [previewSlika, setPreviewSlika] = useState('')

    useEffect(() => {
        ucitajFotografiju()
    }, [])

    async function ucitajFotografiju() {
        await GalerijaService.getBySifra(params.sifra).then((odgovor) => {
            const f = odgovor.data
            setFotografija(f)
            if (f.slika) {
                setPreviewSlika(f.slika)
            }
        })
    }

    function obradiFile(e) {
        const file = e.target.files[0]
        if (!file) return

        const dozvoljeniTipovi = ['image/jpeg', 'image/png', 'image/webp']
        if (!dozvoljeniTipovi.includes(file.type)) {
            alert('Dozvoljeni formati: JPEG, PNG, WebP')
            e.target.value = ''
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Greška: slika je prevelika. Maksimalna veličina je 5MB.')
            e.target.value = ''
            return
        }

        const reader = new FileReader()
        reader.onload = function (ev) {
            setPreviewSlika(ev.target.result)
        }
        reader.readAsDataURL(file)
    }

    async function promijeni(fotografija) {
        await GalerijaService.promijeni(params.sifra, fotografija).then(() => {
            navigate(RouteNames.GALERIJA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        if (!previewSlika) {
            alert('Molimo odaberite sliku za upload.')
            return
        }

        promijeni({
            naziv: podaci.get('naziv'),
            slika: previewSlika,
            opis: podaci.get('opis'),
            datum: podaci.get('datum')
        })
    }

    return (
        <>
            <h3>Promjena fotografije</h3>

            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Form.Group controlId="naziv">
                                    <Form.Label>Naziv fotografije</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="naziv"
                                        required
                                        defaultValue={fotografija.naziv}
                                        placeholder="npr. Bend na Sibiru 2026"
                                    />
                                </Form.Group>

                                <Form.Group controlId="slika">
                                    <Form.Label>Zamijeni sliku</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="slika"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={obradiFile}
                                    />
                                    <Form.Text muted>Dozvoljeni formati: JPEG, PNG, WebP (max 5MB)</Form.Text>
                                </Form.Group>

                                <div className="mt-3 mb-3">
                                    {previewSlika ? (
                                        <img
                                            src={previewSlika}
                                            alt="Preview"
                                            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', border: '1px solid #dee2e6', borderRadius: '4px' }}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center" style={{ height: '150px', background: '#f8f9fa', borderRadius: '4px' }}>
                                            <FaImage size={48} className="text-muted" />
                                        </div>
                                    )}
                                </div>

                                <Form.Group controlId="opis">
                                    <Form.Label>Opis (opcionalno)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="opis"
                                        rows={3}
                                        defaultValue={fotografija.opis}
                                        placeholder="npr. Live nastup na festivalu Sibir, Subotica"
                                    />
                                </Form.Group>

                                <Form.Group controlId="datum">
                                    <Form.Label>Datum</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="datum"
                                        required
                                        defaultValue={fotografija.datum ? fotografija.datum.substring(0, 10) : ''}
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.GALERIJA} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Spremi promjene
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}