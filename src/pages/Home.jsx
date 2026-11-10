import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import GalerijaService from '../services/galerija/GalerijaService';


export default function Home() {


    const [index, setIndex] = useState(-1);
    const [slike, setSlike] = useState([])

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

            {/* BIOGRAFSKI TEKST UGRAĐEN U TVOJ STIL */}
            <div className="pocetna-tekst-blok biography-section">
                <h2 className="biografija-podnaslov">...trenutak u vremenu...</h2>

                <p>
                    <strong>Kultni</strong> osječki noise rock band osnovan ratne 1992. godine.
                    Ime benda inspirirano je nesvakidašnjim njemačkim dokumentarnim filmom o rigidnim i
                    specifičnim metodama odgoja obitelji Hauser, što je savršeno rezoniralo s mračnim,
                    sirovim i beskompromisnim zvukom koji je bend stvarao.
                </p>

                <p>
                    Tijekom devedesetih godina postaju jedan od ključnih stupova osječke underground scene.
                    Njihov glazbeni izričaj karakteriziraju teške, distorzirane gitare, hipnotički ritmovi
                    i tekstovi natopljeni egzistencijalnim nemirom, čime su brzo privukli pažnju ljubitelja
                    alternativnog i noise zvuka u regiji. "...Sirovi zvuk podrumskih gitara, mračni industrijski ritmovi i post-punk melankolija iz istočne Hrvatske. Zvuk koji spaja energiju underground scene i beskompromisni noise rock...Nakon preko dva desetljeća sporadičnih koncerata, ove legende koje su utjecale na mnoge odlučuju se napokon ovjekovječiti što su uspjeli stvorili kroz godine na vinil izdanju pod imenom "Sibir".
                    Album uključuje stare hitove kao što su „Takav sam kakav sam“, „Ljudi“, „Crvi“ i „To upamti“, napokon kvalitetno snimljene, ali s istim onim zakucanim intenzitetom na kojem su se od početka etablirali. Ploča izlazi van na PDV-u (PDV094) 19. lipnja, a koncertna promocija je u četvrtak, 25. lipnja, u sklopu prvog izdanja FRAN Festa u Dražu, Baranja, gdje će, naravno, biti dostupna i sama ploča..
                </p>

                <h2 className="biografija-podnaslov">...rat i mir...</h2>

                <p>
                    Nakon legendarnih demo snimaka i kultnih nastupa koji su ostali urezani u sjećanje
                    generacija, priča o bendu dobiva svoj konačni fizički oblik. Zahvaljujući nezavisnoj
                    izdavačkoj kući <em>PDV Records</em>, njihova ključna ostvarenja –  na albumu
                    <strong>"Sibir"</strong> <strong></strong> – napokon su spašena od zaborava
                    i objavljena na ekskluzivnom vinilnom izdanju.
                </p>

                <p className="istaknuti-tekst">
                    Ova stranica predstavlja posvetu njihovom radu, energiji i neizbrisivom tragu koji su
                    ostavili u povijesti domaće alternativne rock glazbe.
                </p>
            </div>

            <h1 className="naslov-benda">Die Hausers</h1>
        </>
    );
}
