import './deposit.scss'
import Button from './../../assets/buttonReturn.svg'

const Deposit = () => {
  return (
    <div className='deposit'>
        <h2 className='deposit__title'>Depósito</h2>
        <button className='deposit__return-button'>
            <img src={Button} alt="" srcset="" />
        </button>
        <div className="deposit__block">
            <h3>Depósito via Pix</h3>
            <div>
                <h5>Chave</h5>
                <p>pix@eminente.br</p>
            </div>
        </div>
    </div>
  )
}

export default Deposit