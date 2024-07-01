import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './deposit.scss'
import Button from './../../assets/buttonReturn.svg'

import { addBalance } from '../../requests/User/AddBalance'
import { getUserData } from '../../requests/User/GetUserData'

export const Deposit = () => {

  const navigate = useNavigate()

  const [balance, setBalance] = useState(0)
  const [depositValue, setDepositValue] = useState('')

  const handleSubmit = async () => {
    const data = {
      balance: parseInt(depositValue)
    }

    const response = await addBalance(data)

    window.location.reload()
  }

  const getUser = async () => {

    const response = await getUserData()

    setBalance(response.data.balance)

  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='deposit'>
        <h2 className='deposit__title'>Depósito</h2>
        <button className='deposit__return-button' onClick={() => navigate('/home')}>
            <img src={Button} alt="" />
        </button>
        <p>Saldo disponível: <span> {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
        <h2 className='deposit__subtitle'>Qual o valor que deseja depositar?</h2>
        <input
            placeholder="Digite o valor que deseja depositar"
            type="text"
            onChange={(e: any) => setDepositValue(e.target.value)}
          />
        <h2 className='deposit__subtitle'>Selecione a forma de depósito</h2>
        <div className="deposit__block" onClick={() => handleSubmit()}>
            <h3>Depósito via Pix</h3>
            <div>
                <h5>Chave</h5>
                <p>pix@eminente.br</p>
            </div>
        </div>
    </div>
  )
}
