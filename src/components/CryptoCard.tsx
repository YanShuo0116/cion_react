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
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptions, setDescriptions] = useState<CoinDescriptionMap>({});

  useEffect(() => {
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
      'wsteth': 'WSTETH (Wrapped Lido Staked Ether): 方便在 DeFi 中使用，代表質押在 Lido 的 ETH。',
      'usds': 'USDS (Stablecoin): 穩定幣，與美元掛鉤，由 Stablecoin 發行，旨在提供價格穩定性。',
      'hbar': 'HBAR (Hedera Hashgraph): 企業級區塊鏈，採用 Hashgraph 共識機制，提供快速、安全、低成本的交易。',
      'pi': 'PI (Pi Network): 手機挖礦項目，旨在讓更多人參與加密貨幣，但具有中心化和爭議性。',
      'shib': 'SHIB (Shiba Inu): 迷因幣，以 Dogecoin 為靈感，建立龐大社群，並發展 DeFi 生態系。',
      'sui': 'SUI (Sui): 新興區塊鏈，強調可擴展性和低延遲，使用物件導向模型，專為遊戲和社交應用設計。',
      'ltc': 'LTC (Litecoin): 早期加密貨幣，以快速交易速度和不同的挖礦演算法而聞名，被視為「數位白銀」。',
      'dot': 'DOT (Polkadot): 多鏈區塊鏈，旨在連接不同的區塊鏈，實現跨鏈互操作性，建立一個去中心化網路。',
      'om': 'OM (Layer 1): 專注於 RWA 和合規 DeFi，目標是連接傳統金融和區塊鏈世界。',
      'bch': 'BCH (Bitcoin Cash): Bitcoin 的硬分叉，旨在提高交易速度和容量，但社群和發展存在分歧。',
      'bgb': 'BGB (Bitget): Bitget 交易所的原生代幣，提供交易折扣、Launchpad 參與等權益。',
      'weth': 'WETH (Wrapped Ether): ERC-20 版本的 Ether，方便在 DeFi 協議中使用。',
      'usde': 'USDE (Ethena Labs): 合成美元，通過Delta對沖以太坊質押獲得穩定性。',
      'bsc-usd': 'BSC-USD: 在幣安智能鏈上的 USDT 的橋接版本。',
      'hype': 'HYPE: 去中心化衍生品交易所，提供高效的交易體驗和多樣化的交易產品。',
      'weeth': 'WEETH (Wrapped eETH): 方便在 DeFi 中使用，代表質押在 Ether.fi 的 ETH。',
      'wbt': 'WBT (WhiteBIT): WhiteBIT 交易所的原生代幣，持有者可享有交易手續費折扣等優惠。',
      'uni': 'UNI (Uniswap): 去中心化交易所 (DEX)，採用自動做市商 (AMM) 模式，允許用戶交易 ERC-20 代幣。',
      'xmr': 'XMR (Monero): 注重隱私的加密貨幣，採用 Ring Signatures 和 Stealth Addresses 等技術，保護交易隱私。',
      'susds': 'SUSDS (Synthetix): 由 Synthetix 協議發行的合成美元，旨在提供價格穩定性，用於交易合成資產。',
      'apt': 'APT (Aptos): 新興區塊鏈，強調安全性和可擴展性，採用 Move 語言，專為高性能應用設計。',
      'near': 'NEAR (NEAR Protocol): 可擴展的區塊鏈平台，旨在簡化 DApp 開發，提供友好的用戶體驗。',
      'dai': 'DAI (Dai): 去中心化穩定幣，由 MakerDAO 協議發行，與美元掛鉤，透過超額抵押機制維持價格穩定。',
      'okb': 'OKB (OKX): OKX 交易所的實用型代幣，持有者可享有交易手續費折扣等優惠。',
      'pepe': 'PEPE (Pepe): 基於Pepe the Frog迷因的加密貨幣，以其社群驅動的性質和在社交媒體上的病毒式傳播而聞名。',
      'icp': 'ICP (Internet Computer): 去中心化雲計算平台，旨在取代傳統互聯網服務，支持 DApp 和網站開發。',
      'etc': 'ETC (Ethereum Classic): Ethereum 的原始鏈，堅守區塊鏈不可篡改的原則，社群較小。',
      'gt': 'GT (GateToken): Gate.io 交易所的原生代幣，提供交易折扣、Launchpad 參與等權益。',
      'ondo': 'ONDO: 專注於將機構級金融資產代幣化的平台，旨在連接傳統金融和 DeFi。',
      'mnt': 'MNT (Mantle Network): Mantle Network 的原生代幣，用於治理、質押和支付 Gas 費。',
      'aave': 'AAVE: 去中心化借貸協議，允許用戶借出和借入加密貨幣，賺取利息。',
      'tkx': 'TKX (Tokenize Xchange): Tokenize Xchange 的原生代幣，提供交易折扣、Launchpad 參與等權益。',
      'cbbtc': 'CBBTC (Coinbase): 由 Coinbase 發行的 Wrapped BTC，方便在 DeFi 中使用。',
      'vet': 'VET (VeChain): 企業級區塊鏈，專注於供應鏈管理和產品溯源，提供可追蹤的產品資訊。',
      'trump': 'TRUMP: 以唐納德·特朗普為主題的迷因幣，波動性高，風險極大。',
      'cro': 'CRO (Crypto.com): Crypto.com 的原生代幣，用於支付交易手續費、參與質押等，並用於 Cronos Chain 生態系。',
      'tao': 'TAO: 去中心化機器學習網路，旨在建立一個開放、協作的 AI 開發平台。',
      'kas': 'KAS: 區塊鏈，採用 GhostDAG 協議，實現快速區塊確認時間和高吞吐量。',
      'fdusd': 'FDUSD: 由 First Digital Trust 發行的與美元掛鉤的穩定幣。',
      'atom': 'ATOM (Cosmos Hub): 區塊鏈網路，旨在連接不同的區塊鏈，實現跨鏈互操作性，建立一個「區塊鏈互聯網」。',
      'ena': 'ENA: 旨在創建一個基於以太坊的加密原生收益美元的協議。',
      'fil': 'FIL (Filecoin): 去中心化儲存網路，旨在建立一個開放、分散式的數據儲存市場。',
      'pol': 'POL (Polygon 2.0): Polygon 2.0 代幣，用於保護 Polygon PoS 和管理社區財庫。',
      'tia': 'TIA: 模塊化區塊鏈網路，旨在提供可擴展的數據可用性層，降低區塊鏈的運行成本。',
      'arb': 'ARB (Arbitrum): Ethereum 的 Layer 2 擴容方案，採用 Optimistic Rollups 技術，提高交易速度和降低手續費。',
      'lbtc': 'LBTC: 鎖定的比特幣的代表，可能提供收益或用於DeFi應用。',
      'ftn': 'FTN: 遊戲和博彩領域的加密貨幣。',
      'render': 'RENDER: 分散式 GPU 渲染網路，允許用戶租用 GPU 算力，用於 3D 渲染和 AI 計算。',
      's': 'S (Fantome): 高性能區塊鏈。',
      'algo': 'ALGO (Algorand): 區塊鏈，採用 Pure Proof-of-Stake (PPoS) 共識機制，提供快速、安全、低成本的交易。',
      'op': 'OP (Optimism): Ethereum 的 Layer 2 擴容方案，採用 Optimistic Rollups 技術，提高交易速度和降低手續費。',
      'usdt-arbitrum': 'USDT (Arbitrum): 在 Arbitrum 上的 USDT 的橋接版本。',
      'jup': 'JUP: Solana 上的一個交換聚合器，旨在為用戶提供最佳的交易路徑和價格。',
      'fetch': 'FET (Fetch.ai): 去中心化機器學習平台，旨在建立一個自主經濟代理 (AEA) 網路，用於自動化任務和優化流程。',
      'ip': 'IP: 旨在利用區塊鏈技術來改變智慧財產權的創作和所有權的平台。',
      'kcs': 'KCS (KuCoin Token): KuCoin 交易所的原生代幣，提供交易折扣、Launchpad 參與等權益。',
      'solvbtc': 'SOLVBTC: 可以用來代表鎖定的比特幣，類似於 Wrapped Bitcoin。',
      'buidl': 'BUIDL: BlackRock USD Institutional Digital Liquidity Fund,BlackRock 的美元流動性基金代幣化版本。',
      'weth-bsc': 'WETH (BSC): 在 Binance Smart Chain 上的 WETH 的橋接版本。',
      'qnt': 'QNT (Quant): 區塊鏈作業系統，旨在連接不同的區塊鏈，實現跨鏈互操作性。',
      'rseth': 'RSETH: Kelp DAO Restaked ETH，Kelp DAO 協議中質押的以太幣的代表，可參與 DeFi 活動。',
      'mkr': 'MKR (Maker): Maker 協議的治理代幣，用於管理 Dai 穩定幣系統。',
      'nexo': 'NEXO: 加密貨幣借貸平台，允許用戶借出和借入加密貨幣，賺取利息。',
      'move': 'MOVE: 基於Move語言構建的高吞吐量區塊鏈。',
      'xdc': 'XDC: 混合區塊鏈，旨在連接傳統金融和貿易融資，提供高效的跨境支付和供應鏈管理解決方案。',
      'dexe': 'DEXE: 去中心化資產管理協議，允許用戶創建和管理加密貨幣投資組合。',
      'imx': 'IMX: Ethereum 的 Layer 2 擴容方案，專為 NFT 交易設計，提供低手續費和高吞吐量。',
      'wld': 'WLD: 旨在建立一個全球身份驗證網路，通過虹膜掃描驗證用戶身份，並發放加密貨幣。',
      'reth': 'RETH: Rocket Pool ETH，在 Rocket Pool 協議中質押的以太幣的代表，可參與 DeFi 活動。',
      'sei': 'SEI: 專為交易而設計的 Layer 1 區塊鏈，具有快速的交易速度和低延遲。',
      'usd0': 'USD0: 一種旨在通過演算法實現穩定的價值，並被廣泛用於區塊鏈生態系統中的交易和DeFi活動的穩定幣。',
      'inj': 'INJ (Injective): 去中心化衍生品交易所，提供高效的交易體驗和多樣化的交易產品。',
      'stx': 'STX (Stacks): Bitcoin 的 Layer 2 解決方案，旨在為 Bitcoin 帶來智能合約功能，並促進 DApp 開發。',
      'bnsol': 'BNSOL: 在幣安質押的 SOL 代幣的代表。',
      'theta': 'THETA: Theta Network 去中心化影片串流平台，旨在降低串流成本，並提高影片品質。',
      'grt': 'GRT (The Graph): 去中心化索引協議，用於查詢區塊鏈數據，為 DApp 提供快速、可靠的數據來源。',
      'flr': 'FLR (Flare): 區塊鏈，旨在為 XRP Ledger 帶來智能合約功能，並促進 DApp 開發。',
      'ldo': 'LDO: Lido DAO 流動性質押協議，允許用戶質押 ETH 並獲得 stETH，同時保持 ETH 的流動性。',
      'eos': 'EOS: 早期區塊鏈平台，旨在提供高性能和易於使用的 DApp 開發環境，但發展遇到挑戰。',
      'bonk': 'BONK: Solana 上的迷因幣，以社群驅動和空投活動而聞名。',
      'usdt-polygon': 'USDT (Polygon): 在 Polygon 上的 USDT 的橋接版本。',
      'solvbtc.bbn': 'SOLVBTC.BBN: Binance BTC 類似的加密貨幣。',
      'meth': 'METH: Mantle Staked Ether，Mantle 網路中質押的以太幣的代表。',
      'pyusd': 'PYUSD: PayPal 發行的與美元掛鉤的穩定幣。',
      'gala': 'GALA: Gala Games 區塊鏈遊戲平台，旨在建立一個去中心化的遊戲生態系統。',
      'wbnb': 'WBNB: 在 Binance Smart Chain 上的 BNB 的橋接版本。',
      'xaut': 'XAUT: Tether Gold 穩定幣，與黃金掛鉤，由 Tether 發行，代表真實黃金的所有權。',
      'usdc-bsc': 'USDC (BSC): 在 Binance Smart Chain 上的 USDC 的橋接版本。',
      'xtz': 'XTZ (Tezos): 自修正區塊鏈，具有鏈上治理功能，允許社群參與協議升級和決策。',
      'sand': 'SAND (The Sandbox): 虛擬世界遊戲，允許用戶創建、擁有和交易遊戲資產，並參與遊戲體驗。',
      'usdc.e': 'USDC.E: 在 Berachain 上的 USDC 的橋接版本。',
      'usdc.e-polygon': 'USDC.E (Polygon): 在 Polygon 上的 USDC 的橋接版本。',
      'iota': 'IOTA: 區塊鏈，採用 Tangle 技術，旨在建立一個用於物聯網 (IoT) 設備的數據和價值傳輸協議。',
      'bsv': 'BSV (Bitcoin SV): Bitcoin 的硬分叉，旨在恢復 Bitcoin 的原始協議和功能，但社群和發展存在分歧。',
      'btt': 'BTT (BitTorrent): 去中心化檔案分享協議，旨在建立一個高效、分散式的檔案分享網路。',
      'jasmy': 'JASMY: JasmyCoin 物聯網 (IoT) 數據平台，旨在建立一個安全、透明的數據交易市場。',
      'flow': 'FLOW: 快速、低成本的區塊鏈平台，專為 NFT 和遊戲應用設計。',
      'cake': 'CAKE (PancakeSwap): Binance Smart Chain 上的去中心化交易所 (DEX)，採用自動做市商 (AMM) 模式，提供多樣化的 DeFi 功能。',
      'wbtc-arbitrum': 'WBTC (Arbitrum): 在 Arbitrum 上的 WBTC 的橋接版本。',
      'jto': 'JTO: Jito Solana 上的流動性質押協議，旨在提高質押收益和網絡安全性。',
      'bera': 'BERA: 基於流動性證明共識機制的新型區塊鏈。',
      'paxg': 'PAXG: PAX Gold 穩定幣，與黃金掛鉤，由 Paxos 發行，代表真實黃金的所有權。',
      'kaia': 'KAIA: KAIA 元宇宙和 Web3 娛樂體驗。',
      'ezeth': 'EZETH: Renzo Restaked ETH,Renzo 協議中重新質押的以太幣的代表。',
      'usdx': 'USDX: Stables Labs USDX Stables Labs 發行的美元穩定幣。',
      'msol': 'MSOL: Marinade Staked SOL Marinade Finance 協議中質押的 SOL 代幣的代表。',
      'crv': 'CRV (Curve): Curve 協議的治理代幣，用於管理穩定幣交易平台。',
      'floki': 'FLOKI: 迷因幣，以 Shiba Inu 為靈感，建立龐大社群，並發展 Metaverse 和 NFT 生態系。',
      'ens': 'ENS (Ethereum Name Service): 去中心化域名系統，將 Ethereum 地址映射到易於記憶的名稱，簡化加密貨幣交易。',
      'neo': 'NEO: 中國區塊鏈平台，旨在建立一個智能經濟系統，支持 DApp 和智能合約開發。',
      'hnt': 'HNT (Helium): 去中心化無線網路，旨在建立一個全球覆蓋的 IoT 網路。',
      'pyth': 'PYTH: Pyth Network 去中心化金融數據協議，為 DeFi 應用提供實時市場數據。',
      'axs': 'AXS (Axie Infinity): 遊戲的治理代幣，用於參與遊戲決策和生態系發展。',
      'usr': 'USR: Resolv USR加密穩定幣。',
      'ray': 'RAY (Raydium): Solana 上的去中心化交易所 (DEX)，採用自動做市商 (AMM) 模式，提供快速交易速度和低廉的手續費。',
      'kava': 'KAVA: DeFi 平台，旨在提供跨鏈借貸和穩定幣服務，連接不同的區塊鏈生態系。',
      'jupsol': 'JUPSOL: Jupiter Staked SOL 在 Jupiter 平台質押的 SOL 代幣的代表。',
      'zec': 'ZEC (Zcash): 注重隱私的加密貨幣，採用 zk-SNARKs 技術，提供完全匿名的交易。',
      'bdx': 'BDX: Beldex 旨在為用戶提供安全、私密的通訊和交易解決方案的隱私幣。',
      'honey': 'HONEY: 在區塊鏈上運行且與法定貨幣掛鉤的數字資產。',
      'egld': 'EGLD (MultiversX): 區塊鏈，採用 Adaptive State Sharding 技術，提供快速交易速度和低廉的手續費。',
      'mana': 'MANA (Decentraland): 虛擬世界平台，允許用戶創建、擁有和交易虛擬土地和資產。',
      'tel': 'TEL (Telcoin): 旨在與電信公司合作，提供便捷、低成本的跨境匯款服務。',
      'dydx': 'DYDX: 去中心化衍生品交易所，提供槓桿交易和永續合約等產品。',
      'ron': 'RON (Ronin): 專為 Axie Infinity 遊戲設計的側鏈，提供快速交易速度和低廉的手續費。',
      'tusd': 'TUSD (TrueUSD): 穩定幣，與美元 1:1 錨定，由 TrustToken 發行，受監管且透明。',
      'wif': 'WIF (dogwifhat): Solana 上的迷因幣，以戴著帽子的柴犬為主題。',
      'strk': 'STRK (Starknet): Ethereum 的 Layer 2 擴容方案，採用 Validity Rollups 技術，提供高性能和低成本的交易。',
      'cmeth': 'CMETH: Mantle Restaked ETH Mantle 網路中重新質押的以太幣的代表。',
      'ar': 'AR (Arweave): 去中心化儲存網路，旨在提供永久儲存數據的服務，防止數據丟失和審查。',
      'pumpbtc': 'PUMPBTC: 是一種旨在模仿比特幣價格走勢的代幣。',
      'weth-base': 'WETH (Base): L2 Standard Bridged WETH 在 Base 網絡上的 WETH 的橋接版本。',
      'core': 'CORE: 基於比特幣權益證明的 Layer-1 區塊鏈。',
      'cfx': 'CFX (Conflux): 區塊鏈，採用 Tree-Graph 共識機制，提供高性能和可擴展性。',
      'virtual': 'VIRTUAL: 旨在創建虛擬世界體驗的平台。',
      'xec': 'XEC (eCash): Bitcoin Cash 的重新命名，旨在實現快速交易和大規模採用。',
      'nft': 'NFT (APENFT): 旨在促進 NFT 藝術品交易和收藏的平台。',
      'chz': 'CHZ (Chiliz): 運動娛樂區塊鏈，旨在為體育俱樂部和粉絲提供互動和參與的平台。',
      'doge-bsc': 'DOGE (BSC): Binance-Peg Dogecoin 在 Binance Smart Chain 上的 Dogecoin 的橋接版本。',
      'btc.b': 'BTC.B: Avalanche Bridged BTC 在 Avalanche 上的 BTC 的橋接版本。',
      'ape': 'APE (ApeCoin): Bored Ape Yacht Club NFT 社群的治理代幣，用於參與社群決策和生態系發展。',
      'weth-arbitrum': 'WETH (Arbitrum): 在 Arbitrum 上的 WETH 的橋接版本。',
      'clbtc': 'CLBTC: 是一種旨在模仿比特幣價格走勢的代幣。',
      'rune': 'RUNE (THORChain): 跨鏈流動性協議，旨在實現不同區塊鏈之間的資產交換。',
      'aero': 'AERO (Aerodrome Finance): Optimism 上的去中心化交易所 (DEX)，採用自動做市商 (AMM) 模式，提供多樣化的交易對。',
      'pengu': 'PENGU: Pudgy Penguins 以可愛企鵝為主題的 NFT 項目，具有社群文化和收藏價值。',
      'ousg': 'OUSG: 數位黃金投資產品。',
      'usdb': 'USDB: 由 Tangible 發行的與美元掛鉤的穩定幣。',
      'usyc': 'USYC: Hashnote USYC,Hashnote 發行的與美國國債掛鉤的穩定幣。',
      'pendle': 'PENDLE: 允許交易代幣化收益的 DeFi 協議。',
      'xcn': 'XCN (Onyxcoin): 加密貨幣支付網絡，專注於隱私和速度。',
      'plume': 'PLUME: 旨在通過區塊鏈技術來改變房地產行業的平台。',
      'comp': 'COMP (Compound): 去中心化借貸協議，允許用戶借出和借入加密貨幣，賺取利息。',
      'spx': 'SPX: SPX6900 槓桿加密貨幣產品，追蹤標準普爾 500 指數的表現。',
      'usdy': 'USDY: Ondo US Dollar Yield,由 Ondo Finance 發行的代幣化美國國債。',
      'matic': 'MATIC (Polygon): 以太坊的 Layer 2 擴容方案，提供快速交易速度和低廉的手續費，適用於 DApp 開發。',
      'axl': 'AXL: 提供安全跨鏈通信的去中心化網絡。',
      'eeth': 'EETH: ether.fi Staked ETH,ether.fi 協議中質押的以太幣的代表。',
      'oseth': 'OSETH: StakeWise Staked ETH,StakeWise 協議中質押的以太幣的代表。',
      'twt': 'TWT (Trust Wallet): Trust Wallet 的實用型代幣，用於支付交易手續費、參與治理等。',
      'ibera': 'IBERA: 基於Bera鏈的加密貨幣。',
      'grass': 'GRASS: 將未使用的網絡資源轉化為新經濟的協議。',
      'cgeth.hashkey': 'CGETH.HASHKEY: cgETH Hashkey Cloud,Hashkey Cloud 協議中質押的以太幣的代表。',
      'ohm': 'OHM (Olympus): 去中心化儲備貨幣協議，旨在建立一種不受政府控制的價值儲存方式。',
      'tbtc': 'TBTC: 以太坊上比特幣的權益代表。',
      'lunc': 'LUNC (Terra Luna Classic): Terra 區塊鏈的原始鏈，在 UST 穩定幣崩盤後，社群決定保留 LUNC 鏈。',
      'frax': 'FRAX: 部分抵押的穩定幣，旨在提供價格穩定性和去中心化特性。',
      'beam': 'BEAM: 專注於遊戲的區塊鏈平台。',
      'amp': 'AMP: 抵押代幣，用於擔保交易，確保交易的安全性。',
      'stbtc': 'STBTC: Lorenzo stBTC 由 Lorenzo 協議發行的抵押比特幣的代幣。',
      'fartcoin': 'FARTCOIN: 幽默的加密貨幣，社群性質強烈。',
      'gno': 'GNO (Gnosis): 預測市場平台，旨在提供準確、可靠的預測資訊。',
      'usdt-mantle': 'USDT (Mantle): 在 Mantle 網絡上的 USDT 的橋接版本。',
      'mina': 'MINA (Mina Protocol): 輕量級區塊鏈，採用 zk-SNARKs 技術，實現恆定大小的區塊鏈。',
      'brett': 'BRETT: 基於 \"Boy\'s Club\" 迷因的加密貨幣。',
      'busd': 'BUSD: Binance 發行的穩定幣，與美元 1:1 錨定，受監管且透明。',
      'rsr': 'RSR: 旨在建立一個去中心化的穩定幣系統，提供價格穩定性和去中心化特性。',
      'berastone': 'BERASTONE: StakeStone Berachain Vault Token 在Berachain鏈上運行。',
      'kaito': 'KAITO: 加密貨幣，旨在支持人工智能的開發和應用。',
      'aioz': 'AIOZ: AIOZ Network 分佈式內容交付網絡，旨在優化流媒體。',
      'morpho': 'MORPHO: 專注於優化 DeFi 借貸協議的協議。',
      'vrsc': 'VRSC (VerusCoin): 開源的公共區塊鏈，旨在提供快速、安全、私密的交易。',
      'akt': 'AKT (Akash Network): 去中心化雲計算平台，旨在建立一個開放、分散式的雲計算市場。'
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

  // 處理背景點擊事件
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <>
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
      </div>

      {/* 彈出視窗 */}
      {isExpanded && (
        <div className="modal-overlay" onClick={handleBackgroundClick}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <img src={image} alt={name} className="modal-logo" />
                <div>
                  <h2>{name}</h2>
                  <span className="modal-symbol">{symbol.toUpperCase()}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setIsExpanded(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-price">
                <p className="current-price">{formatCurrency(current_price)}</p>
                <p className={`price-change ${priceChangeColor}`}>
                  {price_change_percentage_24h >= 0 ? '+' : ''}
                  {price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>

              <div className="modal-stats">
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
                <div className="stat-item">
                  <div className="stat-icon volume-icon"></div>
                  <div className="stat-content">
                    <h5>24小時交易量</h5>
                    <p>{formatCurrency(total_volume)}</p>
                  </div>
                </div>
              </div>

              <div className="modal-description">
                <h4>關於 {name}</h4>
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
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoCard; 