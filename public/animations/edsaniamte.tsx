import "./EDSIsometricAnimation.css";

type Props = {
  className?: string;
  label?: string;
};

/**
 * Decorative, responsive isometric electronics scene.
 * No external assets or animation libraries required.
 */
export default function EDSIsometricAnimation({ className = "" }: Props) {
  return (
    <div className={`eds-scene ${className}`} aria-hidden="true">
      <svg
        className="eds-scene__art"
        viewBox="0 0 900 620"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id="boardTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#173d69" />
            <stop offset="1" stopColor="#071b36" />
          </linearGradient>
          <linearGradient id="boardSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#12345a" />
            <stop offset="1" stopColor="#06152b" />
          </linearGradient>
          <linearGradient id="chipTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f7fb" />
            <stop offset=".45" stopColor="#aebdce" />
            <stop offset="1" stopColor="#71859b" />
          </linearGradient>
          <linearGradient id="chipSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#879bb0" />
            <stop offset="1" stopColor="#3d526b" />
          </linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7fbff" />
            <stop offset=".5" stopColor="#8fa5bb" />
            <stop offset="1" stopColor="#d9e4ee" />
          </linearGradient>
          <linearGradient id="component" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d8e3ed" />
            <stop offset="1" stopColor="#71869c" />
          </linearGradient>
          <radialGradient id="halo">
            <stop offset="0" stopColor="#48d9ff" stopOpacity=".24" />
            <stop offset="1" stopColor="#48d9ff" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="boardShadow" x="-30%" y="-30%" width="160%" height="180%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <pattern
            id="microGrid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="#8bb6d8"
              strokeOpacity=".09"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Ambient light and grounding shadow */}
        <ellipse
          cx="450"
          cy="475"
          rx="330"
          ry="82"
          fill="#020b18"
          opacity=".42"
          filter="url(#boardShadow)"
        />
        <ellipse cx="450" cy="300" rx="330" ry="250" fill="url(#halo)" />

        {/* PCB thickness */}
        <g className="board-float">
          <path
            d="M128 270 453 105 778 270 453 438Z"
            fill="#04152b"
            stroke="#294d70"
            strokeWidth="2"
          />
          <path d="M128 270 453 438 453 465 128 296Z" fill="url(#boardSide)" />
          <path d="M453 438 778 270 778 296 453 465Z" fill="#061a32" />
          <path
            d="M128 270 453 105 778 270 453 438Z"
            fill="url(#boardTop)"
            stroke="#4d83ad"
            strokeOpacity=".75"
            strokeWidth="2"
          />
          <path
            d="M128 270 453 105 778 270 453 438Z"
            fill="url(#microGrid)"
            opacity=".8"
          />

          {/* Board edge highlights */}
          <path
            d="M128 270 453 438 778 270"
            fill="none"
            stroke="#6c9dc2"
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <path d="M453 438V465" stroke="#4d789d" strokeWidth="2" />

          {/* Circuit traces: left network */}
          <g
            className="trace-lines"
            fill="none"
            stroke="#3d8fc2"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M421 277 330 230 270 260 218 233 184 250" />
            <path d="M420 294 350 258 300 284 250 258 210 278" />
            <path d="M426 314 348 354 292 326 245 350 205 329" />
            <path d="M445 333 385 365 335 340 286 365 250 347" />
            <path d="M465 270 525 238 580 265 625 242 685 274" />
            <path d="M475 291 545 257 592 282 650 253 712 286" />
            <path d="M478 317 555 355 608 328 660 355 706 332" />
            <path d="M460 337 520 370 575 344 620 369 670 344" />
            <path d="M430 250 390 229 360 244 325 225" />
            <path d="M485 250 530 225 565 242 605 220" />
            <path d="M400 355 380 385 335 362" />
            <path d="M510 354 535 386 580 364" />
          </g>

          {/* Pads and vias */}
          <g fill="#9ac5df" stroke="#163b5e" strokeWidth="2">
            {[
              [184, 250],
              [210, 278],
              [205, 329],
              [250, 347],
              [685, 274],
              [712, 286],
              [706, 332],
              [670, 344],
              [325, 225],
              [605, 220],
              [335, 362],
              [580, 364],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
            ))}
          </g>
          <g fill="#06182d" stroke="#6ab4df" strokeWidth="2">
            {[
              [270, 260],
              [300, 284],
              [292, 326],
              [286, 365],
              [625, 242],
              [650, 253],
              [608, 328],
              [620, 369],
              [360, 244],
              [565, 242],
              [380, 385],
              [535, 386],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
            ))}
          </g>

          {/* Left component bank */}
          <g className="component-rise">
            <path d="m205 210 39-20 39 20-39 21Z" fill="#07182c" />
            <path
              d="m205 202 39-20 39 20-39 21Z"
              fill="#5c7892"
              stroke="#c0d0de"
              strokeWidth="1.5"
            />
            <path d="m205 202 39 21v13l-39-21Z" fill="#405b75" />
            <path d="m244 223 39-21v13l-39 21Z" fill="#263f5a" />
            <path d="m218 200 26-13 26 13-26 14Z" fill="#b9c9d8" />
            <path d="m229 198 15-8 15 8-15 8Z" fill="#263d55" />
            <path d="M216 232v13m55-13v13" stroke="#b7c8d8" strokeWidth="3" />
          </g>

          {/* Capacitor pair */}
          <g className="component-rise component-rise--delay">
            <path d="m292 183 19-10 19 10-19 11Z" fill="#06182d" />
            <path
              d="m292 173 19-10 19 10-19 11Z"
              fill="#b9c9d8"
              stroke="#edf5fb"
              strokeWidth="1.2"
            />
            <path d="m292 173 19 11v18l-19-11Z" fill="#627a91" />
            <path d="m311 184 19-11v18l-19 11Z" fill="#435b73" />
            <path d="M300 168v-9m22 9v-9" stroke="#e4edf5" strokeWidth="2" />
          </g>

          {/* Right-side power module */}
          <g className="component-rise">
            <path d="m633 205 43-22 43 22-43 23Z" fill="#06182d" />
            <path
              d="m633 194 43-22 43 22-43 23Z"
              fill="url(#component)"
              stroke="#e2ebf3"
              strokeWidth="1.5"
            />
            <path d="m633 194 43 23v24l-43-23Z" fill="#60778f" />
            <path d="m676 217 43-23v24l-43 23Z" fill="#354d66" />
            <path d="m650 192 26-13 26 13-26 14Z" fill="#263d55" />
            <path d="M645 240v12m62-12v12" stroke="#b9cbd9" strokeWidth="3" />
          </g>

          {/* Small resistors */}
          <g className="component-rise component-rise--delay2">
            <path d="m665 322 17-9 17 9-17 10Z" fill="#07182c" />
            <path d="m665 315 17-9 17 9-17 10Z" fill="#d2dce5" />
            <path d="m665 315 17 10v11l-17-10Z" fill="#75899c" />
            <path d="m682 325 17-10v11l-17 10Z" fill="#4c6178" />
            <path d="M668 320 696 335" stroke="#344a61" strokeWidth="2" />
          </g>

          {/* Central processor shadow and pins */}
          <ellipse
            cx="453"
            cy="282"
            rx="116"
            ry="72"
            fill="#020c19"
            opacity=".5"
          />
          <g className="chip-pins">
            {Array.from({ length: 9 }, (_, i) => {
              const x = 365 + i * 22;
              return (
                <g key={`top-${i}`}>
                  <path
                    d={`M${x} 207l-7-10 8-4 8 10`}
                    fill="url(#metal)"
                    stroke="#edf5fb"
                    strokeWidth="1"
                  />
                  <path
                    d={`M${x + 2} 350l-8 12 8 4 8-12`}
                    fill="url(#metal)"
                    stroke="#edf5fb"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
            {Array.from({ length: 6 }, (_, i) => {
              const y = 237 + i * 18;
              return (
                <g key={`side-${i}`}>
                  <path
                    d={`M352 ${y}l-17-5-4 7 17 7`}
                    fill="url(#metal)"
                    stroke="#edf5fb"
                    strokeWidth="1"
                  />
                  <path
                    d={`M554 ${y}l17-5 4 7-17 7`}
                    fill="url(#metal)"
                    stroke="#edf5fb"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
          </g>

          {/* Main processor package */}
          <g className="chip-core">
            <path d="m353 222 100-51 101 51-101 53Z" fill="#06172c" />
            <path
              d="m353 211 100-51 101 51-101 53Z"
              fill="url(#chipTop)"
              stroke="#f2f7fb"
              strokeWidth="2"
            />
            <path
              d="m353 211 100 53v80l-100-53Z"
              fill="url(#chipSide)"
              stroke="#b7c9d8"
              strokeWidth="1.5"
            />
            <path
              d="m453 264 101-53v80l-101 53Z"
              fill="#526a82"
              stroke="#d4e0ea"
              strokeWidth="1.5"
            />
            <path
              d="m375 211 78-40 79 40-79 41Z"
              fill="#122b46"
              stroke="#f2f7fb"
              strokeOpacity=".7"
              strokeWidth="1.5"
            />
            <path
              d="m391 211 62-32 63 32-63 32Z"
              fill="#0b2038"
              stroke="#6e9fbe"
              strokeWidth="1.5"
            />
            <path
              d="m414 211 39-20 40 20-40 21Z"
              fill="#153d61"
              stroke="#58d8ff"
              strokeWidth="2"
            />
            <path
              d="m427 211 26-13 27 13-27 14Z"
              fill="#2a9cc8"
              opacity=".85"
            />
            <path
              d="M453 191v42m-39-22h79"
              stroke="#9beaff"
              strokeOpacity=".65"
              strokeWidth="1.5"
            />
            <circle
              cx="453"
              cy="211"
              r="5"
              fill="#e6fbff"
              filter="url(#softGlow)"
            />
            <path
              d="m353 211 100 53 101-53"
              fill="none"
              stroke="#ffffff"
              strokeOpacity=".65"
              strokeWidth="2"
            />
          </g>

          {/* Signal paths and moving energy pulses */}
          <g
            fill="none"
            stroke="#56d9ff"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#softGlow)"
            opacity=".9"
          >
            <path
              d="M453 265 330 230 270 260 218 233"
              className="signal-path"
            />
            <path
              d="M453 265 545 257 592 282 650 253 712 286"
              className="signal-path signal-path--reverse"
            />
            <path
              d="M453 315 348 354 292 326 245 350"
              className="signal-path signal-path--slow"
            />
            <path
              d="M453 315 555 355 608 328 660 355"
              className="signal-path signal-path--reverse signal-path--slow"
            />
          </g>
          <g className="energy-points" filter="url(#softGlow)">
            <circle r="4.5" fill="#d7faff">
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                path="M453 265 330 230 270 260 218 233"
              />
            </circle>
            <circle r="4" fill="#a7f0ff">
              <animateMotion
                dur="3.7s"
                begin="-.9s"
                repeatCount="indefinite"
                path="M453 265 545 257 592 282 650 253 712 286"
              />
            </circle>
            <circle r="3.5" fill="#d7faff">
              <animateMotion
                dur="4.1s"
                begin="-1.6s"
                repeatCount="indefinite"
                path="M453 315 348 354 292 326 245 350"
              />
            </circle>
            <circle r="3.5" fill="#d7faff">
              <animateMotion
                dur="4.5s"
                begin="-2s"
                repeatCount="indefinite"
                path="M453 315 555 355 608 328 660 355"
              />
            </circle>
          </g>

          {/* Small board-mounted IC */}
          <g className="component-rise component-rise--delay2">
            <path d="m540 365 31-16 31 16-31 17Z" fill="#06182d" />
            <path
              d="m540 357 31-16 31 16-31 17Z"
              fill="#b9c8d6"
              stroke="#e9f1f7"
              strokeWidth="1.2"
            />
            <path d="m540 357 31 17v24l-31-17Z" fill="#627990" />
            <path d="m571 374 31-17v24l-31 17Z" fill="#3a526b" />
            <path d="m551 357 20-10 20 10-20 11Z" fill="#142e49" />
            {Array.from({ length: 4 }, (_, i) => (
              <path
                key={i}
                d={`M${547 + i * 8} 395l-4 7m34-7 4 7`}
                stroke="#c4d3df"
                strokeWidth="2"
              />
            ))}
          </g>

          {/* Mounting holes */}
          <g fill="#06172b" stroke="#86abc6" strokeWidth="2">
            <ellipse cx="175" cy="270" rx="10" ry="6" />
            <ellipse cx="453" cy="124" rx="10" ry="6" />
            <ellipse cx="733" cy="270" rx="10" ry="6" />
            <ellipse cx="453" cy="418" rx="10" ry="6" />
          </g>
          <g fill="#8fc5e5" opacity=".6">
            <circle cx="175" cy="270" r="2.2" />
            <circle cx="453" cy="124" r="2.2" />
            <circle cx="733" cy="270" r="2.2" />
            <circle cx="453" cy="418" r="2.2" />
          </g>
        </g>

        {/* Fine technical orbit marks, detached from board */}
        <g
          className="orbit-marks"
          fill="none"
          stroke="#7bb7da"
          strokeOpacity=".42"
        >
          <path d="M125 370a365 210 0 0 0 655 0" strokeDasharray="3 9" />
          <path d="M190 135l18-9m-18 9 9 17M690 420l18 9m-18-9-9 17" />
          <circle cx="760" cy="180" r="3" fill="#65dfff" stroke="none" />
          <circle cx="155" cy="390" r="3" fill="#65dfff" stroke="none" />
        </g>
      </svg>
      <div className="eds-scene__ambient" />
    </div>
  );
}
