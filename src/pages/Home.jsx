import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import GalerijaService from '../services/galerija/GalerijaService';
import { useTranslation } from '../services/i18n/i18nService';


export default function Home() {


    const [index, setIndex] = useState(-1);
    const [slike, setSlike] = useState([])
    const { t, language, setLang } = useTranslation()

    useEffect(() => {
        ucitajSlike()
    }, [])

    async function ucitajSlike() {
        await GalerijaService.get().then((odgovor) => {
            setSlike(odgovor.data.map((item) => ({
                sifra: item.sifra,
                src: item.slika,
                title: item.naziv,
                description: `${item.datum} - ${item.opis}`
            })))
        })
    }


    return (
        <>
            <div className="logo-kontejner">
                <div style={{ padding: '20px' }}>

                    {/* Grid prikaz sličica */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {slike.map((item, idx) => (
                            <div
                                key={item.sifra}
                                onClick={() => setIndex(idx)}
                                style={{
                                    cursor: 'pointer',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    maxWidth: '200px'
                                }}
                            >
                                <img
                                    src={item.src}
                                    alt={item.naziv}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                <h4 style={{ margin: '8px 0 4px 0' }}>{item.naziv}</h4>
                                <p style={{ margin: 0, fontSize: '0.85em', color: '#666' }}>{item.datum}</p>
                            </div>
                        ))}
                    </div>

                    {/* Lightbox modal za uvećani prikaz */}
                    <Lightbox
                        open={index >= 0}
                        close={() => setIndex(-1)}
                        index={index}
                        slides={slike}
                    />
                </div>
            </div>

            <div className="lang-switcher">
                <button
                    className={`flag-btn ${language === 'hr' ? 'active' : ''}`}
                    onClick={() => setLang('hr')}
                    title="Hrvatski"
                >
                    <svg viewBox="0 0 90 60" width="60" height="40" aria-hidden="true">
                        <rect width="90" height="20" fill="#FF0000"/>
                        <rect y="20" width="90" height="20" fill="#FFF"/>
                        <rect y="40" width="90" height="20" fill="#00008B"/>
                        <path d="M35 10h20v24c0 8-10 14-10 14s-10-6-10-14z" fill="#FFF" stroke="#8B6914" strokeWidth="1.5"/>
                        <rect x="37" y="12" width="3" height="4" fill="#FF0000"/>
                        <rect x="43" y="12" width="3" height="4" fill="#FF0000"/>
                        <rect x="49" y="12" width="3" height="4" fill="#FF0000"/>
                        <rect x="40" y="16" width="3" height="4" fill="#FF0000"/>
                        <rect x="46" y="16" width="3" height="4" fill="#FF0000"/>
                        <rect x="37" y="20" width="3" height="4" fill="#FF0000"/>
                        <rect x="43" y="20" width="3" height="4" fill="#FF0000"/>
                        <rect x="49" y="20" width="3" height="4" fill="#FF0000"/>
                        <rect x="40" y="24" width="3" height="4" fill="#FF0000"/>
                        <rect x="46" y="24" width="3" height="4" fill="#FF0000"/>
                        <rect x="37" y="28" width="3" height="4" fill="#FF0000"/>
                        <rect x="43" y="28" width="3" height="4" fill="#FF0000"/>
                        <rect x="49" y="28" width="3" height="4" fill="#FF0000"/>
                    </svg>
                </button>

                <button
                    className={`flag-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLang('en')}
                    title="English"
                >
                    <svg viewBox="0 0 90 60" width="48" height="32" aria-hidden="true">
                        <rect width="90" height="60" fill="#012169"/>
                        <line x1="0" y1="0" x2="90" y2="60" stroke="#FFF" strokeWidth="12"/>
                        <line x1="90" y1="0" x2="0" y2="60" stroke="#FFF" strokeWidth="12"/>
                        <line x1="0" y1="0" x2="90" y2="60" stroke="#C8102E" strokeWidth="4"/>
                        <line x1="90" y1="0" x2="0" y2="60" stroke="#C8102E" strokeWidth="4"/>
                        <line x1="45" y1="0" x2="45" y2="60" stroke="#FFF" strokeWidth="20"/>
                        <line x1="0" y1="30" x2="90" y2="30" stroke="#FFF" strokeWidth="20"/>
                        <line x1="45" y1="0" x2="45" y2="60" stroke="#C8102E" strokeWidth="12"/>
                        <line x1="0" y1="30" x2="90" y2="30" stroke="#C8102E" strokeWidth="12"/>
                    </svg>
                </button>
            </div>

            

            {/* BIOGRAFSKI TEKST UGRAĐEN U TVOJ STIL */}
            <div className="pocetna-tekst-blok biography-section">
                <h2 className="biografija-podnaslov"> {t('pocetna.trenutakUVremenu')}</h2>

                <p>
                    <strong>{t('pocetna.kultni')}</strong> {t('pocetna.bio1')}
                </p>

                <p>
                    {t('pocetna.bio2')}
                </p>

                <h2 className="biografija-podnaslov">{t('pocetna.ratIMir')}</h2>

                <p>
                    {t('pocetna.bio3a')} <em>PDV Records</em>, {t('pocetna.bio3b')} <strong>"Sibir"</strong> {t('pocetna.bio3c')}
                </p>

                <p className="istaknuti-tekst">
                    {t('pocetna.bio4')}
                </p>

            </div>

        </>
    );
}
