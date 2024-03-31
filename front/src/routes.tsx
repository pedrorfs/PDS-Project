import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './style.scss'

import Home from './components/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Main from './pages/Main/Main.tsx'
import Deposit from './components/Deposit/Deposit.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route element={<Main />}>
          <Route path='/' element={<Deposit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
