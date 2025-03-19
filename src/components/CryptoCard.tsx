import React, { useState } from 'react';
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
  // 添加狀態管理卡片是否展開
  const [isExpanded, setIsExpanded] = useState(false);

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

  // 簡單的加密貨幣介紹生成函數
  const getCryptoDescription = () => {
    return `${name} (${symbol.toUpperCase()}) 是一種數字加密貨幣，目前市值為 ${formatCurrency(market_cap)}，
    24小時交易量為 ${formatCurrency(total_volume)}。
    在過去24小時內，${name} 的價格${price_change_percentage_24h >= 0 ? '上漲' : '下跌'}了 ${Math.abs(price_change_percentage_24h).toFixed(2)}%。`;
  };

  // 處理卡片點擊事件
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  // 處理查看更多按鈕點擊，前往 CoinGecko
  const handleViewMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡，避免觸發卡片點擊
    window.open(`https://www.coingecko.com/en/coins/${id}`, '_blank');
  };

  return (
    <div 
      className={`crypto-card ${isExpanded ? 'expanded' : ''}`}
      style={{ animationDelay }}
      onClick={handleCardClick}
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

      {/* 展開後顯示的詳細介紹 */}
      {isExpanded && (
        <div className="crypto-expanded-info">
          <div className="crypto-description">
            <p>{getCryptoDescription()}</p>
          </div>
          <button 
            className="view-more-btn" 
            onClick={handleViewMoreClick}
          >
            <span>查看更多</span>
            <div className="btn-effect"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CryptoCard; 