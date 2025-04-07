/* 研究セクション用のSVG画像 - 神秘的で複雑な暗号魔法陣 */
const ResearchSVG = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a3b90" />
          <stop offset="50%" stopColor="#7b68ee" />
          <stop offset="100%" stopColor="#64ffda" />
        </linearGradient>

        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff79c6" />
          <stop offset="100%" stopColor="#bd93f9" />
        </linearGradient>

        <radialGradient id="magicGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#bd93f9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#282a36" stopOpacity="0" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#64ffda" floodOpacity="0.7" result="neonColor" />
          <feComposite in="neonColor" in2="blur" operator="in" result="neonBlur" />
          <feMerge>
            <feMergeNode in="neonBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="purpleGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#bd93f9" floodOpacity="0.7" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 魔法陣のシンボルマスク */}
        <clipPath id="magicCircle">
          <circle cx="150" cy="150" r="130" />
        </clipPath>
      </defs>

      {/* 背景のグロー効果 */}
      <circle cx="150" cy="150" r="140" fill="url(#magicGlow)" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="10s" repeatCount="indefinite" />
      </circle>

      {/* 外側の複雑な魔法陣パターン */}
      <g opacity="0.6" filter="url(#glow)">
        <circle cx="150" cy="150" r="145" fill="none" stroke="#7b68ee" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="145;148;145" dur="15s" repeatCount="indefinite" />
        </circle>

        <circle cx="150" cy="150" r="140" fill="none" stroke="#7b68ee" strokeWidth="0.5" opacity="0.4">
          <animate attributeName="r" values="140;143;140" dur="10s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="120s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ルーン文字風の記号 - 外周配置 */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * 15) * Math.PI / 180;
          const x = 150 + 140 * Math.cos(angle);
          const y = 150 + 140 * Math.sin(angle);

          // ルーン記号をランダムに選択
          const runes = ['⟁', '⟟', '⟔', '⟠', '⟡', '⟰', '⟱', '⟲', '⟳', '⟴', '⟵', '⟶', '⟷', '⟸', '⟹', '⟺'];
          const rune = runes[Math.floor(Math.random() * runes.length)];

          return (
            <text
              key={`rune-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#bd93f9"
              fontSize="12"
              transform={`rotate(${i * 15 + 90}, ${x}, ${y})`}
              opacity={0.4 + (i % 3) * 0.2}
              filter="url(#glow)"
            >
              {rune}
              <animate
                attributeName="opacity"
                values={`${0.4 + (i % 3) * 0.2};${0.7 + (i % 3) * 0.2};${0.4 + (i % 3) * 0.2}`}
                dur={`${3 + i % 5}s`}
                repeatCount="indefinite"
              />
            </text>
          );
        })}
      </g>

      {/* 魔法陣の複雑な幾何学模様 */}
      <g opacity="0.8" filter="url(#glow)">
        {/* 第1層：多角形パターン */}
        <polygon
          points="150,80 220,150 150,220 80,150"
          fill="none"
          stroke="#bd93f9"
          strokeWidth="0.8"
          opacity="0.7"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="60s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* 第2層：八芒星 */}
        <polygon
          points="150,70 170,130 230,150 170,170 150,230 130,170 70,150 130,130"
          fill="none"
          stroke="#64ffda"
          strokeWidth="1"
          opacity="0.8"
          filter="url(#neonGlow)"
        >
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="10s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 150 150"
            to="0 150 150"
            dur="90s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* 第3層：五芒星 */}
        <polygon
          points="150,80 172,140 235,140 185,180 195,235 150,200 105,235 115,180 65,140 128,140"
          fill="none"
          stroke="#ff79c6"
          strokeWidth="1"
          opacity="0.7"
        >
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="8s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="120s"
            repeatCount="indefinite"
          />
        </polygon>
      </g>

      {/* 内側の円と魔法陣パターン */}
      <g opacity="0.9">
        {/* 集中円 */}
        {Array.from({ length: 5 }, (_, i) => {
          const radius = 40 + i * 15;
          return (
            <circle
              key={`inner-circle-${i}`}
              cx="150"
              cy="150"
              r={radius}
              fill="none"
              stroke="#7b68ee"
              strokeWidth={0.3 + (4 - i) * 0.2}
              opacity={0.3 + (4 - i) * 0.1}
              strokeDasharray={i % 2 === 0 ? "1,1" : "none"}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 150 150`}
                to={`${i % 2 === 0 ? 360 : -360} 150 150`}
                dur={`${40 + i * 10}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* 円周上に配置された暗号記号 */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const radius = 95;
          const x = 150 + radius * Math.cos(angle);
          const y = 150 + radius * Math.sin(angle);

          // 2進数や16進数をランダムに
          const binaries = [
            "01001", "10110", "11100", "00111",
            "10101", "01010", "11011", "00100",
            "FF", "A7", "3E", "D9", "0x"
          ];
          const binary = binaries[Math.floor(Math.random() * binaries.length)];

          return (
            <text
              key={`crypto-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#64ffda"
              fontSize="8"
              opacity="0.9"
              filter="url(#glow)"
            >
              {binary}
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur={`${3 + i % 5}s`}
                repeatCount="indefinite"
              />
            </text>
          );
        })}
      </g>

      {/* 中心の魔法陣核 */}
      <g filter="url(#purpleGlow)">
        <circle cx="150" cy="150" r="25" opacity="0.8">
          <animate attributeName="r" values="25;28;25" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* 内部パターン */}
        <circle cx="150" cy="150" r="18" fill="none" stroke="#ff79c6" strokeWidth="0.5" opacity="0.8">
          <animate attributeName="r" values="18;20;18" dur="3s" repeatCount="indefinite" />
        </circle>

        <circle cx="150" cy="150" r="15" fill="none" stroke="#ff79c6" strokeWidth="0.8" opacity="0.6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>

      </g>

      {/* 魔法陣から放射される光線 */}
      <g stroke="#7b68ee" opacity="0.6">
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * 15) * Math.PI / 180;
          const x1 = 150 + 25 * Math.cos(angle);
          const y1 = 150 + 25 * Math.sin(angle);
          const x2 = 150 + 140 * Math.cos(angle);
          const y2 = 150 + 140 * Math.sin(angle);

          return (
            <line
              key={`ray-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={0.3 + (i % 3) * 0.2}
              opacity={0.2 + (i % 5) * 0.1}
            >
              <animate
                attributeName="opacity"
                values={`${0.2 + (i % 5) * 0.1};${0.4 + (i % 5) * 0.1};${0.2 + (i % 5) * 0.1}`}
                dur={`${4 + i % 7}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </g>

      {/* 回転する粒子効果 */}
      <g>
        {Array.from({ length: 12 }, (_, i) => {
          const radius = 80 + (i % 4) * 15;
          const size = 1 + (i % 3);
          const speed = 20 + (i % 5) * 10;
          const delay = i * 2;
          const color = i % 3 === 0 ? "#ff79c6" : (i % 3 === 1 ? "#64ffda" : "#bd93f9");

          return (
            <circle
              key={`particle-${i}`}
              cx={150 + radius}
              cy="150"
              r={size}
              fill={color}
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 150 150`}
                to={`${i % 2 === 0 ? 360 : -360} 150 150`}
                dur={`${speed}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${5 + i % 3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={`${size};${size + 1};${size}`}
                dur={`${3 + i % 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>

      {/* 古代の暗号風記号 - 背景に埋め込み */}
      <g opacity="0.3" filter="url(#glow)">
        {Array.from({ length: 20 }, (_, i) => {
          const x = 30 + Math.random() * 240;
          const y = 30 + Math.random() * 240;
          const size = 5 + Math.random() * 7;

          // 古代暗号風記号
          const symbols = ['⚉', '⚇', '⚈', '⚆', '⚋', '⚊', '⚌', '⚍', '⚎', '⚏', '〄', '〆', '〇', '〒', '〓', '〠', '〶', '〷', '〸', '〹', '〺'];
          const symbol = symbols[Math.floor(Math.random() * symbols.length)];

          return (
            <text
              key={`symbol-${i}`}
              x={x}
              y={y}
              fill={i % 2 === 0 ? "#64ffda" : "#bd93f9"}
              fontSize={size}
              opacity={0.1 + Math.random() * 0.3}
              filter="url(#glow)"
            >
              {symbol}
              <animate
                attributeName="opacity"
                values={`${0.1 + Math.random() * 0.3};${0.2 + Math.random() * 0.4};${0.1 + Math.random() * 0.3}`}
                dur={`${5 + Math.random() * 5}s`}
                repeatCount="indefinite"
              />
            </text>
          );
        })}
      </g>

      {/* 波紋エフェクト */}
      <g>
        <circle cx="150" cy="150" r="5" fill="none" stroke="#64ffda" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" values="5;150" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="10s" repeatCount="indefinite" />
        </circle>

        <circle cx="150" cy="150" r="5" fill="none" stroke="#ff79c6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" values="5;150" dur="10s" begin="3.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="10s" begin="3.3s" repeatCount="indefinite" />
        </circle>

        <circle cx="150" cy="150" r="5" fill="none" stroke="#bd93f9" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" values="5;150" dur="10s" begin="6.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="10s" begin="6.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
};

export default ResearchSVG;