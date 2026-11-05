import { galerija } from "./GalerijaPodaci";

// 1/4 Read od CRUD
async function get() {
    return { data: [...galerija] }
}


async function getBySifra(sifra) {
    return { data: galerija.find(f => f.sifra === parseInt(sifra)) }
}


// 2/4 Create od CRUD
async function dodaj(fotografija) {
    if (galerija.length === 0) {
        fotografija.sifra = 1
    } else {
        fotografija.sifra = galerija[galerija.length - 1].sifra + 1
    }
    galerija.push(fotografija)
}

// 3/4 Update od CRUD
async function promijeni(sifra, fotografija) {
    const index = nadiIndex(sifra)
    galerija[index] = { ...galerija[index], ...fotografija }
}

function nadiIndex(sifra) {
    return galerija.findIndex(f => f.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    galerija.splice(index, 1)
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}