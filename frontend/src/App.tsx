import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Header/>
      <Outlet /> 
      <Footer/>
    </>
  )
}

export default App
