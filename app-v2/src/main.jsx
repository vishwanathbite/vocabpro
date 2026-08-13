import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initAppearance } from './logic/appearance.js'

/* BEFORE createRoot, deliberately. The font-size setting scales every text
   utility in the app, so applying it from a mount effect would paint one frame
   at the default size and then reflow everything — the flash being worst for
   exactly the students who chose `large`. This is a single attribute write
   against already-memoized storage, so it costs nothing measurable. */
initAppearance()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
