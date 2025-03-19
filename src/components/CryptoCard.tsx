import React from 'react';
import './CryptoCard.css';

interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  index?: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  id,
  name,
  symbol,
  image,
  current_price,
  price_change_percentage_24h,
  market_cap,
  total_volume,
  index = 0
}) => {
  // 格式化價格為美元格式
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // 格式化大數字（市值和交易量）
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // 根據價格變動調整顏色
  const priceChangeColor = price_change_percentage_24h >= 0 ? 'price-up' : 'price-down';

  // 計算動畫延遲時間，每個卡片延遲 0.05 秒
  const animationDelay = `${index * 0.05}s`;

  return (
    <a
      href={`https://www.coingecko.com/en/coins/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="crypto-card"
      style={{ animationDelay }}
    >
      <div className="crypto-card-header">
        <img src={image} alt={name} className="crypto-logo" style={{ animationDelay }} />
        <div className="crypto-name">
          <h3>{name}</h3>
          <span className="crypto-symbol">{symbol.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="crypto-price">
        <p className="current-price">{formatCurrency(current_price)}</p>
        <p className={`price-change ${priceChangeColor}`}>
          {price_change_percentage_24h >= 0 ? '+' : ''}
          {price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
      
      <div className="crypto-details">
        <div className="detail-item">
          <span className="detail-label">市值:</span>
          <span className="detail-value">{formatCurrency(market_cap)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">24小時交易量:</span>
          <span className="detail-value">{formatCurrency(total_volume)}</span>
        </div>
      </div>
    </a>
  );
};

export default CryptoCard; 