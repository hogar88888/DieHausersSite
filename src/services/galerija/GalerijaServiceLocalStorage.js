const STORAGE_KEY = 'galerija'

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
    } catch (error) {
        if (error.name === 'QuotaExceededError' || error.code === 22) {
            alert('Greška: slika je prevelika za localStorage. Koristi manju sliku (max 5MB).')
        } else {
            throw error
        }
    }
}


async function get() {
    const galerija = dohvatiSveIzStorage()
    return { data: [...galerija] }
}

async function getBySifra(sifra) {
    const galerija = dohvatiSveIzStorage()
    const fotografija = galerija.find(f => f.sifra === parseInt(sifra))
    return { data: fotografija }
}


async function dodaj(fotografija) {
    const galerija = dohvatiSveIzStorage()
    if (galerija.length === 0) {
        fotografija.sifra = 1
    } else {
        const maxSifra = Math.max(...galerija.map(f => f.sifra))
        fotografija.sifra = maxSifra + 1
    }

    galerija.push(fotografija)
    spremiUStorage(galerija)
}


async function promijeni(sifra, fotografija) {
    const galerija = dohvatiSveIzStorage()
    const index = galerija.findIndex(f => f.sifra === parseInt(sifra))
    galerija[index] = { ...galerija[index], ...fotografija }
    spremiUStorage(galerija)
}


async function obrisi(sifra) {
    let galerija = dohvatiSveIzStorage()
    galerija = galerija.filter(f => f.sifra !== parseInt(sifra))
    spremiUStorage(galerija)
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}