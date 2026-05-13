import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

var scroll = new LocomotiveScroll({
  el:document.querySelector("#root"),
  smooth:true,
}
)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastProvider>
    <CartProvider>
    <AuthProvider>
      <App/>
    </AuthProvider>
    </CartProvider>
    </ToastProvider>
  </BrowserRouter>
)
