import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import ArrowBack from "../../assets/ArrowBack.svg"
import Arrow from "../../assets/Arrow.svg"

import { FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";

import "./BuyStock.scss"

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

export function BuyStock() {

  const navigate = useNavigate()

  const stockName = useParams()

  const [apiData, setApiData] = useState<StockOptionProps[]>([])
  const [searchApiData, setSearchApiData] = useState<StockOptionProps[]>([])

  const [stockNameDisplay, setStockNameDisplay] = useState('')
  const [stockCodDisplay, setStockCodDisplay] = useState('')
  const [stockPriceDisplay, setStockPriceDisplay] = useState(0)

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

  useEffect(() => {
    getStockData()
  }, [])

  return (
    <div className="buy-stock-container">
      <div className="buy-stock-container__content">
        <div className="top-buttons">
          <img onClick={() => navigate("/investir/bolsa-de-valores")} src={ArrowBack} alt="Voltar" />
          {favorite ?
            (<FaHeart
              // color="red"
              size={24}
              style={{
                cursor: 'pointer'
              }}
              onClick={() => setFavorite(!favorite)}
            />) :
            (<FaRegHeart
              // color="red"
              size={24}
              style={{
                cursor: 'pointer'
              }}
              onClick={() => setFavorite(!favorite)}
            />)}
        </div>

        <div className="header">
          <h1>Quanto você quer investir?</h1>
          <p>Saldo disponível: <span> R$ 100,00</span></p>
          <p>Valor unitário {stockCodDisplay}: <span> {stockPriceDisplay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
        </div>

        <div className="mid">
          <p>Valor a investir</p>
          <span>R$ 0,00</span>
        </div>

        <div className="confirm">
          <div>
            <h3>Quantidade estimada</h3>
            <p>0 cotas</p>
          </div>
          <button>
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