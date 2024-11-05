import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChartProvider } from './context/ChartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChartProvider>
      <App />
    </ChartProvider>
  </StrictMode>,
)
