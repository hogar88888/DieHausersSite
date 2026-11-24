import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { RouteNames } from "../../constants";
import LokacijeService from "../../services/lokacije/LokacijeService";

// Ispravak za prikaz defaultne Leaflet ikone markera u Reactu
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Pomoćna komponenta koja pomiče centar karte kad se učitaju podaci s servera
// i sluša klikove za postavljanje nove pozicije markera
function OdabirNaKarti({ lat, lon, postaviKoordinate }) {
    const map = useMap();

    useEffect(() => {
        if (lat && lon) {
            map.setView([lat, lon], map.getZoom());
        }
    }, [lat, lon, map]);

    useMapEvents({
        click(e) {
            postaviKoordinate(e.latlng.lat, e.latlng.lng);
        },
    });

    return lat && lon ? <Marker position={[lat, lon]} /> : null;
}

export default function LokacijePromjena() {
    const navigate = useNavigate();
    const params = useParams();
    
    const [lokacija, setLokacija] = useState({});
    // Početni fallback (Osijek) dok se podaci ne učitaju s servera
    const [lat, setLat] = useState(45.5550);
    const [lon, setLon] = useState(18.6955);

    useEffect(() => {
        ucitajLokaciju();
    }, []);

    async function ucitajLokaciju() {
        await LokacijeService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data;
            setLokacija(s);
            if (s.lat) setLat(s.lat);
            if (s.lon) setLon(s.lon);
        });
    }

    function postaviKoordinate(noviLat, noviLon) {
        setLat(noviLat);
        setLon(noviLon);
    }

    async function promijeni(podaciLokacije) {
        await LokacijeService.promijeni(params.sifra, podaciLokacije).then(() => {
            navigate(RouteNames.LOKACIJE);
        });
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        const lat = parseFloat(podaci.get('lat'));
        const lon = parseFloat(podaci.get('lon'));
        if (Number.isNaN(lat) || Number.isNaN(lon)) {
            alert('Geografska širina (lat) i dužina (lon) moraju biti ispravni brojevi!');
            return;
        }

        promijeni({
            klub: podaci.get('klub'),
            grad: podaci.get('grad'),
            lat: lat,
            lon: lon
        });
    }

    return (
        <Row>
            <Col xl={4}>
                <h3>Promjena Lokacije</h3>

                <Form onSubmit={odradiSubmit}>
                    <Form.Group controlId="klub">
                        <Form.Label>Klub</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="klub" 
                            required 
                            defaultValue={lokacija.klub} 
                        />
                    </Form.Group>

                    <Form.Group controlId="grad">
                        <Form.Label>Grad</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="grad" 
                            required 
                            defaultValue={lokacija.grad} 
                        />
                    </Form.Group>

                    <Form.Group controlId="lat">
                        <Form.Label>LAT</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="lat" 
                            step="any" 
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="lon">
                        <Form.Label>LON</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="lon" 
                            step="any" 
                            value={lon}
                            onChange={(e) => setLon(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="mt-4">
                        <Col>
                            <Link to={RouteNames.LOKACIJE} className="btn btn-danger">
                                Odustani
                            </Link>
                        </Col>
                        <Col>
                            <Button type="submit" variant="success">
                                Promijeni lokaciju
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>

            <Col xl={8}>
                <h5>Odabir lokacije (kliknite na kartu)</h5>
                <MapContainer 
                    center={[lat, lon]} 
                    zoom={13} 
                    style={{ height: "450px", width: "100%", borderRadius: "8px" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <OdabirNaKarti 
                        lat={lat} 
                        lon={lon} 
                        postaviKoordinate={postaviKoordinate} 
                    />
                </MapContainer>
            </Col>
        </Row>
    );
}