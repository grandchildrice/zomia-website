/* 研究セクション用のSVG画像 - 魔法陣のような暗号パターン */
const ResearchSVG = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a3b90" />
          <stop offset="100%" stopColor="#7b68ee" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* 背景円 */}
      <circle cx="150" cy="150" r="145" fill="none" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.3" />
      <circle cx="150" cy="150" r="120" fill="none" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.5" />
      <circle cx="150" cy="150" r="95" fill="none" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.7" />
      
      {/* 内側の魔法陣パターン */}
      <circle cx="150" cy="150" r="70" fill="none" stroke="#7b68ee" strokeWidth="1.5" opacity="0.8" filter="url(#glow)" />
      
      {/* 六芒星 */}
      <polygon 
        points="150,80 172,115 215,115 180,140 195,185 150,160 105,185 120,140 85,115 128,115" 
        fill="none" 
        stroke="#64ffda" 
        strokeWidth="1.5" 
        opacity="0.8"
        filter="url(#glow)"
      />
      
      {/* 暗号記号 - 円周上に配置 */}
      <g opacity="0.9" filter="url(#glow)">
        <text x="150" y="60" textAnchor="middle" fill="#64ffda" fontSize="10">01001010</text>
        <text x="240" y="150" textAnchor="middle" fill="#64ffda" fontSize="10">10110101</text>
        <text x="150" y="240" textAnchor="middle" fill="#64ffda" fontSize="10">11100011</text>
        <text x="60" y="150" textAnchor="middle" fill="#64ffda" fontSize="10">00111100</text>
      </g>
      
      {/* 中心の記号 */}
      <text x="150" y="155" textAnchor="middle" fill="#ff79c6" fontSize="14" filter="url(#glow)">ZK</text>
      
      {/* 放射状の線 */}
      <g stroke="#7b68ee" strokeWidth="0.5" opacity="0.6">
        <line x1="150" y1="80" x2="150" y2="30" />
        <line x1="220" y1="150" x2="270" y2="150" />
        <line x1="150" y1="220" x2="150" y2="270" />
        <line x1="80" y1="150" x2="30" y2="150" />
        
        <line x1="195" y1="105" x2="225" y2="75" />
        <line x1="195" y1="195" x2="225" y2="225" />
        <line x1="105" y1="195" x2="75" y2="225" />
        <line x1="105" y1="105" x2="75" y2="75" />
      </g>
      
      {/* 回転するドット - アニメーション用 */}
      <circle cx="150" cy="80" r="3" fill="#ff79c6">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 150 150" 
          to="360 150 150" 
          dur="30s" 
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default ResearchSVG;
