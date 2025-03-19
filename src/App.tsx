import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoCard from './components/CryptoCard';
import './App.css';

// 定義加密貨幣數據接口
interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // CoinGecko API 金鑰（將您的 API 金鑰替換到這裡）
  const API_KEY = 'CG-d26aYX1ZeUwGwkRJ1ffRaQhF';
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 使用 CoinGecko API 獲取前 100 個加密貨幣數據
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
              x_cg_demo_api_key: API_KEY
            }
          }
        );
        
        setCoins(response.data);
        setFilteredCoins(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('無法獲取加密貨幣數據。請確認您的 API 金鑰是否有效，或稍後再試。');
        setLoading(false);
      }
    };

    fetchData();
    
    // 每 10 分鐘更新數據一次 (600000 毫秒)
    const interval = setInterval(fetchData, 600000);
    
    // 清理函數
    return () => clearInterval(interval);
  }, [API_KEY]);

  // 搜尋功能
  useEffect(() => {
    const filtered = coins.filter(
      coin => 
        coin.name.toLowerCase().includes(search.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [search, coins]);

  // 處理搜尋輸入變化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>SHUO加密貨幣網站實作</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="搜尋加密貨幣..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading">加載中...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="crypto-grid">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin, index) => (
                <CryptoCard
                  key={coin.id}
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  image={coin.image}
                  current_price={coin.current_price}
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                  market_cap={coin.market_cap}
                  total_volume={coin.total_volume}
                  index={index}
                />
              ))
            ) : (
              <div className="no-results">找不到符合的加密貨幣</div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>數據由 <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">CoinGecko</a> 提供</p>
        <p>數據每10分鐘更新一次</p>
        <p className="creator">SHUO製作 &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
