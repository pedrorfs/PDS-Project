import { useState, useEffect } from 'react';

import Asset from './../../components/Asset/Asset.tsx';
import './wallet.scss'

import { getBuyStocks } from '../../requests/Invest/GetBuyStock.tsx';

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

interface BuyStock {
    Code: string
    Name: string
    Price: number
    Quantity: number
}

export function Wallet() {

    const [myStocks, setMyStocks] = useState<BuyStock[]>([])

    const [apiData, setApiData] = useState<StockOptionProps[]>([])

    const [stockNameDisplay, setStockNameDisplay] = useState('')
    const [stockCodDisplay, setStockCodDisplay] = useState('')
    const [stockPriceDisplay, setStockPriceDisplay] = useState(0)

    const getUserStocks = async () => {

        const response = await getBuyStocks()

        console.log(response)

        setMyStocks(response)
        console.log('minhas ações')
        console.log(myStocks)

    }

    // const getStockData = async () => {

    //     const response = await apiB3.get(`/quote/list?token${apiToken}&search=${searchStockName}`)
    //     // console.log(response.data)
    //     // const data = response.data.stocks[0]
    //     setApiData(response.data.stocks[0])
    //     console.log(apiData)

    //     setStockCodDisplay(response.data.stocks[0].stock)

    //     setStockNameDisplay(response.data.stocks[0].name)

    //     setStockPriceDisplay(response.data.stocks[0].close)
    //     // setSearchApiData(apiData.filter(data => (data.stock.toLocaleLowerCase().indexOf(searchStockName?.toLowerCase) > -1)))
    //     // console.log(searchApiData)
    //   }

    useEffect(() => {

        getUserStocks()

    }, [])

    // useEffect(() => {
    //     getUserStocks()
    //   }, [])

    let totalInvestValue = 0;

    for (const stock in myStocks) {
        totalInvestValue += (myStocks[stock].Price * myStocks[stock].Quantity)
    }

    let totalIncome = 0;

    return (
        <div className='wallet'>
            <h2 className='wallet__title'>Carteira</h2>
            <div className='wallet__my-investments-info'>
                <h4>Meus investimentos</h4>
                <div className='wallet__my-investments-info__value'>{totalInvestValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
            <div className='wallet__yield-info'>
                {/* <p>Rendimento Total: R$ XXXXX</p> */}
                {/* <p>Valor Aplicado: {totalInvestValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> */}
            </div>

            <h5 className='wallet__my-assets'>Meus ativos</h5>
            <div className='wallet__assets'>
                {/* <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset /> */}
                {myStocks?.map(stock => {
                    return (
                        <Asset
                            key={stock.Code}
                            Code={stock.Code}
                            Name={stock.Name}
                            Price={stock.Price}
                            Quantity={stock.Quantity}
                        />
                    )
                })}
            </div>
        </div>
    )
}