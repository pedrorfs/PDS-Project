import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./login.scss";
import Seta from './../../assets/Seta.png';
import Logo from './../../assets/Eminente.svg'

import { login } from "../../requests/User/Login";

export function Login() {

    const navigate = useNavigate()

    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        const data = {
            cpf: cpf,
            password: password,
        }

        console.log(data)
    }

    const handleSubmit = async () => {
        const data = {
            "cpf": cpf,
            "password": password
        }

        const response = await login(data)

        navigate('/home')
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src={Logo} alt="" />
            </div>
            <div className="login__form">
                <h3>Acesse sua conta</h3>
                <div className="login__cpf">
                    <label >CPF</label>
                    <input
                        placeholder="Digite seu email"
                        type="text"
                        onChange={(e: any) => setCpf(e.target.value)}
                        value={cpf} />
                </div>
                <div className="login__password">
                    <label>Senha</label>
                    <input
                        placeholder="Digite sua senha"
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login__button">
                    <button className="btn-primary" onClick={() => handleSubmit()}>
                        <img src={Seta} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}