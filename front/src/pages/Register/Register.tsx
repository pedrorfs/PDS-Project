import Logo from './../../assets/Eminente.svg'
import './register.scss'
import Seta from './../../assets/Seta.png'

export function Register() {
  return (
    <div className="register">
        <img className='register__logo' src={Logo} alt="" srcset="" />
        <p className='register__description'>Abra sua conta</p>
        <div className='register__input'>
            <label>
                Nome Comleto
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
        <div className='register__button'>
                Continuar
                <img src={Seta} alt="" srcset="" />
        </div>
    </div>
  )
}
