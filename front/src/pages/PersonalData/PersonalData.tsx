import { useState, useEffect } from 'react'

import Seta from './../../assets/Seta.png'

import './PersonalData.scss'

export function PersonalData() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const data = {
    name: name,
    email: email,
    cpf: cpf,
    password: password
  }

  const handleSubmit = () => {
    console.log(data)
    window.location.reload()
  }

  return (
    <div className='personal-data'>
      <h1 className='personal-data__title'>Meus dados</h1>
      <div className='personal-data__input'>
        <label>
          Nome Completo
          <input
            type="text"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />
        </label>
      </div>

      <div className='personal-data__input'>
        <label>
          CPF
          <input
            type="text"
            onChange={(e: any) => setCpf(e.target.value)}
            value={cpf}
          />
        </label>
      </div>

      <div className='personal-data__input'>
        <label>
          Email
          <input
            type="text"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
        </label>
      </div>

      <div className='personal-data__input'>
        <label>
          Senha
          <input
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div className='personal-data__button' onClick={() => handleSubmit()}>
        Atualizar dados
        <img src={Seta} alt="" />
      </div>

    </div>
  )
}