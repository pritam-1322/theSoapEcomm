import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom"
import SearchBar from "./components/SearchBar"
import Footer from "./components/Footer"
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Toaster></Toaster> 
    <NavBar></NavBar>
    <SearchBar></SearchBar>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  )
}

export default App
