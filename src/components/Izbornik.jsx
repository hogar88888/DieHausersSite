import React, { useState } from 'react';
import { RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Button } from 'react-bootstrap';

export default function Izbornik() {
    const navigate = useNavigate();
    const [prikaziPodaciMeni, setPrikaziPodaciMeni] = useState(false);
    const [prikaziAutorizacijaMeni, setPrikaziAutorizacijaMeni] = useState(false);
    const { isLoggedIn, logout, authUser } = useAuth()

    // ── KAZETA · TIJELO ─────────────────────────────────────────────────────
    const tijelo = {
        width: '190px',
        height: '92px',
        background: 'linear-gradient(145deg, #3e3e3e 0%, #2b2b2b 55%, #1e1e1e 100%)',
        border: '2px solid #141414',
        borderRadius: '9px',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        boxShadow:
            '0 4px 14px rgba(0,0,0,0.5), ' +
            'inset 0 1px 0 rgba(255,255,255,0.10), ' +
            'inset 0 -1px 0 rgba(0,0,0,0.3)'
    };

    // ── KAZETA · BOJANA GORNJA TRAKA ────────────────────────────────────────
    function trakaGore(boja) {
        return {
            height: '5px',
            flexShrink: 0,
            background: `linear-gradient(90deg, transparent 0%, ${boja} 8%, ${boja} 92%, transparent 100%)`,
            opacity: 0.9
        };
    }

    // ── KAZETA · NALJEPNICA (sticker) ───────────────────────────────────────
    const naljepnica = {
        flex: 1,
        margin: '5px 10px 4px 10px',
        background: 'linear-gradient(180deg, #fbf9f1 0%, #ece7d9 100%)',
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        color: '#1a1a1a',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        border: '1px solid #c5c0b2',
        boxShadow:
            'inset 0 2px 5px rgba(0,0,0,0.13), ' +
            'inset 0 -1px 3px rgba(255,255,255,0.55)'
    };

    // ── KAZETA · PROZOR (tape window) ───────────────────────────────────────
    const prozor = {
        height: '32px',
        margin: '0 10px 5px 10px',
        background: '#090909',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        border: '1px solid #383838',
        boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.75)',
        flexShrink: 0
    };

    // ── KAZETA · ZUPCANIK (reel) ────────────────────────────────────────────
    const zupcanik = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background:
            'radial-gradient(circle at 42% 38%, ' +
            '#b8b8b8 0%, #6e6e6e 35%, #3a3a3a 70%, #1a1a1a 100%)',
        border: '2px solid #707070',
        boxShadow:
            '0 1px 4px rgba(0,0,0,0.6), ' +
            'inset 0 1px 2px rgba(255,255,255,0.30)'
    };

    // ── KAZETA · TRAKA IZMEĐU ZUPCANIKA ─────────────────────────────────────
    const traka = {
        width: '58px',
        height: '3px',
        background:
            'linear-gradient(90deg, transparent 0%, #6b5a42 15%, #6b5a42 85%, transparent 100%)',
        opacity: 0.75,
        flexShrink: 0
    };

    // ── KAZETA · DONJA TRAKA (head-slot hint) ───────────────────────────────
    const dno = {
        height: '4px',
        flexShrink: 0,
        background:
            'linear-gradient(90deg, transparent 10%, #4a4a4a 35%, #4a4a4a 65%, transparent 90%)',
        opacity: 0.45
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: '20px 0' }}>

            <h1 className="naslov-benda">Die Hausers</h1>

            {/* Statantičan, fiksni i prisilno umrtvljeni logo u sredini */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '25px' }}>
                <img
                    src="/logo.jpg"
                    alt="Die Hausers Logo"
                    style={{
                        maxHeight: '390px',
                        maxWidth: '200%',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                        objectFit: 'contain',
                        animation: 'disanjeLica 4s ease-in-out infinite'
                    }}
                />
            </div>

            {/* Kontejner s malim kazetama - fiksno i centrirano */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '22px', flexWrap: 'wrap', width: '100%', marginBottom: '25px' }}>

                {/* KAZETA 1: Početna */}
                <div style={tijelo} onClick={() => { setPrikaziPodaciMeni(false); setPrikaziAutorizacijaMeni(false); navigate(RouteNames.HOME); }}>
                    <div style={trakaGore('#cf1124')}></div>
                    <div style={naljepnica}>POČETNA</div>
                    <div style={prozor}>
                        <div style={zupcanik}></div>
                        <div style={traka}></div>
                        <div style={zupcanik}></div>
                    </div>
                    <div style={dno}></div>
                </div>

                {isLoggedIn && (
                    <>
                        {/* KAZETA 2: Podaci */}
                        <div style={tijelo} onClick={() => setPrikaziPodaciMeni(!prikaziPodaciMeni)}>
                            <div style={trakaGore('#0056b3')}></div>
                            <div style={naljepnica}>PODACI ▾</div>
                            <div style={prozor}>
                                <div style={zupcanik}></div>
                                <div style={traka}></div>
                                <div style={zupcanik}></div>
                            </div>
                            <div style={dno}></div>
                        </div>
                    </>
                )}

                {/* KAZETA 3: Autorizacija */}
                {!isLoggedIn && (
                    <div style={tijelo} onClick={() => setPrikaziAutorizacijaMeni(!prikaziAutorizacijaMeni)}>
                        <div style={trakaGore('#d4a017')}></div>
                        <div style={naljepnica}>AUTORIZACIJA ▾</div>
                        <div style={prozor}>
                            <div style={zupcanik}></div>
                            <div style={traka}></div>
                            <div style={zupcanik}></div>
                        </div>
                        <div style={dno}></div>
                    </div>
                )}
            </div>
            {isLoggedIn && (
                <>
                    {/* Pod-izbornik za podatke - fiksno i centrirano */}

                    {prikaziPodaciMeni && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', marginBottom: '20px' }}>
                            <button className="btn btn-sm btn-light border fw-bold text-uppercase"
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.GENERIRANJE_PODATAKA); }}>
                                Generiraj podatke
                            </button>
                            <button className="btn btn-sm btn-light border fw-bold text-uppercase"
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.SVIRKE); }}>
                                Svirke
                            </button>
                            <button className="btn btn-sm btn-light border fw-bold text-uppercase"
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.LOKACIJE); }}>
                                Lokacije
                            </button>
                            <button className="btn btn-sm btn-light border fw-bold text-uppercase"
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.PJESME); }}>
                                Pjesme
                            </button>
                            <button className="btn btn-sm btn-light border fw-bold text-uppercase"
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.GALERIJA); }}>
                                Galerija
                            </button>
                            <button className="btn btn-sm btn-light border fw-bold text-uppercase"
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => { setPrikaziPodaciMeni(false); navigate(RouteNames.OPERATERI); }}>
                                Operateri
                            </button>
                        </div>
                    )}
                    
                </>
            )}
            <div className="btn-group">
                        {isLoggedIn ? (
                            <Button
                                className="me-2"
                                onClick={() => logout()}
                            >Logout {authUser.email}</Button>
                        ) : (
                            prikaziAutorizacijaMeni && (
                                <>
                                    <Button
                                        className="me-2"
                                        onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                    >Registracija</Button>
                                    <Button
                                        onClick={() => navigate(RouteNames.LOGIN)}
                                    >Login</Button>
                                </>
                            ))}
                    </div>
            <hr style={{ width: '100%', margin: '10px 0', opacity: '0.15' }} />
        </div>


    );
}
