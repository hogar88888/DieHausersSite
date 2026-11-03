const STORAGE_KEY = 'svirke'

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}


async function get() {
    const svirke = dohvatiSveIzStorage()
    return { data: [...svirke] }
}

async function getBySifra(sifra) {
    const svirke = dohvatiSveIzStorage()
    const svirka = svirke.find(s => s.sifra === parseInt(sifra))
    return { data: svirka }
}


async function dodaj(svirka) {
    const svirke = dohvatiSveIzStorage()
    if (svirke.length === 0) {
        svirka.sifra = 1
    } else {
        const maxSifra = Math.max(...svirke.map(s => s.sifra))
        svirka.sifra = maxSifra + 1
    }

    svirke.push(svirka)
    spremiUStorage(svirke)
}


async function promijeni(sifra, svirka) {
    const svirke = dohvatiSveIzStorage()
    const index = svirke.findIndex(s => s.sifra === parseInt(sifra))
    svirke[index] = {...svirke[index], ...svirka}
    spremiUStorage(svirke)
}



async function obrisi(sifra) {
     let svirke = dohvatiSveIzStorage()
     svirke = svirke.filter(s => s.sifra !== parseInt(sifra))
     spremiUStorage(svirke)
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}