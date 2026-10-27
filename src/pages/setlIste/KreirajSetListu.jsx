import React, { useState } from 'react';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';

export default function KreirajSetListu() {
  // Simulirani podaci pjesama benda Die Hausers
  const [svePjesme] = useState([
    { sifra: 1, naslov: "Noise in My Head", trajanje: "3:45" },
    { sifra: 2, naslov: "Distortion Wave", trajanje: "4:12" },
    { sifra: 3, naslov: "Feedback Loop", trajanje: "2:58" },
    { sifra: 4, naslov: "Industrial Dreams", trajanje: "5:01" }
  ]);

  // Stanje koje prati šifre odabranih pjesama za set listu
  const [odabranePjesmeSifre, setOdabranePjesmeSifre] = useState([]);

    const dodajUPjesmu = (sifra) => {
    if (!odabranePjesmeSifre.includes(sifra)) {
      setOdabranePjesmeSifre([...odabranePjesmeSifre, sifra]); // <-- Tu je pisalo BA, promijenite u sifra
    }
  };


  const ukloniIzPjesme = (sifra) => {
    setOdabranePjesmeSifre(odabranePjesmeSifre.filter(s => s !== sifra));
  };

  const korisnickaSetLista = svePjesme.filter(p => odabranePjesmeSifre.includes(p.sifra));

  return (
    <div className="mt-4">
      <h2>Kreiraj vlastitu Die Hausers Set Listu</h2>
      <p className="text-muted">Izaberite pjesme i složite idealan raspored za koncert.</p>
      
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Dostupne pjesme</Card.Header>
            <ListGroup variant="flush">
              {svePjesme.map(pjesma => {
                const jeDodana = odabranePjesmeSifre.includes(pjesma.sifra);
                return (
                  <ListGroup.Item key={pjesma.sifra} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{pjesma.naslov}</strong> <span className="text-muted">({pjesma.trajanje})</span>
                    </div>
                    <Button 
                      variant={jeDodana ? "secondary" : "primary"} 
                      size="sm"
                      onClick={() => dodajUPjesmu(pjesma.sifra)}
                      disabled={jeDodana}
                    >
                      {jeDodana ? "Dodano" : "Dodaj"}
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <Card border="primary">
            <Card.Header as="h5" className="bg-primary text-white d-flex justify-content-between align-items-center">
              <span>Vaša Set Lista</span>
              <span className="badge bg-light text-dark">{korisnickaSetLista.length} pjesama</span>
            </Card.Header>
            <ListGroup variant="flush">
              {korisnickaSetLista.length === 0 ? (
                <ListGroup.Item className="text-center py-4 text-muted">
                  Lista je prazna. Kliknite "Dodaj" na lijevoj strani.
                </ListGroup.Item>
              ) : (
                korisnickaSetLista.map((pjesma, index) => (
                  <ListGroup.Item key={pjesma.sifra} className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="me-2 text-primary fw-bold">{index + 1}.</span>
                      {pjesma.naslov}
                    </div>
                    <Button variant="danger" size="sm" onClick={() => ukloniIzPjesme(pjesma.sifra)}>
                      Ukloni
                    </Button>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
