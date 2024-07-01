import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import "./asset.scss";
import ArrowDown from "./../../assets/arrow-down.svg"

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


function Asset({ Code, Name, Price, Quantity }: BuyStock) {
    const menu = useRef(null);
    const [menuState, setMenuState] = useState(false);

    const navigate = useNavigate()

    const [apiData, setApiData] = useState<StockOptionProps[]>([])

    const [stockNameDisplay, setStockNameDisplay] = useState('')
    const [stockCodDisplay, setStockCodDisplay] = useState('')
    const [stockPriceDisplay, setStockPriceDisplay] = useState(0)

    useEffect(() => {
        const closeDropdown = e => {
            if (!menu?.current?.contains(e.target)) {
                setMenuState(false);
            }
        }
        document.body.addEventListener('click', closeDropdown)
    }, [])

    const getStockData = async () => {

        const response = await apiB3.get(`/quote/list?token${apiToken}&search=${Code}`)
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
        <div className="asset">
            <div className='asset__header'>
                <h3 className='asset__title'>{Code}</h3>
                <div className='asset__menu'>
                    <img src={ArrowDown} ref={menu} onClick={() => setMenuState(!menuState)} />
                    {
                        menuState &&
                        <div className="asset__menu__options">
                            <div className="asset__menu__option" onClick={() => navigate(`/investir/bolsa-de-valores/comprar/${Code}`)}>Comprar</div>
                            <div className="asset__menu__option">Vender</div>
                        </div>
                    }
                </div>
            </div>
            <div className="asset__unit-value">
                {stockPriceDisplay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <div className='asset__quantity'>
                <p>Quantidade</p>
                <div className="bold">{Quantity}</div>
            </div>
            <div>
                <p>Valor aplicado</p>
                <div className="bold">{(Quantity * Price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
            <div>
                <p>Rendimento Líquido</p>
                <div className="bold">{((stockPriceDisplay - Price) * Quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
        </div>
    )
}

export default Asset