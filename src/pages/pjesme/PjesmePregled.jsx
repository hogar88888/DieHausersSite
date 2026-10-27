import { useEffect, useState } from "react"
import LokacijeService from "../../services/lokacije/LokacijeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function LokacijePregled(){

    const [lokacije, setLokacije] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        ucitajLokacije()
    },[])

    async function ucitajLokacije(){
        await LokacijeService.get().then((odgovor)=>{
            //console.table(odgovor.data)
            setLokacije(odgovor.data)
        })
    }

     async function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        await LokacijeService.obrisi(sifra)
        ucitajLokacije()
    }



    return (
        <>
           <Link to={RouteNames.LOKACIJE_NOVI}
            className="btn btn-success w-100 my-3">
                Dodavanje nove lokacije
            </Link>
          <Table hover striped bordered>
            <thead>
                <tr>
                    <th>Klub</th>
                    <th>Grad</th>
                     <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {lokacije && lokacije.map((s)=>(
                    <tr key={s.sifra}>
                        <td>{s.klub}</td>
                        <td>{s.grad}</td>
                        <td>
                                <Button onClick={()=>{navigate(`/lokacije/${s.sifra}`)}}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(s.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                    </tr>
                ))}
            </tbody>
          </Table>

    
            
        </>
    )
}