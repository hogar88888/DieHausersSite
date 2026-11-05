import { useEffect, useState } from "react"
import { Button, Card, Col, Row, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GalerijaService from "../../services/galerija/GalerijaService"
import FormatDatuma from "../../components/FormatDatuma"
import { FaImage } from "react-icons/fa"


export default function GalerijaPregled() {

    const [fotografije, setFotografije] = useState([])
    const [modalOtvoren, setModalOtvoren] = useState(false)
    const [odabranaSlika, setOdabranaSlika] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        ucitajFotografije()
    }, [])

    async function ucitajFotografije() {
        await GalerijaService.get().then((odgovor) => {
            setFotografije(odgovor.data)
        })
    }

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati ovu fotografiju?')) {
            return
        }
        await GalerijaService.obrisi(sifra)
        ucitajFotografije()
    }

    function otvoriModal(fotografija) {
        setOdabranaSlika(fotografija)
        setModalOtvoren(true)
    }

    function zatvoriModal() {
        setModalOtvoren(false)
        setOdabranaSlika(null)
    }

    return (
        <>
            <Link to={RouteNames.GALERIJA_NOVI}
                className="btn btn-success w-100 my-3">
                Dodaj novu fotografiju
            </Link>

            {fotografije.length === 0 ? (
                <div className="text-center my-5">
                    <FaImage size={64} className="text-muted mb-3" />
                    <p className="text-muted">Nema fotografija u galeriji.</p>
                </div>
            ) : (
                <Row>
                    {fotografije.map((fotografija) => (
                        <Col xs={12} md={6} lg={4} key={fotografija.sifra} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', cursor: 'pointer' }}
                                    src={fotografija.slika || undefined}
                                    alt={fotografija.naziv}
                                    onClick={() => otvoriModal(fotografija)}
                                />
                                {!fotografija.slika && (
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: '200px', background: '#f8f9fa', cursor: 'pointer' }} onClick={() => otvoriModal(fotografija)}>
                                        <FaImage size={64} className="text-muted" />
                                    </div>
                                )}
                                <Card.Body>
                                    <Card.Title className="fw-bold">{fotografija.naziv}</Card.Title>
                                    {fotografija.opis && (
                                        <Card.Text className="text-muted small">{fotografija.opis}</Card.Text>
                                    )}
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <FormatDatuma datum={fotografija.datum} />
                                    </Card.Subtitle>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Button size="sm" onClick={() => navigate(`/galerija/${fotografija.sifra}`)}>
                                        Promijeni
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => obrisi(fotografija.sifra)}>
                                        Obriši
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Lightbox Modal */}
            <Modal show={modalOtvoren} onHide={zatvoriModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{odabranaSlika?.naziv}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    {odabranaSlika?.slika ? (
                        <img
                            src={odabranaSlika.slika}
                            alt={odabranaSlika.naziv}
                            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                        />
                    ) : (
                        <div className="text-center text-muted">
                            <FaImage size={80} className="mb-3" />
                            <p>Nema slike</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {odabranaSlika?.opis && <span className="me-auto text-muted">{odabranaSlika.opis}</span>}
                    <Button variant="secondary" onClick={zatvoriModal}>
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}