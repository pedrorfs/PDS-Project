import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import ArrowBack from "../../assets/ArrowBack.svg"
import Arrow from "../../assets/Arrow.svg"

import { FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";

import "./BuyStock.scss"

import { getUserData } from "../../requests/User/GetUserData";
import { getFavoriteStocks } from "../../requests/Invest/GetFavorites";
import { buyStock } from "../../requests/Invest/BuyStock";
import { addFavorite } from "../../requests/Invest/AddFavorites";
import { removeFavorite } from "../../requests/Invest/RemoveFavorites";

import { apiB3 } from "../../api/config";

const apiToken = 'hwKxsC7rtYAkff6xh2mGPF'

interface StockOptionProps {
  change: number
  close: number
  logo: string
  market_cap: number | null
  name: string
  sector: string
  stock: string
  type: string
  volume: number
}

interface FavoriteStock {
  Code: string
  Name: string
}

export function BuyStock() {

  const navigate = useNavigate()

  const stockName = useParams()

  const [apiData, setApiData] = useState<StockOptionProps[]>([])
  const [searchApiData, setSearchApiData] = useState<StockOptionProps[]>([])

  const [stockNameDisplay, setStockNameDisplay] = useState('')
  const [stockCodDisplay, setStockCodDisplay] = useState('')
  const [stockPriceDisplay, setStockPriceDisplay] = useState(0)

  const [balance, setBalance] = useState(0)
  const [investValue, setInvestValue] = useState(0)
  const [stockQuotes, setStockQuotes] = useState(0)

  const [myFavoriteStocks, setMyFavoriteStocks] = useState<FavoriteStock[]>([])

  const [favorite, setFavorite] = useState(false)

  const getStockData = async () => {
    console.log(stockName)
    const searchStockName = stockName.name
    console.log(searchStockName);

    const response = await apiB3.get(`/quote/list?token${apiToken}&search=${searchStockName}`)
    // console.log(response.data)
    // const data = response.data.stocks[0]
    setApiData(response.data.stocks[0])
    console.log(apiData)

    setStockCodDisplay(response.data.stocks[0].stock)

    setStockNameDisplay(response.data.stocks[0].name)

    setStockPriceDisplay(response.data.stocks[0].close)
    // setSearchApiData(apiData.filter(data => (data.stock.toLocaleLowerCase().indexOf(searchStockName?.toLowerCase) > -1)))
    // console.log(searchApiData)
  }

  const getUser = async () => {

    const response = await getUserData()

    setBalance(response.data.balance)

  }

  const getFavorites = async () => {
    const response = await getFavoriteStocks()

    setMyFavoriteStocks(response)

    // console.log('favorites', myFavoriteStocks)
  }

  // useEffect(() => {
  //   getUser()
  // }, [])

  useEffect(() => {
    getStockData()
    getUser()
    getFavorites()
  }, [])

  const handleSubmit = async () => {

    const data = {
      code: stockCodDisplay,
      name: stockNameDisplay,
      quantity: Math.floor(investValue / stockPriceDisplay),
      price: stockPriceDisplay
    }

    console.log('investimentos')
    console.log(data)

    const response = await buyStock(data)

    navigate('/carteira')

  }

  const handleAddFavorite = async () => {

    const data = {
      code: stockCodDisplay,
      name: stockNameDisplay,
    }

    const response = await addFavorite(data)

    window.location.reload()
  }

  const handleRemoveFavorite = async () => {

    const data = {
      code: stockCodDisplay,
    }

    const response = await removeFavorite(data)

    window.location.reload()
  }

  return (
    <div className="buy-stock-container">
      <div className="buy-stock-container__content">
        <div className="top-buttons">
          <img onClick={() => navigate("/investir/bolsa-de-valores")} src={ArrowBack} alt="Voltar" />
          {myFavoriteStocks.find(
            (favorite) => favorite.Code === stockCodDisplay
          ) ?
            (<FaHeart
              // color="red"
              size={24}
              style={{
                cursor: 'pointer'
              }}
              onClick={() => handleRemoveFavorite()}
            />) :
            (<FaRegHeart
              // color="red"
              size={24}
              style={{
                cursor: 'pointer'
              }}
              onClick={() => handleAddFavorite()}
            />)}
        </div>

        <div className="header">
          <h1>Quanto você quer investir?</h1>
          <p>Saldo disponível: <span> {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
          <p>Valor unitário {stockCodDisplay}: <span> {stockPriceDisplay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
        </div>

        <div className="mid">
          <p>Valor a investir</p>
          {/* <span>R$ 0,00</span> */}
          <input
            placeholder="Digite o valor que deseja investir"
            type="text"
            data-cy="input-investment-value"
            onChange={(e: any) => setInvestValue(e.target.value)}
          />
        </div>

        <div className="confirm">
          <div>
            <h3>Quantidade estimada</h3>
            <p>{Math.floor(investValue / stockPriceDisplay)} cotas</p>
          </div>
          <button
            data-cy="confirm-investment"
            onClick={() => handleSubmit()}>
            {/* <img src={Arrow} alt="Seta" /> */}
            {/* <FaArrowRight style={{
              width: "1rem",
              height: "1rem",
              color: "white",
            }} /> */}
            Confirmar investimento
          </button>
        </div>
      </div>
    </div>
  )
}