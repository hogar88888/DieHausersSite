import { pjesme } from "./PjesmePodaci";

// 1/4 Read od CRUD
async function get(){
    return {data: [...pjesme]} // [...] stvara novi niz s istim podacima
}


async function getBySifra(sifra){
    return {data: pjesme.find(s => s.sifra === parseInt(sifra))}    
}


// 2/4 Create od CRUD
async function dodaj(pjesma){
    if(pjesme.length===0){
        pjesma.sifra = 1
    }else{
        pjesma.sifra = pjesme[pjesme.length-1].sifra + 1
    }
    pjesme.push(pjesma)
}

// 3/4 Update od CRUD
async function promijeni(sifra,pjesma){
    const index = nadiIndex(sifra)
    pjesme[index] = {...pjesme[index], ...pjesma}
}

// ne moraju sve funkcije biti dostupne izvana
function nadiIndex(sifra){
    return pjesme.findIndex(s => s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    pjesme.splice(index,1)
}

export default{
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}