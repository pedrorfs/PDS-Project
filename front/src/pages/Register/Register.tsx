import axios from "axios"

import Logo from './../../assets/Eminente.svg'
import './register.scss'
import Seta from './../../assets/Seta.png'

import { apiBack } from "../../api/config"

export function Register() {

    const handleSubmit = () => {
        const data = {
            "cpf": "12345678900",
            "name": "joao",
            "email": "joao@gmail.com",
            "password": "1234"
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": "joao",
            "email": "joao@gmail.com",
            "cpf": "12345678900",
            "password": "teste12345"
        });

        fetch("/api/user/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
        }).then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        // try {
        //     // await axios.post("http://127.0.0.1:5000/user/new", data)
        //     // await apiBack.post('/user/new', data)
        //     fetch("http://127.0.0.1:5000/user/new", {
        //         method: "POST", 
        //         mode: "no-cors",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         // body: JSON.stringify(data), 
        //         body: raw,
        //         redirect: "follow"
        //       });
        //     //   console.log(response.json()) ; // parses JSON response into native JavaScript objects
        // } catch (error) {
        //     console.log(error)
        // }

        // await fetch("http://127.0.0.1:5000/user/new", {
        //     method: 'POST',
        //     body: data
        // })

    }

    return (
        <div className="register">
            <img className='register__logo' src={Logo} alt="" srcset="" />
            <p className='register__description'>Abra sua conta</p>
            <div className='register__input'>
                <label>
                    Nome Completo
                    <input type="text" />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    CPF
                    <input type="text" />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    Email
                    <input type="text" />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    Criar senha
                    <input type="text" />
                </label>
            </div>
            <div className='register__input'>
                <label>
                    Confirmar senha
                    <input type="text" />
                </label>
            </div>
            <p className='register__permission'>Ao clicar em 'Continuar' com o seu cadastro, você autoriza a Eminente a coletar seus dados pessoais de acordo com as nossas Regras de Consentimento, com o objetivo de comunicar informações sobre o processo de abertura da sua conta.</p>
            <div className='register__button' onClick={() => handleSubmit()}>
                Continuar
                <img src={Seta} alt="" srcset="" />
            </div>
        </div>
    )
}
