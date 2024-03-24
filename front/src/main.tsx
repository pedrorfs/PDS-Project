import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from './App.tsx';
import Home from './components/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import DefaultPage from './pages/Default/DefaultPage.tsx';

import './style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
