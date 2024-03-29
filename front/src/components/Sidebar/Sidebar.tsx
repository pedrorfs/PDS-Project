import { useNavigate } from "react-router-dom";

import "./sidebar.scss";

export default function Sidebar() {

     const navigate = useNavigate()

     return (
          <div className="sidebar">
               <div className="sidebar__option" onClick={() => navigate("/")}>
                    <h3>Home</h3>
               </div>
               <div className="sidebar__option" onClick={() => navigate("/investir")}>
                    <h3>Investir</h3>
               </div>
               <div className="sidebar__option">
                    <h3>Acessar Histórico</h3>
               </div>
               <div className="sidebar__option">
                    <h3>Relatórios</h3>
               </div>
               <div className="sidebar__option">
                    <h3>Simulações</h3>
               </div>
          </div>
     )
}