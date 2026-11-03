const STORAGE_KEY = 'lokacije'

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}


async function get() {
    const lokacije = dohvatiSveIzStorage()
    return { data: [...lokacije] }
}

async function getBySifra(sifra) {
    const lokacije = dohvatiSveIzStorage()
    const lokacija = lokacije.find(s => s.sifra === parseInt(sifra))
    return { data: lokacija }
}


async function dodaj(lokacija) {
    const lokacije = dohvatiSveIzStorage()
    if (lokacije.length === 0) {
        lokacija.sifra = 1
    } else {
        const maxSifra = Math.max(...lokacije.map(s => s.sifra))
        lokacija.sifra = maxSifra + 1
    }

    lokacije.push(lokacija)
    spremiUStorage(lokacije)
}


async function promijeni(sifra, lokacija) {
    const lokacije = dohvatiSveIzStorage()
    const index = lokacije.findIndex(s => s.sifra === parseInt(sifra))
    lokacije[index] = {...lokacije[index], ...lokacija}
    spremiUStorage(lokacije)
}



async function obrisi(sifra) {
     let lokacije = dohvatiSveIzStorage()
     lokacije = lokacije.filter(s => s.sifra !== parseInt(sifra))
     spremiUStorage(lokacije)
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}