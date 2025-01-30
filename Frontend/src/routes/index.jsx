import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login"
import Home from "../pages/Home"
import Collections from "../pages/Collections"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Cart from "../pages/Cart"
import Orders from "../pages/Orders"
import placeOrders from "../pages/PlaceOrder"
import Product from "../pages/Product"
import PlaceOrder from "../pages/PlaceOrder";
import Verify from "../pages/Verify";

const router =createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/collection",
                element:<Collections/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/orders",
                element:<Orders/>
            },
            {
                path:"/product/:productId",
                element:<Product/>
            },
            {
                path:"/placeOrder",
                element:<PlaceOrder/>
            },
            {
                path:"/verify",
                element:<Verify/>
            }


        ]
    },
    

])

export default router;