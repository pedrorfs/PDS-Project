import { useEffect, useState } from "react";
import axios from "axios";

import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { IoSearch } from "react-icons/io5";

import SearchIcon from "../../assets/SearchIcon.svg"

import { StockOption } from "../../components/StockOption/StockOption";

import "./InvestList.scss"

import { apiB3 } from "../../api/config";

// const baseUrl = 'https://api.hgbrasil.com/finance'
// const apiKey = 'cd4fbc2d'

const baseUrl = 'https://brapi.dev/api'
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

export function InvestList() {

  const [isSelectedETF, setIsSelectedETF] = useState(false)
  const [isSelectedFII, setIsSelectedFII] = useState(false)
  const [isSelectedStock, setIsSelectedStock] = useState(false)

  const [searchText, setSearchText] = useState('')

  const [apiData, setApiData] = useState([])
  const [stocksDisplay, setStocksDisplay] = useState<StockOptionProps[] | null>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setSearchText(event.target.value);
  };

  const searchStocks = async () => {
    console.log(searchText)
  }

  const getApiData = async () => {
    try {
      // let response
      // if(searchText === ''){
      //   response = await apiB3.get(`/quote/list?token${apiToken}`)
      // } else {
      //   response = await apiB3.get(`/quote/list?token${apiToken}?search=${searchText}`)
      // }
      const response = await apiB3.get(`/quote/list?token${apiToken}`)
      const data = response.data.stocks
      setApiData(data)
      console.log(apiData)
      console.log('slice')
      console.log(data.slice(0, 8))
      setStocksDisplay(data.slice(0, 8))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApiData()
  }, [])

  return (
    <div className="list-container">
      <div className="list-container__filters">
        <button
          onClick={() => { setIsSelectedETF(!isSelectedETF) }}
          className={`${isSelectedETF ? "black-filter" : ""}`}>
          Fundos de Índice (ETFs)
        </button>
        <button
          onClick={() => { setIsSelectedFII(!isSelectedFII) }}
          className={`${isSelectedFII ? "black-filter" : ""}`}>
          Fundos Imobiliários (FIIs)
        </button>
        <button
          onClick={() => { setIsSelectedStock(!isSelectedStock) }}
          className={`${isSelectedStock ? "black-filter" : ""}`}>
          Ações Brasileiras
        </button>
      </div>

      <div className="list-container__search">
        {/* <TextField
          // label="With normal TextField"
          size="small"
          variant="outlined"
          onChange={handleChange}
          placeholder="Buscar"
          sx={{ m: 1, width: '100%', border: "none", background: "#E1E1E1", color: "#858585" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>,
          }}
        /> */}
        <input
          type="text"
          placeholder="Pesquise por um ativo"
          onChange={handleChange}
          value={searchText}
        />
        <button onClick={searchStocks}>
          <IoSearch style={{
            color: "white",
            height: "1.5rem",
            width: "1.5rem",
          }} />
          Buscar
        </button>
      </div>

      <div className="list-container__stocks">
        {stocksDisplay?.map(stock => {
          return (
            <StockOption
              key={stock.stock}
              change={stock.change}
              close={stock.close}
              name={stock.name}
              sector={stock.sector}
              stock={stock.stock}
              volume={stock.volume}
            />
          )
        })}
      </div>
    </div>
  )
}