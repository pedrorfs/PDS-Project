import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Topbar } from '../../components/Topbar/Topbar'

import './main.scss'

export function Main() {

    return (
        <div className="main">
            <Topbar />
            <div className="main__bottom">
                <Sidebar />
                <div className='main__content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

