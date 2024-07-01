import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import "./StockOption.scss"

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { addFavorite } from "../../requests/Invest/AddFavorites";
import { removeFavorite } from "../../requests/Invest/RemoveFavorites";

interface StockOptionProps {
  change: number
  close: number
  name: string
  sector: string
  stock: string
  volume: number
  type: string
  favorite: boolean
}

export function StockOption({ change, close, name, sector, stock, volume, type, favorite }: StockOptionProps) {

  const navigate = useNavigate()

  // const [favorite, setFavorite] = useState(false)

  const handleAddFavorite = async () => {

    const data = {
      code: stock,
      name: name,
    }

    const response = await addFavorite(data)

    window.location.reload()
  }

  const handleRemoveFavorite = async () => {

    const data = {
      code: stock,
    }

    const response = await removeFavorite(data)

    window.location.reload()
  }

  return (
    <div className="stock-container">
      <div className="stock-container__name">
        <h3>{name}</h3>
        <p>{stock}</p>
      </div>
      <h3 className="stock-container__price">{close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
      <div className="buy-fav">
        <h3 onClick={() => navigate(`/investir/bolsa-de-valores/comprar/${stock}`)} className="buyfav__buy">Comprar</h3>
        {favorite ?
          (<FaHeart
            // color="red"
            size={20}
            style={{
              cursor: 'pointer'
            }}
            // onClick={() => setFavorite(!favorite)}
            onClick={() => handleRemoveFavorite()}
          />) :
          (<FaRegHeart
            // color="red"
            size={20}
            style={{
              cursor: 'pointer'
            }}
            // onClick={() => setFavorite(!favorite)}
            onClick={() => handleAddFavorite()}
          />)}
      </div>

    </div>
  )
}