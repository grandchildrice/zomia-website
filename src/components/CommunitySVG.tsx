/* コミュニティセクション用のSVG画像 - 宇宙的なネットワークと接続をテーマにした図 */
const CommunitySVG = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="communityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8be9fd" />
          <stop offset="50%" stopColor="#79cbdc" />
          <stop offset="100%" stopColor="#6272a4" />
        </linearGradient>

        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8be9fd" />
          <stop offset="100%" stopColor="#50fa7b" />
        </linearGradient>

        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6272a4" />
          <stop offset="100%" stopColor="#44475a" />
        </linearGradient>

        <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#50fa7b" />
          <stop offset="100%" stopColor="#8be9fd" />
        </linearGradient>

        <filter id="communityGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="blueGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#8be9fd" floodOpacity="0.7" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="greenGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#50fa7b" floodOpacity="0.7" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 宇宙背景用のノイズパターン */}
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        </filter>
      </defs>

      {/* 深宇宙の背景 */}
      <rect x="0" y="0" width="300" height="300" fill="#0c0c15" opacity="0.8" />

      {/* 星空のノイズ効果 */}
      <rect x="0" y="0" width="300" height="300" filter="url(#noiseFilter)" opacity="0.05" />

      {/* 輝く星々 - ランダム配置と輝きアニメーション */}
      {Array.from({ length: 70 }, (_, i) => {
        const x = Math.random() * 300;
        const y = Math.random() * 300;
        const size = Math.random() * 1.8 + 0.2;
        const opacity = Math.random() * 0.5 + 0.3;
        const duration = Math.random() * 6 + 2;
        const delay = Math.random() * 5;

        return (
          <circle
            key={`star-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="#f8f8f2"
            opacity={opacity}
            filter="url(#communityGlow)"
          >
            <animate
              attributeName="opacity"
              values={`${opacity};${opacity * 1.5};${opacity}`}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values={`${size};${size * 1.2};${size}`}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* 宇宙的な霧効果 */}
      {Array.from({ length: 3 }, (_, i) => {
        const cx = 100 + Math.random() * 100;
        const cy = 100 + Math.random() * 100;
        const rx = 30 + Math.random() * 120;
        const ry = 30 + Math.random() * 120;

        return (
          <ellipse
            key={`nebula-${i}`}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={i % 2 === 0 ? "#6272a4" : "#bd93f9"}
            opacity="0.05"
          />
        );
      })}

      {/* 中央のノード - ZK Tokyo */}
      <g filter="url(#blueGlow)">
        <circle cx="150" cy="150" r="28" fill="url(#centerGradient)" opacity="0.9">
          <animate
            attributeName="r"
            values="28;30;28"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="150" cy="150" r="32" fill="none" stroke="#8be9fd" strokeWidth="0.5" opacity="0.6">
          <animate
            attributeName="r"
            values="32;35;32"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="150" y="146" textAnchor="middle" fill="#282a36" fontSize="10" fontWeight="bold">ZK</text>
        <text x="150" y="158" textAnchor="middle" fill="#282a36" fontSize="10" fontWeight="bold">TOKYO</text>
      </g>

      {/* 接続ノード - アニメーション化 */}
      {/* MEMBER ノード - 円形に配置 */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i * 90 + 45) * Math.PI / 180;
        const distance = 80;
        const cx = 150 + distance * Math.cos(angle);
        const cy = 150 + distance * Math.sin(angle);

        return (
          <g key={`member-${i}`} filter="url(#communityGlow)">
            <circle
              cx={cx}
              cy={cy}
              r="15"
              fill="url(#nodeGradient)"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.7;0.9;0.7"
                dur={`${3 + i % 2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={cx}
              cy={cy}
              r="18"
              fill="none"
              stroke="#6272a4"
              strokeWidth="0.5"
              opacity="0.4"
            >
              <animate
                attributeName="r"
                values="18;20;18"
                dur={`${3 + i % 2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <text x={cx} y={cy + 3} textAnchor="middle" fill="#f8f8f2" fontSize="8" fontWeight="bold">MEMBER</text>
          </g>
        );
      })}

      {/* CORE と PROGRAM ノード */}
      <g filter="url(#greenGlow)">
        <circle cx="150" cy="60" r="22" fill="url(#coreGradient)" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.7;0.9;0.7"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="150" cy="60" r="25" fill="none" stroke="#50fa7b" strokeWidth="0.5" opacity="0.6">
          <animate
            attributeName="r"
            values="25;27;25"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="150" y="63" textAnchor="middle" fill="#282a36" fontSize="9" fontWeight="bold">CORE</text>
      </g>

      <g filter="url(#greenGlow)">
        <circle cx="150" cy="240" r="22" fill="url(#coreGradient)" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.7;0.9;0.7"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="150" cy="240" r="25" fill="none" stroke="#50fa7b" strokeWidth="0.5" opacity="0.6">
          <animate
            attributeName="r"
            values="25;27;25"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="150" y="243" textAnchor="middle" fill="#282a36" fontSize="9" fontWeight="bold">PROGRAM</text>
      </g>

      {/* 接続線 - グラデーションと脈動効果 */}
      <g>
        {Array.from({ length: 6 }, (_, i) => {
          let x1, y1, x2, y2;

          if (i < 4) {
            // メンバーノードへの接続
            const angle = (i * 90 + 45) * Math.PI / 180;
            const distance = 80;
            x1 = 150;
            y1 = 150;
            x2 = 150 + distance * Math.cos(angle);
            y2 = 150 + distance * Math.sin(angle);
          } else if (i === 4) {
            // COREノードへの接続
            x1 = 150;
            y1 = 150;
            x2 = 150;
            y2 = 60;
          } else {
            // PROGRAMノードへの接続
            x1 = 150;
            y1 = 150;
            x2 = 150;
            y2 = 240;
          }

          return (
            <g key={`connection-${i}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#communityGradient)"
                strokeWidth="1.5"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.4;0.7;0.4"
                  dur={`${3 + i % 3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="strokeWidth"
                  values="1.5;2;1.5"
                  dur={`${3 + i % 3}s`}
                  repeatCount="indefinite"
                />
              </line>

              {/* データフロー効果 - より速く動く粒子 */}
              <circle r="3" fill="#8be9fd" opacity="0.8" filter="url(#blueGlow)">
                <animateMotion
                  path={`M${x1},${y1} L${x2},${y2}`}
                  dur={`${2 + i % 2}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.9;0.6"
                  dur={`${2 + i % 2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="2;3;2"
                  dur={`${2 + i % 2}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* 逆方向に動く粒子 */}
              <circle r="2" fill="#50fa7b" opacity="0.7" filter="url(#greenGlow)">
                <animateMotion
                  path={`M${x2},${y2} L${x1},${y1}`}
                  dur={`${3 + i % 2}s`}
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur={`${3 + i % 2}s`}
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </g>

      {/* 周囲の小さな衛星ノード */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const distance = Math.random() * 20 + 100; // 中心から離れたランダムな距離
        const cx = 150 + distance * Math.cos(angle);
        const cy = 150 + distance * Math.sin(angle);
        const size = Math.random() * 3 + 2;

        return (
          <circle
            key={`satellite-${i}`}
            cx={cx}
            cy={cy}
            r={size}
            fill="#6272a4"
            opacity="0.7"
            filter="url(#communityGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.5;0.8;0.5"
              dur={`${3 + i % 3}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* 波紋エフェクト */}
      <circle cx="150" cy="150" r="5" fill="none" stroke="#8be9fd" strokeWidth="0.5" opacity="0">
        <animate attributeName="r" values="5;100" dur="10s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="10s" repeatCount="indefinite" />
      </circle>

      <circle cx="150" cy="150" r="5" fill="none" stroke="#50fa7b" strokeWidth="0.5" opacity="0">
        <animate attributeName="r" values="5;100" dur="10s" begin="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="10s" begin="5s" repeatCount="indefinite" />
      </circle>

      {/* 小さな流れ星効果 */}
      <line x1="50" y1="30" x2="80" y2="60" stroke="#f8f8f2" strokeWidth="1" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="1s" repeatCount="indefinite" />
      </line>

      <line x1="250" y1="40" x2="220" y2="70" stroke="#f8f8f2" strokeWidth="1" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin="5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
};

export default CommunitySVG;