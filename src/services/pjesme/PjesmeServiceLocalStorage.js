const STORAGE_KEY = 'pjesme'

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}


async function get() {
    const pjesme = dohvatiSveIzStorage()
    return { data: [...pjesme] }
}

async function getBySifra(sifra) {
    const pjesme = dohvatiSveIzStorage()
    const pjesma = pjesme.find(s => s.sifra === parseInt(sifra))
    return { data: pjesma }
}


async function dodaj(pjesma) {
    const pjesme = dohvatiSveIzStorage()
    if (pjesme.length === 0) {
        pjesma.sifra = 1
    } else {
        const maxSifra = Math.max(...pjesme.map(s => s.sifra))
        pjesma.sifra = maxSifra + 1
    }

    pjesme.push(pjesma)
    spremiUStorage(pjesme)
}


async function promijeni(sifra, pjesma) {
    const pjesme = dohvatiSveIzStorage()
    const index = pjesme.findIndex(s => s.sifra === parseInt(sifra))
    pjesme[index] = {...pjesme[index], ...pjesma}
    spremiUStorage(pjesme)
}



async function obrisi(sifra) {
     let pjesme = dohvatiSveIzStorage()
     pjesme = pjesme.filter(s => s.sifra !== parseInt(sifra))
     spremiUStorage(pjesme)
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}