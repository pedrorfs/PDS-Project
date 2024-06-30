import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./topbar.scss";
import Logo from './../../assets/Eminente.svg';
import Avatar from './../../assets/Avatar.png'

import { getUserData } from "../../requests/User/GetUserData";

export function Topbar() {

    const navigate = useNavigate()

    const [userName, setUserName] = useState('')

    const getUser = async () => {

        const response = await getUserData()

        setUserName(response.data.name)

    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="topbar">
            <div className="topbar__logo">
                <img src={Logo} alt="" />
            </div>
            <div className="topbar__profile">
                <div className="topbar__profile__name">
                    <h3>{userName}</h3>
                </div>
                <img className="topbar__avatar" src={Avatar} alt="" onClick={() => navigate('/dados-pessoais')} />
            </div>
        </div>
    )
}