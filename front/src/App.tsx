import { Outlet } from 'react-router-dom'

import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'

import './App.scss'


function App() {

    return (
        <div className="default-page">
            <Topbar />
            <div className="default-page__bottom">
                <Sidebar />
                {/* <Home /> */}
                <Outlet />
            </div>
        </div>
    )
}

export default App
