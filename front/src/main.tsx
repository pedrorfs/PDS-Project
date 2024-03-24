import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import Home from './components/Home/Home.tsx';
import Login from  './pages/Login/Login.tsx';
import DefaultPage from './pages/Default/DefaultPage.tsx';
import './style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DefaultPage />
  </React.StrictMode>,
)
