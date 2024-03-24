import "./home.scss";


export default function Home() {


    return (
        <div className="home">
            <div className="home__block">
                <h3>Meus investimentos</h3>
                <p>R$1.000.000,00</p>
            </div>
            <div className="home__block graficos">
                <h3>Graficos</h3>
            </div>
            <div className="home__block valor-aplicado">
                <h3>Valor aplicado</h3>
                <p>R$10.000,00</p>
            </div>
            <div className="home__block rendimento-total">
                <h3>Rendimento Total</h3>
                <p>R$500,00</p>
            </div>
            <div className="home__block message">
                <p>Investir com frequência é o segredo para chegar cada vez mais longe</p>
            </div>
        </div>
    )
}