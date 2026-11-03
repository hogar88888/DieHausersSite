import { svirke } from "./SvirkaPodaci";

// 1/4 Read od CRUD
async function get(){
    return {data: [...svirke]} // [...] stvara novi niz s istim podacima
}


async function getBySifra(sifra){
    return {data: svirke.find(s => s.sifra === parseInt(sifra))}    
}


// 2/4 Create od CRUD
async function dodaj(svirka){
    if(svirke.length===0){
        svirka.sifra = 1
    }else{
        svirka.sifra = svirke[svirke.length-1].sifra + 1
    }
    svirke.push(svirka)
}

// 3/4 Update od CRUD
async function promijeni(sifra,svirka){
    const index = nadiIndex(sifra)
    svirke[index] = {...svirke[index], ...svirka}
}

// ne moraju sve funkcije biti dostupne izvana
function nadiIndex(sifra){
    return svirke.findIndex(s => s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    svirke.splice(index,1)
}

export default{
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}