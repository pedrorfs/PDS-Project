import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from  './pages/Login/Login.tsx';
import './style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
