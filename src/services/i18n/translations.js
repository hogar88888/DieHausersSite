// ---------------------------------------------------------------------------
// Central translation dictionary for DieHausersSite (HR / EN)
//
// Shape:  { hr: { section: { key: value } }, en: { section: { key: value } } }
// Keys are resolved by dot-path, e.g. t('svirka.cijena') -> svirka.cijena.
// The default language (hr) is used as a fallback for any key that is missing
// in another language (see i18nService.js).
//
// NOTE: Only sections whose components have already been refactored to use
// useTranslation() are fully populated. Add new sections as the remaining
// pages are migrated.
// ---------------------------------------------------------------------------

export const translations = {
    hr: {
        // ── Svirke (performances) ──────────────────────────────────────────
        svirka: {
            naslovNovi: 'Unos nove Svirke',
            lokacija: 'Lokacije',
            odaberiLokaciju: 'Odaberite lokaciju',
            cijena: 'Cijena',
            datum: 'Datum',
            odrzana: 'Održana',
            setLista: 'Set lista',
            dodajPjesmu: 'Dodaj pjesmu',
            pretraziPjesmu: 'Pretraži pjesmu...',
            naslov: 'Naslov',
            akcija: 'Akcija',
            obrisi: 'Obriši',
            nemaPjesama: 'Nema odabranih pjesama',
            odustani: 'Odustani',
            dodajSvirku: 'Dodaj novu svirku',
            promijeniSvirku: 'Promjeni svirku',
            
        },

        // ── Navigacija (Izbornik) ───────────────────────────────────────────
        nav: {
            home: 'Početna',
            data: 'Podaci',
            generiranje: 'Generiraj podatke',
            svirke: 'Svirke',
            lokacije: 'Lokacije',
            pjesme: 'Pjesme',
            galerija: 'Galerija',
            switch: 'EN',
        },
        pocetna: {
            trenutakUVremenu: '...trenutak u vremenu...',
            kultni: 'Kultni',
            bio1: 'osječki noise rock band osnovan ratne 1992. godine. Ime benda inspirirano je nesvakidašnjim njemačkim dokumentarnim filmom o rigidnim i specifičnim metodama odgoja obitelji Hauser, što je savršeno rezoniralo s mračnim, sirovim i beskompromisnim zvukom koji je bend stvarao.',
            bio2: 'Tijekom devedesetih godina postaju jedan od ključnih stupova osječke underground scene. Njihov glazbeni izričaj karakteriziraju teške, distorzirane gitare, hipnotički ritmovi i tekstovi natopljeni egzistencijalnim nemirom, čime su brzo privukli pažnju ljubitelja alternativnog i noise zvuka u regiji. "...Sirovi zvuk podrumskih gitara, mračni industrijski ritmovi i post-punk melankolija iz istočne Hrvatske. Zvuk koji spaja energiju underground scene i beskompromisni noise rock...Nakon preko dva desetljeća sporadičnih koncerata, ove legende koje su utjecale na mnoge odlučuju se napokon ovjekovječiti što su uspjeli stvorili kroz godine na vinil izdanju pod imenom "Sibir". Album uključuje stare hitove kao što su "Takav sam kakav sam", "Ljudi", "Crvi" i "To upamti", napokon kvalitetno snimljene, ali s istim onim zakucanim intenzitetom na kojem su se od početka etablirali. Ploča izlazi van na PDV-u (PDV094) 19. lipnja, a koncertna promocija je u četvrtak, 25. lipnja, u sklopu prvog izdanja FRAN Festa u Dražu, Baranja, gdje će, naravno, biti dostupna i sama ploča..',
            ratIMir: '...rat i mir...',
            bio3a: 'Nakon legendarnih demo snimaka i kultnih nastupa koji su ostali urezani u sjećanje generacija, priča o bendu dobiva svoj konačni fizički oblik. Zahvaljujući nezavisnoj izdavačkoj kući',
            bio3b: 'njihova ključna ostvarenja – na albumu',
            bio3c: '– napokon su spašena od zaborava i objavljena na ekskluzivnom vinilnom izdanju.',
            bio4: 'Ova stranica predstavlja posvetu njihovom radu, energiji i neizbrisivom tragu koji su ostavili u povijesti domaće alternativne rock glazbe.'
        }
    },

    en: {
        // ── Performances ────────────────────────────────────────────────────
        svirka: {
            naslovNovi: 'New performance',
            lokacija: 'Location',
            odaberiLokaciju: 'Select a location',
            cijena: 'Price',
            datum: 'Date',
            odrzana: 'Performed',
            setLista: 'Set list',
            dodajPjesmu: 'Add song',
            pretraziPjesmu: 'Search song...',
            naslov: 'Title',
            akcija: 'Action',
            obrisi: 'Remove',
            nemaPjesama: 'No songs selected',
            odustani: 'Cancel',
            dodajSvirku: 'Add new performance',
            promijeniSvirku: 'Update performance',
        },

        // ── Navigation (Izbornik) ───────────────────────────────────────────
        nav: {
            home: 'Home',
            data: 'Data',
            generiranje: 'Generate data',
            svirke: 'Performances',
            lokacije: 'Locations',
            pjesme: 'Songs',
            galerija: 'Gallery',
            switch: 'HR',
        },
        pocetna: {
            trenutakUVremenu: '...moment in time...',
            kultni: 'The cult',
            bio1: 'Osijek noise rock band founded in 1992. The band\'s name was inspired by an extraordinary German documentary about the rigid and specific upbringing methods of the Hauser family, which perfectly resonated with the dark, raw and uncompromising sound the band was creating.',
            bio2: 'During the 1990s they became one of the key pillars of Osijek\'s underground scene. Their musical expression is characterized by heavy, distorted guitars, hypnotic rhythms and lyrics soaked in existential unrest, quickly drawing the attention of alternative and noise music lovers in the region. "...Raw sound of basement guitars, dark industrial rhythms and post-punk melancholy from eastern Croatia. A sound that combines the energy of the underground scene and uncompromising noise rock...After more than two decades of sporadic concerts, these legends who influenced many decided to finally immortalize what they created over the years on a vinyl release named "Sibir". The album includes old hits such as "Takav sam kakav sam", "Ljudi", "Crvi" and "To upamti", finally recorded with quality, but with the same intense force they established from the very beginning. The record is released by PDV (PDV094) on June 19th, and the promotional concert is on Thursday, June 25th, as part of the first edition of FRAN Fest in Draž, Baranja, where the vinyl will of course also be available..',
            ratIMir: '...war and peace...',
            bio3a: 'After the legendary demo recordings and cult performances that remain etched in the memory of generations, the band\'s story takes its final physical form. Thanks to the independent record label',
            bio3b: 'their key achievements – on the album',
            bio3c: '– have finally been saved from oblivion and released on an exclusive vinyl edition.',
            bio4: 'This page is a tribute to their work, their energy and the indelible mark they left in the history of domestic alternative rock music.'
        }
    },
};