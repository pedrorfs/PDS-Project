import { useNavigate } from "react-router-dom"

import BankIcon from "../../assets/BankIcon.svg"
import Seta from "../../assets/Seta.png"

import "./InvestOptions.scss"

export function InvestOptions() {

  const navigate = useNavigate()

  return (
    <div className="options-container">
      <div className="options-container__box">
        <img src={BankIcon} alt="Banco" />
        <h3>Tesouro Direto</h3>
        <p>Títulos públicos de governo para receber em troca uma rentabilidade sobre seu investimento.</p>
        <div className="options-container__select-button">
          <button>
            Acessar
            <img src={Seta} alt="Seta" />
          </button>
        </div>
      </div>

      <div className="options-container__box">
        <img src={BankIcon} alt="Banco" />
        <h3>Bolsa de Valores</h3>
        <p>Aqui você investe em Fundos Imobiliários (FIIs), ações brasileiras, estrangeiras (BDRs) e fundos de Índice (ETFs).</p>
        <div className="options-container__select-button">
          <button data-cy="stock-market" onClick={() => navigate("/investir/bolsa-de-valores")}>
            Acessar
            <img src={Seta} alt="Seta" />
          </button>
        </div>
      </div>

      <div className="options-container__box">
        <img src={BankIcon} alt="Banco" />
        <h3>LCI e LCA</h3>
        <p>Isentos de imposto de renda, são investimentos de renda fixa e com garantia do FGC.</p>
        <div className="options-container__select-button">
          <button>
            Acessar
            <img src={Seta} alt="Seta" />
          </button>
        </div>
      </div>

      <div className="options-container__box">
        <img src={BankIcon} alt="Banco" />
        <h3>CDBs</h3>
        <p>Opções para investir com baixo risco e rentabilidade maior que a poupança, atrelada ao CDI.</p>
        <div className="options-container__select-button">
          <button>
            Acessar
            <img src={Seta} alt="Seta" />
          </button>
        </div>
      </div>

    </div>
  )
}