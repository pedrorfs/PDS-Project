import "./topbar.scss";
import Logo from './../../assets/Eminente.svg';
import Avatar from './../../assets/Avatar.png'

export function Topbar() {


    return (
        <div className="topbar">
            <div className="topbar__logo">
                <img src={Logo} alt="" />
            </div>
            <div className="topbar__profile">
                <div className="topbar__profile__name">
                    <h3>Fulano de Tal</h3>
                </div>
                <img className="topbar__avatar" src={Avatar} alt=""  />
            </div>
        </div>
    )
}