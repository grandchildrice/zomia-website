/* ビジネスセクション用のSVG画像 - サイバーセキュリティをテーマにした未来的な図 */
const BusinessSVG = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5555" />
          <stop offset="50%" stopColor="#ff7b7b" />
          <stop offset="100%" stopColor="#ff8080" />
        </linearGradient>

        <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5555" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff0000" stopOpacity="0.2" />
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

        <filter id="neonRedGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#ff5555" floodOpacity="0.7" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="greenGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feFlood floodColor="#50fa7b" floodOpacity="0.5" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ハニカムパターン用 */}
        <pattern id="hexPattern" patternUnits="userSpaceOnUse" width="30" height="52" patternTransform="scale(0.5)">
          <path d="M0,26 l15,-26 l15,26 l-15,26 z" fill="none" stroke="#ff5555" strokeWidth="0.5" opacity="0.3" />
          <path d="M30,26 l15,-26 l15,26 l-15,26 z" fill="none" stroke="#ff5555" strokeWidth="0.5" opacity="0.3" />
          <path d="M15,52 l15,-26 l15,26 l-15,26 z" fill="none" stroke="#ff5555" strokeWidth="0.5" opacity="0.3" />
          <path d="M-15,52 l15,-26 l15,26 l-15,26 z" fill="none" stroke="#ff5555" strokeWidth="0.5" opacity="0.3" />
        </pattern>

        {/* データフロー用マスク */}
        <mask id="shieldMask">
          <path d="M150,60 L210,90 L210,150 C210,190 180,220 150,230 C120,220 90,190 90,150 L90,90 Z" fill="white" />
        </mask>
      </defs>

      {/* 背景グリッド */}
      <rect x="0" y="0" width="300" height="300" fill="url(#gridGradient)" opacity="0.3" />

      {/* ハニカムパターンの背景 */}
      <rect x="0" y="0" width="300" height="300" fill="url(#hexPattern)" opacity="0.7">
        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="10s" repeatCount="indefinite" />
      </rect>

      {/* グリッドライン - より洗練された効果 */}
      <g>
        {Array.from({ length: 15 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 20}
            x2="300"
            y2={i * 20}
            stroke="#ff5555"
            strokeWidth="0.3"
            opacity={0.1 + (i % 3) * 0.1}
          >
            <animate
              attributeName="opacity"
              values={`${0.1 + (i % 3) * 0.1};${0.3 + (i % 3) * 0.1};${0.1 + (i % 3) * 0.1}`}
              dur={`${5 + i % 5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {Array.from({ length: 15 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 20}
            y1="0"
            x2={i * 20}
            y2="300"
            stroke="#ff5555"
            strokeWidth="0.3"
            opacity={0.1 + (i % 3) * 0.1}
          >
            <animate
              attributeName="opacity"
              values={`${0.1 + (i % 3) * 0.1};${0.3 + (i % 3) * 0.1};${0.1 + (i % 3) * 0.1}`}
              dur={`${5 + i % 5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </g>

      {/* シールドの外側の輝きエフェクト */}
      <path
        d="M150,55 L215,87 L215,155 C215,198 182,230 150,240 C118,230 85,198 85,155 L85,87 Z"
        fill="none"
        stroke="#ff5555"
        strokeWidth="0.5"
        opacity="0.3"
        filter="url(#businessGlow)"
      >
        <animate
          attributeName="opacity"
          values="0.1;0.3;0.1"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* メインのシールド - よりメタリックな質感 */}
      <path
        d="M150,60 L210,90 L210,150 C210,190 180,220 150,230 C120,220 90,190 90,150 L90,90 Z"
        fill="url(#cyberGradient)"
        stroke="url(#shieldGradient)"
        strokeWidth="2"
        opacity="0.8"
        filter="url(#neonRedGlow)"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.9;0.7"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* シールド内のデータフロー効果 */}
      <g mask="url(#shieldMask)">
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`data-${i}`}
            x1={90 + i * 15}
            y1="300"
            x2={90 + i * 15}
            y2="0"
            stroke="#ff8080"
            strokeWidth="1"
            opacity="0.4"
          >
            <animate
              attributeName="y1"
              values="300;0;300"
              dur={`${3 + i % 3}s`}
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.4;0"
              dur={`${3 + i % 3}s`}
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </g>

      {/* ロック記号 - アニメーション化 */}
      <g>
        <rect
          x="135"
          y="130"
          width="30"
          height="25"
          rx="2"
          fill="#ff5555"
          opacity="0.9"
          filter="url(#neonRedGlow)"
        >
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        <rect
          x="140"
          y="110"
          width="20"
          height="20"
          rx="10"
          fill="none"
          stroke="#ff5555"
          strokeWidth="2"
          opacity="0.9"
          filter="url(#neonRedGlow)"
        >
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* ロックのキーホール */}
        <circle cx="150" cy="142" r="3" fill="#16213e" />
        <rect x="149" y="142" width="2" height="8" rx="1" fill="#16213e" />
      </g>

      {/* 接続ノード - 洗練されたデザイン */}
      <g>
        {Array.from({ length: 4 }, (_, i) => {
          const angle = (i * 90) * Math.PI / 180;
          const cx = 150 + 100 * Math.cos(angle);
          const cy = 150 + 100 * Math.sin(angle);
          return (
            <g key={`node-${i}`}>
              {/* 外側の輝く円 */}
              <circle cx={cx} cy={cy} r="12" fill="none" stroke="#50fa7b" strokeWidth="0.5" opacity="0.3" filter="url(#greenGlow)">
                <animate
                  attributeName="r"
                  values="12;14;12"
                  dur="3s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* メインのノード */}
              <circle cx={cx} cy={cy} r="10" fill="#50fa7b" opacity="0.7" filter="url(#greenGlow)">
                <animate
                  attributeName="opacity"
                  values="0.6;0.8;0.6"
                  dur="3s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* 接続線 - パルス効果付き */}
              <line x1={cx} y1={cy} x2="150" y2="150" stroke="#50fa7b" strokeWidth="1" opacity="0.5">
                <animate
                  attributeName="opacity"
                  values="0.3;0.6;0.3"
                  dur="3s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </line>

              {/* データフロー効果 */}
              <circle cx="0" cy="0" r="3" fill="#50fa7b" opacity="0.8" filter="url(#greenGlow)">
                <animateMotion
                  path={`M${cx},${cy} L150,150`}
                  dur={`${3 + i % 2}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur={`${3 + i % 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </g>

      {/* スキャンエフェクト - 洗練されたアニメーション */}
      <g>
        <rect x="0" y="0" width="300" height="2" fill="#ff5555" opacity="0.5" filter="url(#neonRedGlow)">
          <animate
            attributeName="y"
            values="0;300;0"
            dur="10s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.7;0.3"
            dur="10s"
            repeatCount="indefinite"
          />
        </rect>

        {/* 追加のスキャンライン - 位相をずらす */}
        <rect x="0" y="0" width="300" height="1" fill="#ff5555" opacity="0.3" filter="url(#neonRedGlow)">
          <animate
            attributeName="y"
            values="0;300;0"
            begin="5s"
            dur="10s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            begin="5s"
            dur="10s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* セキュリティテキスト - よりネオンのような輝き */}
      <text x="150" y="270" textAnchor="middle" fill="#ff5555" fontSize="14" fontWeight="bold" filter="url(#neonRedGlow)">SECURITY DIAGNOSTICS</text>
      <text x="150" y="40" textAnchor="middle" fill="#ff5555" fontSize="14" fontWeight="bold" filter="url(#neonRedGlow)">RED TEAM</text>

      {/* 波紋効果 - アラート */}
      <circle cx="150" cy="150" r="30" fill="none" stroke="#ff5555" strokeWidth="0.5" opacity="0">
        <animate attributeName="r" values="30;150" dur="5s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="5s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default BusinessSVG;