import { useEffect, useState } from "react";

import "./FavoriteStocks.scss"

import { FavoriteStockOption } from "../../components/FavotiteStockOption/FavoriteStockOption";

const stocks = [
  {
    id: "1",
    name: "Vale",
    stock: "VALE3",
    price: "59,76",
    type: "stock"
  },
  {
    id: "2",
    name: "Vale",
    stock: "VALE3",
    price: "59,76",
    type: "stock"
  }
]

export function FavoriteStocks() {

  return (
    <div className="favorite-list-container">
      <div className="favorite-list-container__content">
        <h1 className="header">Meus Favoritos</h1>

        <div className="stocks">
          {stocks?.map(stock => {
            return (
              <FavoriteStockOption
                key={stock.stock}
                name={stock.name}
                stock={stock.stock}
                type={stock.type}
              />
            )
          })}
        </div>
      </div>

    </div>
  )
}