import "./StockOption.scss"

interface StockOptionProps{
  title: string
  name: string
  price: string
}

export function StockOption() {

  return (
    <div className="stock-container">
      <div className="stock-container__name">
        <h3>Vale</h3>
        <p>VALE3</p>
      </div>
      <h3>R$ 59,76</h3>
      <h3 className="stock-container__buy">Comprar</h3>
    </div>
  )
}