import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import router from './routes/index.jsx'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
</ShopContextProvider>
)
