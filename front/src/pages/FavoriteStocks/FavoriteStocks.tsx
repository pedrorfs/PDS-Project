import { useEffect, useState } from "react";

import "./FavoriteStocks.scss"

import { FavoriteStockOption } from "../../components/FavotiteStockOption/FavoriteStockOption";

const stocks = [
  {
    id: "1",
    title: "Vale",
    name: "VALE3",
    price: "59,76",
  },
  {
    id: "2",
    title: "Vale",
    name: "VALE3",
    price: "59,76",
  }
]

export function FavoriteStocks(){

  return (
    <div>
      <h1>Favoritos</h1>
    </div>
  )
}