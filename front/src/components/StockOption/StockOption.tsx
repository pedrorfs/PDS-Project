import { useNavigate } from "react-router-dom"
import { useState } from "react";

import "./StockOption.scss"

import { FaHeart, FaRegHeart } from "react-icons/fa";

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

  const [favorite, setFavorite] = useState(false)

  return (
    <div className="stock-container">
      <div className="stock-container__name">
        <h3>{name}</h3>
        <p>{stock}</p>
      </div>
      <h3>{close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
      <div className="buy-fav">
        <h3 onClick={() => navigate(`/investir/bolsa-de-valores/comprar/${stock}`)} className="buyfav__buy">Comprar</h3>
        {favorite ?
          (<FaHeart
            // color="red"
            size={20}
            style={{
              cursor: 'pointer'
            }}
            onClick={() => setFavorite(!favorite)}
          />) :
          (<FaRegHeart
            // color="red"
            size={20}
            style={{
              cursor: 'pointer'
            }}
            onClick={() => setFavorite(!favorite)}
          />)}
      </div>

    </div>
  )
}