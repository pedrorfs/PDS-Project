import { useNavigate } from "react-router-dom"

import "./StockOption.scss"

interface StockOptionProps {
  id: string
  title: string
  name: string
  price: string
}

export function StockOption({ id, title, name, price }: StockOptionProps) {

  const navigate = useNavigate()

  return (
    <div className="stock-container">
      <div className="stock-container__name">
        <h3>{title}</h3>
        <p>{name}</p>
      </div>
      <h3>R$ {price}</h3>
      <h3 onClick={() => navigate(`/investir/bolsa-de-valores/comprar/${name.toLocaleLowerCase()}`)} className="stock-container__buy">Comprar</h3>
    </div>
  )
}