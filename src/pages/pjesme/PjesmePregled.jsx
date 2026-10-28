import { useEffect, useState } from "react"
import PjesmeService from "../../services/pjesme/PjesmeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function PjesmePregled(){

    const [pjesme, setPjesme] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        ucitajPjesme()
    },[])

    async function ucitajPjesme(){
        await PjesmeService.get().then((odgovor)=>{
            //console.table(odgovor.data)
            setPjesme(odgovor.data)
        })
    }

     async function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        await PjesmeService.obrisi(sifra)
        ucitajPjesme()
    }



    return (
        <>
           <Link to={RouteNames.PJESME_NOVI}
            className="btn btn-success w-100 my-3">
                Dodavanje nove pjesme
            </Link>
          <Table hover striped bordered>
            <thead>
                <tr>
                    <th>Naslov</th>
                    <th>Trajanje</th>
                     <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {pjesme && pjesme.map((s)=>(
                    <tr key={s.sifra}>
                        <td>{s.naslov}</td>
                        <td>{s.trajanje}</td>
                        <td>
                                <Button onClick={()=>{navigate(`/pjesme/${s.sifra}`)}}>
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