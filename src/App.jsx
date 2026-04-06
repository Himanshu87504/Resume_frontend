import { useState } from 'react'

import './App.css'
import SideBar from './components/SideBar/SideBar'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import History from './components/History/History'
import Admin from './components/Admin/Admin'
import Login from './components/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <SideBar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/history' element={<History />} />
        <Route path='/admin' element={<Admin />} />

      </Routes>
    </div>
  )
}

export default App
