import { lokacije } from "./LokacijePodaci";

// 1/4 Read od CRUD
async function get(){
    return {data: [...lokacije]} // [...] stvara novi niz s istim podacima
}


async function getBySifra(sifra){
    return {data: lokacije.find(s => s.sifra === parseInt(sifra))}    
}


// 2/4 Create od CRUD
async function dodaj(lokacija){
    if(lokacije.length===0){
        lokacija.sifra = 1
    }else{
        lokacija.sifra = lokacije[lokacije.length-1].sifra + 1
    }
    lokacije.push(lokacija)
}

// 3/4 Update od CRUD
async function promijeni(sifra,lokacija){
    const index = nadiIndex(sifra)
    lokacije[index] = {...lokacije[index], ...lokacija}
}

// ne moraju sve funkcije biti dostupne izvana
function nadiIndex(sifra){
    return lokacije.findIndex(s => s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    lokacije.splice(index,1)
}

export default{
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}