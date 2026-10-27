import React, { useState } from 'react';
import { RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function Izbornik() {
    const navigate = useNavigate();
    const [prikaziPodaciMeni, setPrikaziPodaciMeni] = useState(false);

    const kazetaStil = {
        width: '160px',
        height: '65px',
        background: '#f8f9fa',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        position: 'relative',
        boxShadow: '3px 3px 0px #cf1124',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'none', // Uklonjena tranzicija s gumba
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5px'
    };

    const prozorStil = {
        width: '45%',
        height: '10px',
        background: '#212529',
        margin: '0 auto 2px auto',
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    };

    const zupcanikStil = {
        width: '6px',
        height: '6px',
        background: '#fff',
        borderRadius: '50%',
        border: '1px dashed #6c757d'
    };

    const naljepnicaTekstStil = {
        fontFamily: 'Courier New, monospace',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: '#212529',
        textAlign: 'center',
        letterSpacing: '0.5px',
        marginTop: '2px'
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: '20px 0' }}>
            
            {/* Statantičan, fiksni i prisilno umrtvljeni logo u sredini */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '25px' }}>
                <img 
                    src="/logo.jpg" 
                    alt="Die Hausers Logo" 
                    style={{ 
                        maxHeight: '300px',    
                        maxWidth: '200%',      
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                        objectFit: 'contain',
                        // PRISILNO ISKLJUČIVANJE SVIH ANIMACIJA I TRANZICIJA:
                        animation: 'none !important',
                        transition: 'none !important',
                        transform: 'none !important'
                    }} 
                />
            </div>

            {/* Kontejner s malim kazetama - fiksno i centrirano */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', flexWrap: 'wrap', width: '100%', marginBottom: '25px' }}>
                
                {/* KAZETA 1: Početna */}
                <div style={kazetaStil} onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.HOME); }}>
                    <div style={{ borderTop: '2px solid #cf1124', width: '100%' }}></div>
                    <div style={naljepnicaTekstStil}>POČETNA</div>
                    <div style={prozorStil}>
                        <div style={zupcanikStil}></div>
                        <div style={zupcanikStil}></div>
                    </div>
                </div>

                {/* KAZETA 2: Podaci */}
                <div style={{ ...kazetaStil, boxShadow: '3px 3px 0px #0056b3' }} onClick={() => setPrikaziPodaciMeni(!prikaziPodaciMeni)}>
                    <div style={{ borderTop: '2px solid #0056b3', width: '100%' }}></div>
                    <div style={naljepnicaTekstStil}>PODACI ▾</div>
                    <div style={prozorStil}>
                        <div style={zupcanikStil}></div>
                        <div style={zupcanikStil}></div>
                    </div>
                </div>

                {/* KAZETA 3: Set Lista */}
                <div style={{ ...kazetaStil, boxShadow: '3px 3px 0px #28a745' }} onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.KREIRAJ_SET_LISTU); }}>
                    <div style={{ borderTop: '2px solid #28a745', width: '100%' }}></div>
                    <div style={naljepnicaTekstStil}>SET LISTA</div>
                    <div style={prozorStil}>
                        <div style={zupcanikStil}></div>
                        <div style={zupcanikStil}></div>
                    </div>
                </div>

            </div>

            {/* Pod-izbornik za podatke - fiksno i centrirano */}
            {prikaziPodaciMeni && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', marginBottom: '20px' }}>
                    <button className="btn btn-sm btn-light border fw-bold text-uppercase" style={{ fontSize: '0.75rem' }} onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.SVIRKE); }}>
                        Svirke
                    </button>
                    <button className="btn btn-sm btn-light border fw-bold text-uppercase" style={{ fontSize: '0.75rem' }} onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.LOKACIJE); }}>
                        Lokacije
                    </button>
                    <button className="btn btn-sm btn-light border fw-bold text-uppercase" style={{ fontSize: '0.75rem' }} onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.PJESME); }}>
                        Pjesme
                    </button>
                </div>
            )}
            <hr style={{ width: '100%', margin: '10px 0', opacity: '0.15' }} />
        </div>
    );
}
