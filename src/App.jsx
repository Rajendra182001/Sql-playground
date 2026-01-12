import './App.css'
import Working from './Working'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Working />} />
    </Routes>
  )
}

export default App
