import { useEffect, useState } from "react";
import axios from "axios";

import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { IoSearch } from "react-icons/io5";

import SearchIcon from "../../assets/SearchIcon.svg"

import { StockOption } from "../../components/StockOption/StockOption";

import "./InvestList.scss"

import { apiB3 } from "../../api/config";

import { getFavoriteStocks } from "../../requests/Invest/GetFavorites";

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

interface FavoriteStock {
    Code: string
    Name: string
}

export function InvestList() {

    const [loading, setLoading] = useState(false)

    const [isSelectedETF, setIsSelectedETF] = useState(false)
    const [isSelectedFII, setIsSelectedFII] = useState(false)
    const [isSelectedStock, setIsSelectedStock] = useState(false)

    const [searchText, setSearchText] = useState('')

    const [apiData, setApiData] = useState<StockOptionProps[]>([])
    const [searchApiData, setSearchApiData] = useState<StockOptionProps[]>([])

    const [filterFIIData, setFilterFIIData] = useState<StockOptionProps[]>([])
    const [filterStockData, setFilterStockData] = useState<StockOptionProps[]>([])
    const [filterBDRData, setFilterBDRData] = useState<StockOptionProps[]>([])

    const [stocksDisplay, setStocksDisplay] = useState<StockOptionProps[]>([])

    const [myFavoriteStocks, setMyFavoriteStocks] = useState<FavoriteStock[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        setSearchText(event.target.value);
    };

    const searchStocks = () => {

        setSearchApiData(apiData.filter(data => {
            return data.stock.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) == 0 || data.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) == 0
        }))

        setStocksDisplay(searchApiData.slice(0, 12))
    }

    const filterFII = () => {
        if (isSelectedFII === false) {
            setIsSelectedFII(true)
            setIsSelectedStock(false)
            setIsSelectedETF(false)

            setFilterFIIData(apiData.filter(data => (data.type === 'fund')))
            console.log(filterFIIData)

            if (filterFIIData.length > 0) {
                setStocksDisplay(filterFIIData.slice(0, 12))
            }
        } else if (isSelectedFII === true) {
            setIsSelectedFII(false)

            setStocksDisplay(apiData.slice(0, 12))
        }
    }

    const filterStock = () => {
        if (isSelectedStock === false) {
            setIsSelectedStock(true)
            setIsSelectedFII(false)
            setIsSelectedETF(false)

            setFilterStockData(apiData.filter(data => (data.type === 'stock')))
            console.log(filterStockData)

            if (filterStockData.length > 0) {
                setStocksDisplay(filterStockData.slice(0, 12))
            }
        } else if (isSelectedStock === true) {
            setIsSelectedStock(false)

            setStocksDisplay(apiData.slice(0, 12))
        }
    }

    const filterBDR = () => {
        if (isSelectedETF === false) {
            setIsSelectedETF(true)
            setIsSelectedFII(false)
            setIsSelectedStock(false)

            setFilterBDRData(apiData.filter(data => (data.type === 'bdr')))

            if (filterBDRData.length > 0) {
                setStocksDisplay(filterBDRData.slice(0, 12))
            }
        } else if (isSelectedETF === true) {
            setIsSelectedETF(false)

            setStocksDisplay(apiData.slice(0, 12))
        }
    }

    const getApiData = async () => {
        setLoading(true)
        try {
            const response = await apiB3.get(`/quote/list?token${apiToken}`)

            const data = response.data.stocks
            setApiData(response.data.stocks)

            setStocksDisplay(data.slice(0, 12))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (apiData.length === 0) {
            getApiData()
        }

        searchStocks()

    }, [searchText])

    const getFavorites = async () => {
        const response = await getFavoriteStocks()
        setMyFavoriteStocks(response)

        // console.log('favorites', myFavoriteStocks)
    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <div className="list-container">
            <div className="list-container__content">
                <div className="filters">
                    <button
                        onClick={filterBDR}
                        className={`${isSelectedETF ? "black-filter" : ""}`}>
                        Fundos de Índice (ETFs)
                    </button>
                    <button
                        onClick={filterFII}
                        className={`${isSelectedFII ? "black-filter" : ""}`}>
                        Fundos Imobiliários (FIIs)
                    </button>
                    <button
                        onClick={filterStock}
                        className={`${isSelectedStock ? "black-filter" : ""}`}>
                        Ações Brasileiras
                    </button>
                </div>

                <div className="search">
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

                {loading && (
                    <div className="loading">
                        <h2>Carregando...</h2>
                    </div>
                )}
                <div className="stocks">
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
                                type={stock.type}
                                favorite={myFavoriteStocks.find(
                                    (favorite) => favorite.Code === stock.stock
                                ) ? true : false}

                            />
                        )
                    })}
                </div>

            </div>
        </div>
    )
}