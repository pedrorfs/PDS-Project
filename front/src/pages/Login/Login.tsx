import "./login.scss";
import Seta from  './../../assets/Seta.png';
import Logo from './../../assets/Eminente.svg'

export default function Login() {


    return (
        <div className="login">
            <div className="login__logo">
                <img src={Logo} alt="" srcset="" />
            </div>
            <form className="login__form">
                <h3>Acesse sua conta</h3>
                <div className="login__cpf">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" />
                </div>
                <div className="login__password">
                    <label htmlFor="cpf">Senha</label>
                    <input type="text" id="cpf" />
                </div>
                <div className="login__button">
                    <button className="btn-primary">
                        <img src={Seta} alt="" srcset="" />
                    </button>
                </div>
            </form>
        </div>
    )
}