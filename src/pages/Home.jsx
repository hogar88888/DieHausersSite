import React from 'react';

import logoBenda from '../logo.jpg';

export default function Home() {
    return (
        <>
            <div className="logo-kontejner">
                {

                }
                <img src={logoBenda} alt="Die Hausers Logotip" className="logo-disanje" />
            </div>

            {/* BIOGRAFSKI TEKST UGRAĐEN U TVOJ STIL */}
            <div className="pocetna-tekst-blok biography-section">
                <h2 className="biografija-podnaslov">...omalo povijesti...</h2>

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
                    alternativnog i noise zvuka u regiji. Sirovi zvuk podrumskih gitara, mračni industrijski ritmovi i post-punk melankolija iz istočne Hrvatske. Zvuk koji spaja energiju underground scene i beskompromisni noise rock.

                    Nakon preko dva desetljeća sporadičnih koncerata, ove legende koje su utjecale na mnoge odlučuju se napokon ovjekovječiti što su uspjeli stvorili kroz godine na vinil izdanju pod imenom "Sibir".
                    Album uključuje stare hitove kao što su „Takav sam kakav sam“, „Ljudi“, „Crvi“ i „To upamti“, napokon kvalitetno snimljene, ali s istim onim zakucanim intenzitetom na kojem su se od početka etablirali. Ploča izlazi van na PDV-u (PDV094) 19. lipnja, a koncertna promocija je u četvrtak, 25. lipnja, u sklopu prvog izdanja FRAN Festa u Dražu kod Baranje, gdje će, naravno, biti dostupna i sama ploča.
                </p>

                <h2 className="biografija-podnaslov">Izdanja i Povratak</h2>

                <p>
                    Nakon legendarnih demo snimaka i kultnih nastupa koji su ostali urezani u sjećanje
                    generacija, priča o bendu dobiva svoj konačni fizički oblik. Zahvaljujući nezavisnoj
                    izdavačkoj kući <em>Izgubljeni Vikend</em>, njihova ključna ostvarenja – albumi
                    <strong>"Sibir"</strong> i <strong>"Made in Osijek"</strong> – napokon su spašeni od zaborava
                    i objavljeni na ekskluzivnim vinilnim izdanjima.
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
