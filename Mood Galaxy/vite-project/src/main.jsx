import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Welcome from './welcome'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Welcome/>
  </StrictMode>,
)
