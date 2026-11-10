import { useRef, useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GalerijaService from "../../services/galerija/GalerijaService"

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


export default function GalerijaNovi() {

    const navigate = useNavigate()
    const [danasnjiDatum, setDanasnjiDatum] = useState(new Date().toISOString().substring(0, 10))

    const [slikaZaCrop, setSlikaZaCrop] = useState(null);
    const cropperRef = useRef(null);

    async function dodaj(slika) {
        await GalerijaService.dodaj(slika).then(() => {
            navigate(RouteNames.GALERIJA)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        let dataUrl = null
        if (cropperRef.current && cropperRef.current.cropper && cropperRef.current.cropper.cropped) {
            const cropper = cropperRef.current.cropper;
            const selectionData = cropper.getData();
            const actualWidth = selectionData.width;
            const actualHeight = selectionData.height;
            const targetSize = 400;
            const canvasWidth = actualWidth > targetSize ? targetSize : actualWidth;
            const canvasHeight = actualHeight > targetSize ? targetSize : actualHeight;
            const canvas = cropper.getCroppedCanvas({
                width: canvasWidth,
                height: canvasHeight,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });
            dataUrl = canvas.toDataURL('image/png');
        }

        dodaj({
            naziv: podaci.get('naziv'),
            slika: dataUrl,
            opis: podaci.get('opis'),
            datum: podaci.get('datum')
        })
    }


    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSlikaZaCrop(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
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


                                <input className='mb-3' type='file' onChange={onChangeImage} />
                                <Cropper
                                    src={slikaZaCrop}
                                    style={{ height: 400, width: '100%' }}
                                    initialAspectRatio={1}
                                    guides={true}
                                    autoCropArea={1}
                                    viewMode={1}
                                    minCropBoxWidth={400}
                                    minCropBoxHeight={400}
                                    cropBoxResizable={false}
                                    background={false}
                                    responsive={true}
                                    checkOrientation={false}
                                    ref={cropperRef}
                                />



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