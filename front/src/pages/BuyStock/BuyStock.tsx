import { useParams, useNavigate } from "react-router-dom"

import ArrowBack from "../../assets/ArrowBack.svg"
import Arrow from "../../assets/Arrow.svg"

import { FaArrowRight } from "react-icons/fa";

import "./BuyStock.scss"

export function BuyStock() {

  const navigate = useNavigate()

  const stockName = useParams();

  return (
    <div className="buy-stock-container">
      <div className="buy-stock-container__content">
        <img onClick={() => navigate("/investir-acoes")} src={ArrowBack} alt="Voltar" />

        <div className="header">
          <h1>Quanto você quer investir?</h1>
          <p>Saldo disponível: <span> R$ 100,00</span></p>
        </div>

        <div className="mid">
          <p>Valor a investir</p>
          <span>R$ 0,00</span>
        </div>

        <div className="confirm">
          <div>
            <h3>Quantidade estimada</h3>
            <p>0 cotas</p>
          </div>
          <button>
            {/* <img src={Arrow} alt="Seta" /> */}
            <FaArrowRight style={{
              width: "1rem",
              height: "1rem",
              color: "white",
            }} />
          </button>
        </div>
      </div>
    </div>
  )
}