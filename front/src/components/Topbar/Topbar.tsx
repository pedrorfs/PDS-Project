import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import "./topbar.scss";
import Logo from './../../assets/Eminente.svg';
import Avatar from './../../assets/Avatar.png'

import { getUserData } from "../../requests/User/GetUserData";
import { logout } from "../../requests/User/Logout";

export function Topbar() {

    const menu = useRef(null);
    const [menuState, setMenuState] = useState(false);

    const navigate = useNavigate()

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const closeDropdown = e => {
            if (!menu?.current?.contains(e.target)) {
                setMenuState(false);
            }
        }
        document.body.addEventListener('click', closeDropdown)
    }, [])

    const getUser = async () => {

        const response = await getUserData()

        setUserName(response.data.name)

    }

    useEffect(() => {
        getUser()
    }, [])

    const handleLogout = async () => {
        const response = await logout()

        navigate('/')
    }

    return (
        <div className="topbar">
            <div className="topbar__logo">
                <img src={Logo} alt="" />
            </div>
            <div className="topbar__profile">

                <div className="topbar__profile__name">
                    <h3>{userName}</h3>
                </div>
                <div className="topbar__dropdown">
                    <img
                        className="topbar__avatar"
                        src={Avatar} alt=""
                        ref={menu} onClick={() => setMenuState(!menuState)}
                    />
                    {
                        menuState &&
                        <div className="topbar__dropdown__options">
                            <div 
                            className="topbar__dropdown__option" onClick={() => navigate('/dados-pessoais')}>Configurações</div>
                            <div className="topbar__dropdown__option" onClick={() => handleLogout()}>Sair</div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}