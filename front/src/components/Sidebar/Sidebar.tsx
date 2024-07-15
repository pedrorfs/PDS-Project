import { useNavigate } from "react-router-dom";

import "./sidebar.scss";

export function Sidebar() {

     const navigate = useNavigate()

     return (
          <div className="sidebar">
               <div className="sidebar__option" onClick={() => navigate("/home")}>
                    <h3>Home</h3>
               </div>
               <div className="sidebar__option" onClick={() => navigate("/investir")}>
                    <h3>Investir</h3>
               </div>
               <div className="sidebar__option" onClick={() => navigate("/carteira")}>
                    <h3>Carteira</h3>
               </div>
               <div className="sidebar__option" onClick={() => navigate("/favoritos")}>
                    <h3>Favoritos</h3>
               </div>
               <div className="sidebar__option" id="deposit" onClick={() => navigate("/depositar")}>
                    <h3>Depositar</h3>
               </div>
               {/* <div className="sidebar__option">
                    <h3>Relatórios</h3>
               </div>
               <div className="sidebar__option">
                    <h3>Simulações</h3>
               </div> */}
          </div>
     )
}