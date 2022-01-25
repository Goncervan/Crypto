import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Coin from './Coin'
import dotenv from 'dotenv'
dotenv.config();

function App() {

  const [cryptos, setCryptos] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=250&page=1&sparkline=false")
      .then(res => {
        setCryptos(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filterCoins = cryptos.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='App'>
      <div className='coin-search'>
        <h1 className='coin-title'>Search currency</h1>
        <form>
          <input
            type='search'
            placeholder='Search'
            className='coin-input'
            onChange={handleChange} />
        </form>
        <div className='logos-container'>
          <a className='logos-div' href='https://github.com/Goncervan' target='_blank'><img className='logos' src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Github'/><p className='logos-text'>Goncervan</p></a>
          <a className='logos-div' href='https://www.linkedin.com/in/gonzalo-cervan/' target='_blank'><img className='logos' src='https://cdn-icons-png.flaticon.com/512/174/174857.png' alt='LinkedIn'/> <p className='logos-text'>Gonzalo Cervan</p></a>
        </div>
      </div>
      {filterCoins.map(coin => {
        return (
          <Coin key={coin.id}
            img={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
