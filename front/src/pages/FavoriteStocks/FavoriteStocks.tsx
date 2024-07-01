import { useEffect, useState } from "react";

import "./FavoriteStocks.scss"

import { FavoriteStockOption } from "../../components/FavotiteStockOption/FavoriteStockOption";

import { getFavoriteStocks } from "../../requests/Invest/GetFavorites";

interface FavoriteStock {
  Code: string
  Name: string
}

export function FavoriteStocks() {

  const [myFavoriteStocks, setMyFavoriteStocks] = useState<FavoriteStock[]>([])

  const getFavorites = async () => {
    const response = await getFavoriteStocks()

    setMyFavoriteStocks(response)

    // console.log('favorites', myFavoriteStocks)
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <div className="favorite-list-container">
      <div className="favorite-list-container__content">
        <h1 className="header">Meus Favoritos</h1>

        <div className="stocks">
          {myFavoriteStocks?.map(stock => {
            return (
              <FavoriteStockOption
                key={stock.Code}
                name={stock.Name}
                stock={stock.Code}
                // type={stock.type}
              />
            )
          })}
        </div>
      </div>

    </div>
  )
}