import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './style.scss'

import { Home } from './components/Home/Home.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Main } from './pages/Main/Main.tsx'
import { Deposit } from './components/Deposit/Deposit.tsx';
import { Register } from './pages/Register/Register.tsx';
import { BuyStock } from './pages/BuyStock/BuyStock.tsx';
import { InvestList } from './pages/InvestList/InvestList.tsx';
import { InvestOptions } from './pages/InvestOptions/InvestOptions.tsx';
import { Wallet } from './pages/Wallet/Wallet.tsx';
import { FavoriteStocks } from './pages/FavoriteStocks/FavoriteStocks.tsx';
import { PersonalData } from './pages/PersonalData/PersonalData.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Register />} />
                <Route element={<Main />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/dados-pessoais' element={<PersonalData />} />
                    <Route path='/depositar' element={<Deposit />} />
                    <Route path='/carteira' element={<Wallet />} />
                    <Route path='/favoritos' element={<FavoriteStocks />} />
                    <Route path='/investir' element={<InvestOptions />} />
                    <Route path='/investir/bolsa-de-valores' element={<InvestList />} />
                    <Route path='/investir/bolsa-de-valores/comprar/:name' element={<BuyStock />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
