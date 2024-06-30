import { useState, useEffect } from 'react'

import Seta from './../../assets/Seta.png'

import './PersonalData.scss'

import { updateUser } from '../../requests/User/UpdateUser'
import { getUserData } from '../../requests/User/GetUserData'

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

  const submit = () => {
    const data = {
      name: name,
      cpf: cpf,
      email: email,
      password: password,
    }

    console.log(data)
  }

  const handleSubmit = async () => {
    const data = {
      "name": name,
      "email": email,
      "cpf": cpf,
      "password": password
    }
    const response = await updateUser(data)

    window.location.reload()

  }

  const getUser = async () => {

    const response = await getUserData()

    // console.log(response.data)

    setCpf(response.data.cpf)
    setEmail(response.data.email)
    setName(response.data.name)

  }

  useEffect(() => {
    getUser()
  }, [])

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