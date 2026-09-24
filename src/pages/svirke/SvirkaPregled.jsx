import { useEffect, useState } from "react"
import SvirkaService from "../../services/svirke/SvirkaService"
import { Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"


export default function SvirkaPregled(){

    const [svirke, setSvirke] = useState([])

    useEffect(()=>{
        ucitajSvirke()
    },[])

    async function ucitajSvirke(){
        await SvirkaService.get().then((odgovor)=>{
            //console.table(odgovor.data)
            setSvirke(odgovor.data)
        })
    }


    return (
        <>
          
          <Table hover striped bordered>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Trajanje</th>
                    <th>Cijena</th>
                    <th>Datum pokretanja</th>
                    <th>Aktivan</th>
                </tr>
            </thead>
            <tbody>
                {svirke && svirke.map((s)=>(
                    <tr key={s.sifra}>
                        <td>{s.mjesto}</td>
                        <td>{s.datum}</td>
                        <td>{s.cijena}</td>
                        <td>{s.datum}</td>
                        <td>
                            <GrValidate 
                                color={s.odrzan ? 'green' : 'red'}
                                size={25}
                            />

                            

                        </td>
                    </tr>
                ))}
            </tbody>
          </Table>

    
            
        </>
    )
}