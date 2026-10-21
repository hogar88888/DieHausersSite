import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SvirkaPregled from './pages/svirke/SvirkaPregled'
import SvirkaNovi from './pages/svirke/SvirkaNovi'
import SvirkaPromjena from './pages/svirke/SvirkaPromjena'
import LokacijePregled from './pages/lokacije/LokacijePregled'
import LokacijeNovi from './pages/lokacije/LokacijeNovi'
import LokacijePromjena from './pages/lokacije/LokacijePromjena'


function App() {

  return (
   <Container >
    <Izbornik />
    <Container className='app'>
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />

        <Route path={RouteNames.SVIRKE} element={<SvirkaPregled />} />
        <Route path={RouteNames.SVIRKE_NOVI} element={<SvirkaNovi />} />
        <Route path={RouteNames.SVIRKE_PROMJENA} element={<SvirkaPromjena />} />

        <Route path={RouteNames.LOKACIJE} element={<LokacijePregled />} />
        <Route path={RouteNames.LOKACIJE_NOVI} element={<LokacijeNovi />} />
        <Route path={RouteNames.LOKACIJE_PROMJENA} element={<LokacijePromjena />} />
      </Routes>
    </Container>
    <hr />
    &copy; {IME_APLIKACIJE}
   </Container>
  )
}

export default App


