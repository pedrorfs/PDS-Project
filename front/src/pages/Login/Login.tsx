import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
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

        if (response.msg === 'Validated successfully'){
            navigate('/home')
        } else{
            alert('Cpf e/ou senha incorretos')
        }

        
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src={Logo} alt="" />
            </div>
            <div className="login__form">
                <h3>Acesse sua conta</h3>
                <div className="login__cpf" id="cpf_input_login">
                    <label >CPF</label>
                    <IMaskInput
                        mask="000.000.000-00"
                        placeholder="000.000.000-00"
                        onChange={(e: any) => setCpf(e.target.value)}
                        value={cpf}
                    />
                </div>
                <div className="login__password" id="password_input_login">
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