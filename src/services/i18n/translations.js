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
    },
};