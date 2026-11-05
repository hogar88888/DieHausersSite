import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GalerijaService from "../../services/galerija/GalerijaService"
import { FaImage } from "react-icons/fa"


export default function GalerijaNovi() {

    const navigate = useNavigate()
    const [previewSlika, setPreviewSlika] = useState('')
    const [danasnjiDatum, setDanasnjiDatum] = useState(new Date().toISOString().substring(0, 10))

    function obradiFile(e) {
        const file = e.target.files[0]
        if (!file) return

        // Validacija tipa fajla
        const dozvoljeniTipovi = ['image/jpeg', 'image/png', 'image/webp']
        if (!dozvoljeniTipovi.includes(file.type)) {
            alert('Dozvoljeni formati: JPEG, PNG, WebP')
            e.target.value = ''
            return
        }

        // Validacija veličine (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Greška: slika je prevelika. Maksimalna veličina je 5MB.')
            e.target.value = ''
            return
        }

        // Čitaj kao base64
        const reader = new FileReader()
        reader.onload = function (ev) {
            setPreviewSlika(ev.target.result)
        }
        reader.readAsDataURL(file)
    }

    async function dodaj(fotografija) {
        await GalerijaService.dodaj(fotografija).then(() => {
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

        dodaj({
            naziv: podaci.get('naziv'),
            slika: previewSlika,
            opis: podaci.get('opis'),
            datum: podaci.get('datum')
        })
    }

    return (
        <>
            <h3>Unos nove fotografije</h3>

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
                                        placeholder="npr. Bend na Sibiru 2026"
                                    />
                                </Form.Group>

                                <Form.Group controlId="slika">
                                    <Form.Label>Slika</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="slika"
                                        required
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={obradiFile}
                                    />
                                    <Form.Text muted>Dozvoljeni formati: JPEG, PNG, WebP (max 5MB)</Form.Text>
                                </Form.Group>

                                {/* Preview slike */}
                                {previewSlika ? (
                                    <div className="mt-3 mb-3">
                                        <img
                                            src={previewSlika}
                                            alt="Preview"
                                            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', border: '1px solid #dee2e6', borderRadius: '4px' }}
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-3 mb-3 d-flex align-items-center justify-content-center" style={{ height: '150px', background: '#f8f9fa', borderRadius: '4px' }}>
                                        <FaImage size={48} className="text-muted" />
                                    </div>
                                )}

                                <Form.Group controlId="opis">
                                    <Form.Label>Opis (opcionalno)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="opis"
                                        rows={3}
                                        placeholder="npr. Live nastup na festivalu Sibir, Subotica"
                                    />
                                </Form.Group>

                                <Form.Group controlId="datum">
                                    <Form.Label>Datum</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="datum"
                                        required
                                        defaultValue={danasnjiDatum}
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
                            Dodaj fotografiju
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}