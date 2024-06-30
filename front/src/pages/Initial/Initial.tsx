import Logo from './../../assets/Eminente.svg';
import { useNavigate } from "react-router-dom"
import './initial.scss'

export function Initial() {
    const navigate = useNavigate()

    return (
        <div className="initial">
            <div className='initial__content'>
                <div>
                    <img src={Logo} />
                    <p>Investir com frequência é o segredo para chegar cada vez mais longe</p>
                </div>
                <div>
                    <button className='initial__content__access-account' onClick={() => navigate('/login')}>Acessar conta</button>
                    <p className='initial__content__create-account' onClick={() => navigate('/cadastro')}>Abrir conta</p>
                </div>
            </div>
        </div>
    )
}

