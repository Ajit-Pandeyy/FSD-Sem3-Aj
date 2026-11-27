import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import Navbar from './components/Navbar.tsx'
// import { BrowserRouter ,Route} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Route path="/" element={<App />} />
    </BrowserRouter>
  </StrictMode>,
)
