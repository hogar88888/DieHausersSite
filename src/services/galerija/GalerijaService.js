import { DATA_SOURCE } from "../../constants"
import GalerijaServiceLocalStorage from "./GalerijaServiceLocalStorage"
import GalerijaServiceMemorija from "./GalerijaServiceMemorija"

let Servis = null

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = GalerijaServiceMemorija
        break
    case 'localStorage':
        Servis = GalerijaServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async () => ({ data: [] }),
    dodaj: async (fotografija) => { console.log('Servis nije implementiran') },
    getBySifra: async (sifra) => ({ data: {} }),
    promijeni: async (sifra, fotografija) => { console.error('Servis nije implementiran') },
    obrisi: async (sifra) => { console.error('Servis nije implementiran') },
}

const AktivniServis = Servis || PrazanServis


export default {
    get: () => AktivniServis.get(),
    dodaj: (fotografija) => AktivniServis.dodaj(fotografija),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    promijeni: (sifra, fotografija) => AktivniServis.promijeni(sifra, fotografija),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}