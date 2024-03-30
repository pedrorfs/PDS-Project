import { useState } from "react";

import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { IoSearch } from "react-icons/io5";

import SearchIcon from "../../assets/SearchIcon.svg"

import { StockOption } from "../../components/StockOption/StockOption";

import "./InvestList.scss"

export function InvestList() {

  const [isSelectedETF, setIsSelectedETF] = useState(false)
  const [isSelectedFII, setIsSelectedFII] = useState(false)
  const [isSelectedStock, setIsSelectedStock] = useState(false)

  const [searchText, setSearchText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setSearchText(event.target.value);
  };

  const searchStocks = () => {
    console.log(searchText)
  }

  return (
    <div className="list-container">
      <div className="list-container__filters">
        <button
          onClick={() => { setIsSelectedETF(!isSelectedETF) }}
          className={`${isSelectedETF ? "black-filter" : ""}`}>
          Fundos de Índice (ETFs)
        </button>
        <button
          onClick={() => { setIsSelectedFII(!isSelectedFII) }}
          className={`${isSelectedFII ? "black-filter" : ""}`}>
          Fundos Imobiliários (FIIs)
        </button>
        <button
          onClick={() => { setIsSelectedStock(!isSelectedStock) }}
          className={`${isSelectedStock ? "black-filter" : ""}`}>
          Ações Brasileiras
        </button>
      </div>

      <div className="list-container__search">
        {/* <TextField
          // label="With normal TextField"
          size="small"
          variant="outlined"
          onChange={handleChange}
          placeholder="Buscar"
          sx={{ m: 1, width: '100%', border: "none", background: "#E1E1E1", color: "#858585" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>,
          }}
        /> */}
        <input
          type="text"
          placeholder="Pesquise por um ativo"
          onChange={handleChange}
          value={searchText}
        />
        {/* <button onClick={searchStocks}>
          <IoSearch style={{
            color: "white",
            height:"1.5rem",
            width: "1.5rem",
          }}/>
          Buscar
        </button> */}
      </div>

      <div className="list-container__stocks">
        <StockOption />
        <StockOption />
      </div>
    </div>
  )
}