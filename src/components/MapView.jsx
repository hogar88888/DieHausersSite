import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "../App.css"
import SvirkaService from "../services/svirke/SvirkaService";



function MapView() {
  const [fetchedSvirke, setFetchedSvirke] = useState([]);

  useEffect(() => {
      SvirkaService.getLokacije()
        .then((res) => setFetchedSvirke(res.data))
        .catch(() => { });
  }, []);


  return (
    <div className="card-body">
      <MapContainer center={CENTAR_OSIJEK} zoom={13} style={{ height: "550px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        />
        {fetchedSvirke.map((p) => {
  
          return (
            <Marker key={p.sifra} position={[p.lat,p.lon]}>
              <Popup>
                <div>
                  <strong>{p.naziv}</strong>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
     
    </div>

  );
}

export default MapView