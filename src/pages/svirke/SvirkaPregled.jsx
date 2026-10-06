import { useEffect, useState } from "react"
import SvirkaService from "../../services/svirke/SvirkaService"
import { Button, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function SvirkaPregled(){

    const [svirke, setSvirke] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        ucitajSvirke()
    },[])

    async function ucitajSvirke(){
        await SvirkaService.get().then((odgovor)=>{
            //console.table(odgovor.data)
            setSvirke(odgovor.data)
        })
    }

     async function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        await SvirkaService.obrisi(sifra)
        ucitajSvirke()
    }



    return (
        <>
           <Link to={RouteNames.SVIRKE_NOVI}
            className="btn btn-success w-100 my-3">
                Dodavanje nove svirke
            </Link>
          <Table hover striped bordered>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Cijena</th>
                    <th>Datum pokretanja</th>
                    <th>Aktivan</th>
                     <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {svirke && svirke.map((s)=>(
                    <tr key={s.sifra}>
                        <td>{s.mjesto}</td>
                        <td>{s.cijena}</td>
                        <td>{s.datum}</td>
                        <td>
                            <GrValidate 
                                color={s.odrzana ? 'green' : 'red'}
                                size={25}
                            />

                            

                        </td>
                        <td>
                                <Button onClick={()=>{navigate(`/svirke/${s.sifra}`)}}>
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