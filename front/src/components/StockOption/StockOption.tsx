import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import "./StockOption.scss"

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { addFavorite } from "../../requests/Invest/AddFavorites";
import { getFavoriteStocks } from "../../requests/Invest/GetFavorites";

interface StockOptionProps {
  change: number
  close: number
  name: string
  sector: string
  stock: string
  volume: number
  type: string
}

interface FavoriteStock {
  Code: string
  Name: string
}

export function StockOption({ change, close, name, sector, stock, volume, type }: StockOptionProps) {

  const navigate = useNavigate()

  const [favorite, setFavorite] = useState(false)
  const [myFavoriteStocks, setMyFavoriteStocks] = useState<FavoriteStock[]>([])

  const handleFavorite = async () => {

    const data = {
      code: stock,
      name: name,
    }

    const response = await addFavorite(data)
  }

  const getFavorites = async () => {
    const response = await getFavoriteStocks()

    setMyFavoriteStocks(response)

    // console.log('favorites', myFavoriteStocks)
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <div className="stock-container">
      <div className="stock-container__name">
        <h3>{name}</h3>
        <p>{stock}</p>
      </div>
      <h3 className="stock-container__price">{close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
      <div className="buy-fav">
        <h3 onClick={() => navigate(`/investir/bolsa-de-valores/comprar/${stock}`)} className="buyfav__buy">Comprar</h3>
        {myFavoriteStocks.find(
          (favorite) => favorite.Code === stock
        ) ?
          (<FaHeart
            // color="red"
            size={20}
            style={{
              cursor: 'pointer'
            }}
            // onClick={() => setFavorite(!favorite)}
            onClick={() => handleFavorite()}
          />) :
          (<FaRegHeart
            // color="red"
            size={20}
            style={{
              cursor: 'pointer'
            }}
            // onClick={() => setFavorite(!favorite)}
            onClick={() => handleFavorite()}
          />)}
      </div>

    </div>
  )
}