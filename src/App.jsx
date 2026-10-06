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
      </Routes>
    </Container>
    <hr />
    &copy; {IME_APLIKACIJE}
   </Container>
  )
}

export default App
