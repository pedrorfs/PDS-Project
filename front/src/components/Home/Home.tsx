import { useEffect, useState } from "react";

import "./home.scss";

import { getUserData } from "../../requests/User/GetUserData";
import { getBuyStocks } from "../../requests/Invest/GetBuyStock";


interface BuyStock {
    Code: string
    Name: string
    Price: number
    Quantity: number
}

export function Home() {

    const [myStocks, setMyStocks] = useState<BuyStock[]>([])

    const [balance, setBalance] = useState(0)

    const getUser = async () => {

        const response = await getUserData()

        setBalance(response.data.balance)

    }

    const getUserStocks = async () => {

        const response = await getBuyStocks()

        console.log(response)

        setMyStocks(response)
        console.log('minhas ações')
        console.log(myStocks)

    }

    useEffect(() => {
        getUser()
        getUserStocks()
    }, [])

    let totalInvestValue = 0;

    for (const stock in myStocks) {
        totalInvestValue += (myStocks[stock].Price * myStocks[stock].Quantity)
    }

    return (
        <div className="home">
            <div className="home__block first-line">
                <h3>Meus investimentos</h3>
                <p>{totalInvestValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            {/* <div className="home__block graficos">
                <h3>Graficos</h3>
            </div> */}
            <div className="home__block valor-aplicado">
                <h3>Saldo</h3>
                <p>{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <div className="home__block rendimento-total">
                <h3>Rendimento Total</h3>
                <p>R$0,00</p>
            </div>
            <div className="home__block message">
                <p>Investir com frequência é o segredo para chegar cada vez mais longe</p>
            </div>
        </div>
    )
}