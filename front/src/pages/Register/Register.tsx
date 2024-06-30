import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IMaskInput } from "react-imask";

import Logo from './../../assets/Eminente.svg'
import './register.scss'
import Seta from './../../assets/Seta.png'

import { register } from "../../requests/User/Register"

export function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submit = () => {
        const data = {
            name: name,
            cpf: cpf,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
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

        if (password !== confirmPassword) {
            alert("As senhas devem ser iguais")
        } else {
            const response = await register(data)

            if (response.msg === 'User already exists') {
                alert('Usuário já existe')
            } else if(response.msg === 'User successfully created'){
                navigate('/login')
            } else {
                alert('Erro ao cadastrar usuário')
            }
        }
    }

    return (
        <div className="register">
            <img className='register__logo' src={Logo} alt="" />
            <p className='register__description'>Abra sua conta</p>
            <div className='register__input'>
                <label>
                    Nome Completo
                    <input
                        placeholder="Digite o nome conforme seu documento"
                        type="text"
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                    />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    CPF
                    <IMaskInput
                        mask="000.000.000-00"
                        placeholder="000.000.000-00"
                        onChange={(e: any) => setCpf(e.target.value)}
                        value={cpf}
                    />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    Email
                    {/* <IMaskInput
                        mask="000.000.000-00"
                        placeholder="Digite seu email"
                        onChange={(e: any) => setEmail(e.target.value)}
                        value={email}
                    /> */}
                    <input
                        placeholder="Digite seu email"
                        type="text"
                        onChange={(e: any) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    Criar senha
                    <input
                        placeholder="Digite sua senha"
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    Confirmar senha
                    <input
                        placeholder="Confirme sua senha"
                        type="password"
                        onChange={(e: any) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </div>
            <p className='register__permission'>Ao clicar em 'Continuar' com o seu cadastro, você autoriza a Eminente a coletar seus dados pessoais de acordo com as nossas Regras de Consentimento, com o objetivo de comunicar informações sobre o processo de abertura da sua conta.</p>
            <div className='register__button' onClick={() => handleSubmit()}>
                Continuar
                <img src={Seta} alt="" />
            </div>
        </div>
    )
}
