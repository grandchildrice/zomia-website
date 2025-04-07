/* ビジネスセクション用のSVG画像 - サイバーセキュリティをテーマにした図 */
const BusinessSVG = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5555" />
          <stop offset="100%" stopColor="#ff8080" />
        </linearGradient>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16213e" />
        </linearGradient>
        <filter id="businessGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* 背景グリッド */}
      <rect x="0" y="0" width="300" height="300" fill="url(#gridGradient)" opacity="0.2" />
      
      {/* グリッドライン */}
      <g stroke="#ff5555" strokeWidth="0.5" opacity="0.3">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" />
        ))}
      </g>
      
      {/* 中央のシールド */}
      <path 
        d="M150,60 L210,90 L210,150 C210,190 180,220 150,230 C120,220 90,190 90,150 L90,90 Z" 
        fill="none" 
        stroke="url(#shieldGradient)" 
        strokeWidth="2" 
        opacity="0.8"
        filter="url(#businessGlow)"
      />
      
      {/* ロック記号 */}
      <rect x="135" y="130" width="30" height="25" rx="2" fill="#ff5555" opacity="0.9" filter="url(#businessGlow)" />
      <rect x="140" y="110" width="20" height="20" rx="10" fill="none" stroke="#ff5555" strokeWidth="2" opacity="0.9" filter="url(#businessGlow)" />
      
      {/* 接続ノード */}
      <g>
        <circle cx="70" cy="70" r="10" fill="#50fa7b" opacity="0.7" filter="url(#businessGlow)" />
        <circle cx="230" cy="70" r="10" fill="#50fa7b" opacity="0.7" filter="url(#businessGlow)" />
        <circle cx="70" cy="230" r="10" fill="#50fa7b" opacity="0.7" filter="url(#businessGlow)" />
        <circle cx="230" cy="230" r="10" fill="#50fa7b" opacity="0.7" filter="url(#businessGlow)" />
        
        {/* 接続線 */}
        <line x1="70" y1="70" x2="150" y2="150" stroke="#50fa7b" strokeWidth="1" opacity="0.5" />
        <line x1="230" y1="70" x2="150" y2="150" stroke="#50fa7b" strokeWidth="1" opacity="0.5" />
        <line x1="70" y1="230" x2="150" y2="150" stroke="#50fa7b" strokeWidth="1" opacity="0.5" />
        <line x1="230" y1="230" x2="150" y2="150" stroke="#50fa7b" strokeWidth="1" opacity="0.5" />
      </g>
      
      {/* スキャンエフェクト */}
      <rect x="0" y="0" width="300" height="2" fill="#ff5555" opacity="0.7" filter="url(#businessGlow)">
        <animate 
          attributeName="y" 
          from="0" 
          to="300" 
          dur="3s" 
          repeatCount="indefinite" 
        />
      </rect>
      
      {/* セキュリティテキスト */}
      <text x="150" y="270" textAnchor="middle" fill="#ff5555" fontSize="12" filter="url(#businessGlow)">SECURITY DIAGNOSTICS</text>
      <text x="150" y="40" textAnchor="middle" fill="#ff5555" fontSize="12" filter="url(#businessGlow)">RED TEAM</text>
    </svg>
  );
};

export default BusinessSVG;
