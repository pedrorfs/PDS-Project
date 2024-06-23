import Asset from './../../components/Asset/Asset.tsx';
import './wallet.scss'

export default function Wallet() {
    return (
        <div className='wallet'>
            <h2 className='wallet__title'>Carteira</h2>
            <div className='wallet__my-investments-info'>
                <h4>Meus investimentos</h4>
                <div className='wallet__my-investments-info__value'>R$100.000,00</div>
            </div>
            <div className='wallet__yield-info'>
                <p>Rendimento Total: R$ XXXXX</p>
                <p>Valor Aplicado: R$ XXXXXX</p>
            </div>

            <h5 className='wallet__my-assets'>Meus ativos</h5>
            <div className='wallet__assets'>
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
                <Asset />
            </div>
        </div>
    )
}