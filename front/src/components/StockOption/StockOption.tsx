import { useNavigate } from "react-router-dom"

import "./StockOption.scss"

interface StockOptionProps {
  change: number
  close: number
  name: string
  sector: string
  stock: string
  volume: number
}

export function StockOption({ change, close, name, sector, stock, volume }: StockOptionProps) {

  const navigate = useNavigate()

  return (
    <div className="stock-container">
      <div className="stock-container__name">
        <h3>{name}</h3>
        <p>{name}</p>
      </div>
      <h3>{close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
      <h3 onClick={() => navigate(`/investir/bolsa-de-valores/comprar/${stock.toLocaleLowerCase()}`)} className="stock-container__buy">Comprar</h3>
    </div>
  )
}