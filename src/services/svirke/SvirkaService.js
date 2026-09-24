import { svirke } from "./SvirkaPodaci";

// 1/4 Read od CRUD
async function get(){
    return {data: [...svirke]} // [...] stvara novi niz s istim podacima
}



export default{
    get
}