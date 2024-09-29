import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './HomePage.jsx'
import EditorPage from './EditorPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePage />
    <EditorPage/>
  </StrictMode>,
)
