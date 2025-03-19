import React, { useState, useEffect } from 'react';
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

interface CoinDescriptionMap {
  [key: string]: string;
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
  // 添加狀態管理卡片是否展開和描述資料
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptions, setDescriptions] = useState<CoinDescriptionMap>({});

  // 載入幣種描述
  useEffect(() => {
    // 這裡直接將CSV的內容轉換為JavaScript對象
    const descriptionsMap: CoinDescriptionMap = {
      'btc': 'BTC (Bitcoin): 首個加密貨幣，去中心化數位貨幣，透過區塊鏈技術實現安全交易，被視為數位黃金。',
      'eth': 'ETH (Ethereum): 智能合約平台，支援去中心化應用程式（DApp），推動 DeFi 和 NFT 的發展。',
      'usdt': 'USDT (Tether): 穩定幣，價值與美元掛鉤，旨在提供價格穩定性，常用於加密貨幣交易對。',
      'xrp': 'XRP (XRP): 支付協議，旨在促進快速、低成本的跨境支付，目標是改善全球金融體系。',
      'bnb': 'BNB (BNB): 幣安交易所的原生代幣，用於支付交易手續費、參與 IEO 等，並用於 BNB Chain 生態系。',
      'sol': 'SOL (Solana): 高性能區塊鏈，提供快速交易速度和低廉的手續費，適用於 DApp 和 DeFi 應用。',
      'usdc': 'USDC (USDC): 穩定幣，與美元 1:1 錨定，由 Centre Consortium 發行，受監管且透明。',
      'ada': 'ADA (Cardano): 第三代區塊鏈，強調科學哲學和可持續性，旨在建立一個更安全、透明的區塊鏈平台。',
      'doge': 'DOGE (Dogecoin): 迷因幣，起源於網路玩笑，但因社群支持和名人推廣而廣受歡迎。',
      'trx': 'TRX (TRON): 去中心化娛樂平台，旨在建立一個免費、全球內容分享系統，並支持 DApp 開發。',
      'steth': 'STETH (Lido Staked Ether): 在Lido質押的以太幣的代表，允許用戶在獲得質押獎勵的同時保持ETH的流動性。',
      'wbtc': 'WBTC (Wrapped Bitcoin): ERC-20 代幣，代表 Bitcoin 在 Ethereum 上的價值，方便 Bitcoin 參與 DeFi 活動。',
      'link': 'LINK (Chainlink): 去中心化預言機網路，為智能合約提供鏈外數據，確保智能合約的可靠性。',
      'leo': 'LEO (LEO Token): Bitfinex 交易所的實用型代幣，持有者可享有交易手續費折扣等優惠。',
      'ton': 'TON (Toncoin): Telegram 開發的區塊鏈平台，旨在提供快速、安全的交易和 DApp 服務。',
      'xlm': 'XLM (Stellar): 支付協議，旨在促進快速、低成本的跨境支付，目標是改善全球金融包容性。',
      'dot': 'DOT (Polkadot): 多鏈區塊鏈，旨在連接不同的區塊鏈，實現跨鏈互操作性，建立一個去中心化網路。',
      'shib': 'SHIB (Shiba Inu): 迷因幣，以 Dogecoin 為靈感，建立龐大社群，並發展 DeFi 生態系。',
      'sui': 'SUI (Sui): 新興區塊鏈，強調可擴展性和低延遲，使用物件導向模型，專為遊戲和社交應用設計。',
      'ltc': 'LTC (Litecoin): 早期加密貨幣，以快速交易速度和不同的挖礦演算法而聞名，被視為「數位白銀」。',
      'bch': 'BCH (Bitcoin Cash): Bitcoin 的硬分叉，旨在提高交易速度和容量，但社群和發展存在分歧。',
      'atom': 'ATOM (Cosmos Hub): 區塊鏈網路，旨在連接不同的區塊鏈，實現跨鏈互操作性，建立一個「區塊鏈互聯網」。',
      'avax': 'AVAX (Avalanche): 快速、低成本的區塊鏈平台，支援多種共識機制，適用於 DeFi 和企業應用。',
      'uni': 'UNI (Uniswap): 去中心化交易所 (DEX)，採用自動做市商 (AMM) 模式，允許用戶交易 ERC-20 代幣。',
      'xmr': 'XMR (Monero): 注重隱私的加密貨幣，採用 Ring Signatures 和 Stealth Addresses 等技術，保護交易隱私。',
      'apt': 'APT (Aptos): 新興區塊鏈，強調安全性和可擴展性，採用 Move 語言，專為高性能應用設計。',
      'near': 'NEAR (NEAR Protocol): 可擴展的區塊鏈平台，旨在簡化 DApp 開發，提供友好的用戶體驗。',
      'dai': 'DAI (Dai): 去中心化穩定幣，由 MakerDAO 協議發行，與美元掛鉤，透過超額抵押機制維持價格穩定。',
      'okb': 'OKB (OKB): OKX 交易所的實用型代幣，持有者可享有交易手續費折扣等優惠。',
      'pepe': 'PEPE (Pepe): 基於Pepe the Frog迷因的加密貨幣，以其社群驅動的性質和在社交媒體上的病毒式傳播而聞名。',
      'icp': 'ICP (Internet Computer): 去中心化雲計算平台，旨在取代傳統互聯網服務，支持 DApp 和網站開發。',
      'etc': 'ETC (Ethereum Classic): Ethereum 的原始鏈，堅守區塊鏈不可篡改的原則，社群較小。',
      'gt': 'GT (GateToken): Gate.io 交易所的原生代幣，提供交易折扣、Launchpad 參與等權益。',
      'vet': 'VET (VeChain): 企業級區塊鏈，專注於供應鏈管理和產品溯源，提供可追蹤的產品資訊。',
      'fil': 'FIL (Filecoin): 去中心化儲存網路，旨在建立一個開放、分散式的數據儲存市場。',
      'arb': 'ARB (Arbitrum): Ethereum 的 Layer 2 擴容方案，採用 Optimistic Rollups 技術，提高交易速度和降低手續費。',
      'algo': 'ALGO (Algorand): 區塊鏈，採用 Pure Proof-of-Stake (PPoS) 共識機制，提供快速、安全、低成本的交易。',
      'op': 'OP (Optimism): Ethereum 的 Layer 2 擴容方案，採用 Optimistic Rollups 技術，提高交易速度和降低手續費。',
      'kcs': 'KCS (KuCoin Token): KuCoin 交易所的原生代幣，提供交易折扣、Launchpad 參與等權益。',
      'flow': 'FLOW (Flow): 快速、低成本的區塊鏈平台，專為 NFT 和遊戲應用設計。',
      'cake': 'CAKE (PancakeSwap): Binance Smart Chain 上的去中心化交易所 (DEX)，採用自動做市商 (AMM) 模式，提供多樣化的 DeFi 功能。',
      'neo': 'NEO (NEO): 中國區塊鏈平台，旨在建立一個智能經濟系統，支持 DApp 和智能合約開發。',
      'hnt': 'HNT (Helium): 去中心化無線網路，旨在建立一個全球覆蓋的 IoT 網路。',
      'axs': 'AXS (Axie Infinity Shards): Axie Infinity 遊戲的治理代幣，用於參與遊戲決策和生態系發展。',
      'zec': 'ZEC (Zcash): 注重隱私的加密貨幣，採用 zk-SNARKs 技術，提供完全匿名的交易。',
    };
    
    setDescriptions(descriptionsMap);
  }, []);

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
    // 優先使用CSV中的描述
    const lowerSymbol = symbol.toLowerCase();
    if (descriptions[lowerSymbol]) {
      return `${descriptions[lowerSymbol]}\n\n目前市值為 ${formatCurrency(market_cap)}，24小時交易量為 ${formatCurrency(total_volume)}。在過去24小時內，${name} 的價格${price_change_percentage_24h >= 0 ? '上漲' : '下跌'}了 ${Math.abs(price_change_percentage_24h).toFixed(2)}%。`;
    }

    // 備用描述
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