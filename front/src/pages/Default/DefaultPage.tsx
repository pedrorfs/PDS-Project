import "./default-page.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Home from "../../components/Home/Home";

export default function DefaultPage() {
    
    return (
        <div className="default-page">
            <Topbar />
            <div className="default-page__bottom">
                <Sidebar />
                <Home />
            </div>
        </div>
    )
}