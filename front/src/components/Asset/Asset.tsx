import "./asset.scss";
import ArrowDown from "./../../assets/arrow-down.svg"
import { useEffect, useRef, useState } from "react";

function Asset() {
    const menu = useRef(null);
    const [menuState, setMenuState] = useState(false);

    useEffect(() => {
        const closeDropdown = e => {
            if (!menu?.current?.contains(e.target)) {
                setMenuState(false);
            }
        }
        document.body.addEventListener('click', closeDropdown)
    }, [])

    return (
        <div className="asset">
            <div className='asset__header'>
                <h3 className='asset__title'>PETR4</h3>
                <div className='asset__menu'>
                    <img src={ArrowDown} ref={menu} onClick={() => setMenuState(!menuState)} />
                    {
                        menuState &&
                        <div className="asset__menu__options">
                            <div className="asset__menu__option">Comprar</div>
                            <div className="asset__menu__option">Vender</div>
                        </div>
                    }
                </div>
            </div>
            <div className="asset__unit-value">
                R$ 100,00
            </div>
            <div className='asset__quantity'>
                <p>Quantidade</p>
                <div className="bold">23</div>
            </div>
            <div>
                <p>Valor aplicado</p>
                <div className="bold">R$ 200,00</div>
            </div>
            <div>
                <p>Rendimento Líquido</p>
                <div className="bold">R$ 20,00</div>
            </div>
        </div>
    )
}

export default Asset