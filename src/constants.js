
export const IME_APLIKACIJE = 'Die Hausers Site';

export const RouteNames = {
    HOME: '/',

    SVIRKE: '/svirke',
    SVIRKE_NOVI: '/svirke/novi',
    SVIRKE_PROMJENA: '/svirke/:sifra',

    LOKACIJE: '/lokacije',
    LOKACIJE_NOVI: '/lokacije/novi',
    LOKACIJE_PROMJENA: '/lokacije/:sifra',

    PJESME: '/pjesme',
    PJESME_NOVI: '/pjesme/novi',
    PJESME_PROMJENA: '/pjesme/:sifra',

    GALERIJA: '/galerija',
    GALERIJA_NOVI: '/galerija/novi',
    GALERIJA_PROMJENA: '/galerija/:sifra',

    KREIRAJ_SET_LISTU: '/kreiraj-set-listu',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',


    GENERIRANJE_PODATAKA: '/generiraj-podatke',
};


// memorija, localStorage, firebase
export const DATA_SOURCE = 'memorija';

// Imena kolekcija u Firestore-u
// Prefiks "dh" = Die Hausers
export const PrefixStorage = {
    SVIRKE: 'e7.svirke',
    LOKACIJE: 'e7.lokacije',
    PJESME: 'e7.pjesme',
    GALERIJA: 'e7.galerija',
    OPERATERI: 'e7.operateri'
};