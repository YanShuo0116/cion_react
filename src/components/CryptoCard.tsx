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
  const formatLargeNumber = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(2)}K`;
    }
    return value.toString();
  };

  // 根據價格變動調整顏色
  const priceChangeColor = price_change_percentage_24h >= 0 ? 'price-up' : 'price-down';

  // 計算動畫延遲時間，每個卡片延遲 0.05 秒
  const animationDelay = `${index * 0.05}s`;

  // 根據加密貨幣獲取更豐富的描述
  const getCryptoDescription = () => {
    const descriptions: {[key: string]: string} = {
      'bitcoin': '比特幣是第一個也是市值最高的加密貨幣，由中本聰於2009年創建。它是一種去中心化的數位貨幣，沒有中央銀行或單一管理者。',
      'ethereum': '以太坊是一個開源的區塊鏈平台，支持智能合約功能。它由Vitalik Buterin於2015年推出，成為第二大加密貨幣。',
      'tether': 'Tether是一種穩定幣，其價值與美元1:1掛鉤。它作為傳統貨幣與加密貨幣之間的橋梁，為交易提供穩定性。',
      'binancecoin': '幣安幣是幣安交易所的原生代幣，用於支付交易費用並參與幣安生態系統中的各種活動。',
      'solana': 'Solana是一個高性能區塊鏈，專注於快速交易和去中心化應用程序，擁有極高的擴展性和低廉的交易費用。',
      'cardano': '卡爾達諾是由以太坊聯合創始人Charles Hoskinson發起的區塊鏈平台，採用科學哲學和研究驅動的方法。',
      'ripple': 'Ripple是一個數字支付協議和貨幣交換網絡，專注於全球金融交易，提供快速、低成本的國際匯款服務。',
      'polkadot': 'Polkadot是一個創新的多鏈系統，允許不同區塊鏈之間進行互操作，由Web3基金會創立。',
      'dogecoin': '狗狗幣最初是作為網絡玩笑創建的，以柴犬為標誌，在埃隆·馬斯克等名人支持下獲得巨大關注。',
      'tron': 'TRON是由Justin Sun創建的去中心化平台，專注於內容分享和娛樂產業，為創作者提供更多控制權。'
    };

    // 如果有預設描述則使用，否則生成通用描述
    if (descriptions[id.toLowerCase()]) {
      return descriptions[id.toLowerCase()] + `\n\n目前市值為 ${formatCurrency(market_cap)}，24小時交易量為 ${formatCurrency(total_volume)}。在過去24小時內，${name} 的價格${price_change_percentage_24h >= 0 ? '上漲' : '下跌'}了 ${Math.abs(price_change_percentage_24h).toFixed(2)}%。`;
    }

    return `${name} (${symbol.toUpperCase()}) 是全球知名的加密貨幣之一，在區塊鏈技術領域佔有重要地位。該貨幣具有去中心化特性，交易過程安全且透明。

目前市值為 ${formatCurrency(market_cap)}，24小時交易量為 ${formatCurrency(total_volume)}。在過去24小時內，${name} 的價格${price_change_percentage_24h >= 0 ? '上漲' : '下跌'}了 ${Math.abs(price_change_percentage_24h).toFixed(2)}%。

投資加密貨幣存在風險，建議在投資前進行充分研究並諮詢專業意見。`;
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
          <span className="detail-value">
            <span className="value-number">{formatLargeNumber(market_cap)}</span>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">24小時交易量:</span>
          <span className="detail-value">
            <span className="value-number">{formatLargeNumber(total_volume)}</span>
          </span>
        </div>
      </div>

      {/* 展開後顯示的詳細介紹 */}
      {isExpanded && (
        <div className="crypto-expanded-info">
          <div className="crypto-description">
            <h4>關於 {name}</h4>
            <p>{getCryptoDescription()}</p>
          </div>
          <div className="crypto-stats">
            <div className="stat-item">
              <div className="stat-icon price-icon"></div>
              <div className="stat-content">
                <h5>當前價格</h5>
                <p>{formatCurrency(current_price)}</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon change-icon"></div>
              <div className="stat-content">
                <h5>24小時變化</h5>
                <p className={priceChangeColor}>
                  {price_change_percentage_24h >= 0 ? '+' : ''}
                  {price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon cap-icon"></div>
              <div className="stat-content">
                <h5>市值</h5>
                <p>{formatCurrency(market_cap)}</p>
              </div>
            </div>
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