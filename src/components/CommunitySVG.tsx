/* コミュニティセクション用のSVG画像 - ネットワークと接続をテーマにした図 */
const CommunitySVG = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="communityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8be9fd" />
          <stop offset="100%" stopColor="#6272a4" />
        </linearGradient>
        <filter id="communityGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* 背景の星空 */}
      {Array.from({ length: 50 }, (_, i) => (
        <circle 
          key={`star-${i}`} 
          cx={Math.random() * 300} 
          cy={Math.random() * 300} 
          r={Math.random() * 1.5} 
          fill="#f8f8f2" 
          opacity={Math.random() * 0.8 + 0.2}
        >
          <animate 
            attributeName="opacity" 
            values={`${Math.random() * 0.5 + 0.2};${Math.random() * 0.8 + 0.5};${Math.random() * 0.5 + 0.2}`} 
            dur={`${Math.random() * 3 + 2}s`} 
            repeatCount="indefinite" 
          />
        </circle>
      ))}
      
      {/* 中央のノード - ZK Tokyo */}
      <circle cx="150" cy="150" r="25" fill="#8be9fd" opacity="0.8" filter="url(#communityGlow)" />
      <text x="150" y="155" textAnchor="middle" fill="#282a36" fontSize="10" fontWeight="bold">ZK TOKYO</text>
      
      {/* 周囲のノード */}
      <circle cx="90" cy="100" r="15" fill="#6272a4" opacity="0.7" filter="url(#communityGlow)" />
      <text x="90" y="103" textAnchor="middle" fill="#f8f8f2" fontSize="8">MEMBER</text>
      
      <circle cx="210" cy="100" r="15" fill="#6272a4" opacity="0.7" filter="url(#communityGlow)" />
      <text x="210" y="103" textAnchor="middle" fill="#f8f8f2" fontSize="8">MEMBER</text>
      
      <circle cx="90" cy="200" r="15" fill="#6272a4" opacity="0.7" filter="url(#communityGlow)" />
      <text x="90" y="203" textAnchor="middle" fill="#f8f8f2" fontSize="8">MEMBER</text>
      
      <circle cx="210" cy="200" r="15" fill="#6272a4" opacity="0.7" filter="url(#communityGlow)" />
      <text x="210" y="203" textAnchor="middle" fill="#f8f8f2" fontSize="8">MEMBER</text>
      
      <circle cx="150" cy="60" r="20" fill="#50fa7b" opacity="0.7" filter="url(#communityGlow)" />
      <text x="150" y="63" textAnchor="middle" fill="#282a36" fontSize="8">CORE</text>
      
      <circle cx="150" cy="240" r="20" fill="#50fa7b" opacity="0.7" filter="url(#communityGlow)" />
      <text x="150" y="243" textAnchor="middle" fill="#282a36" fontSize="8">PROGRAM</text>
      
      {/* 接続線 */}
      <g stroke="url(#communityGradient)" strokeWidth="1" opacity="0.6">
        <line x1="150" y1="150" x2="90" y2="100" />
        <line x1="150" y1="150" x2="210" y2="100" />
        <line x1="150" y1="150" x2="90" y2="200" />
        <line x1="150" y1="150" x2="210" y2="200" />
        <line x1="150" y1="150" x2="150" y2="60" />
        <line x1="150" y1="150" x2="150" y2="240" />
      </g>
      
      {/* データフロー効果 */}
      <g>
        <circle cx="0" cy="0" r="3" fill="#8be9fd" opacity="0.8" filter="url(#communityGlow)">
          <animateMotion 
            path="M150,150 L90,100" 
            dur="3s" 
            repeatCount="indefinite" 
            rotate="auto"
          />
        </circle>
        
        <circle cx="0" cy="0" r="3" fill="#8be9fd" opacity="0.8" filter="url(#communityGlow)">
          <animateMotion 
            path="M150,150 L210,100" 
            dur="4s" 
            repeatCount="indefinite" 
            rotate="auto"
          />
        </circle>
        
        <circle cx="0" cy="0" r="3" fill="#8be9fd" opacity="0.8" filter="url(#communityGlow)">
          <animateMotion 
            path="M150,150 L150,60" 
            dur="2.5s" 
            repeatCount="indefinite" 
            rotate="auto"
          />
        </circle>
      </g>
      
      {/* コミュニティテキスト */}
      <text x="150" y="280" textAnchor="middle" fill="#8be9fd" fontSize="12" filter="url(#communityGlow)">ZERO KNOWLEDGE COMMUNITY</text>
    </svg>
  );
};

export default CommunitySVG;
