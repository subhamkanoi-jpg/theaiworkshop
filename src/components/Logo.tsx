type LogoProps = {
  className?: string;
};

/**
 * The AI Workshop brand mark — a gradient hexagonal node network.
 * Renders on transparent background so it sits on light or dark surfaces.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="The AI Workshop logo"
    >
      <defs>
        <linearGradient
          id="aiw-logo-grad"
          x1="8"
          y1="6"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="0.55" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <g
        stroke="url(#aiw-logo-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* outer hexagon */}
        <polygon points="32,6 54.5,19 54.5,45 32,58 9.5,45 9.5,19" />

        {/* inner node ring */}
        <polygon points="32,17.7 44.4,24.85 44.4,39.15 32,46.3 19.6,39.15 19.6,24.85" />

        {/* spokes: node ring -> outer vertices */}
        <line x1="32" y1="17.7" x2="32" y2="6" />
        <line x1="44.4" y1="24.85" x2="54.5" y2="19" />
        <line x1="44.4" y1="39.15" x2="54.5" y2="45" />
        <line x1="32" y1="46.3" x2="32" y2="58" />
        <line x1="19.6" y1="39.15" x2="9.5" y2="45" />
        <line x1="19.6" y1="24.85" x2="9.5" y2="19" />

        {/* spokes: node ring -> center */}
        <line x1="32" y1="17.7" x2="32" y2="32" />
        <line x1="44.4" y1="24.85" x2="32" y2="32" />
        <line x1="44.4" y1="39.15" x2="32" y2="32" />
        <line x1="32" y1="46.3" x2="32" y2="32" />
        <line x1="19.6" y1="39.15" x2="32" y2="32" />
        <line x1="19.6" y1="24.85" x2="32" y2="32" />
      </g>

      {/* filled center hexagon */}
      <polygon
        points="32,25 38.06,28.5 38.06,35.5 32,39 25.94,35.5 25.94,28.5"
        fill="url(#aiw-logo-grad)"
      />

      {/* nodes */}
      <g fill="url(#aiw-logo-grad)">
        <circle cx="32" cy="6" r="2.4" />
        <circle cx="54.5" cy="19" r="2.4" />
        <circle cx="54.5" cy="45" r="2.4" />
        <circle cx="32" cy="58" r="2.4" />
        <circle cx="9.5" cy="45" r="2.4" />
        <circle cx="9.5" cy="19" r="2.4" />
        <circle cx="32" cy="17.7" r="3" />
        <circle cx="44.4" cy="24.85" r="3" />
        <circle cx="44.4" cy="39.15" r="3" />
        <circle cx="32" cy="46.3" r="3" />
        <circle cx="19.6" cy="39.15" r="3" />
        <circle cx="19.6" cy="24.85" r="3" />
      </g>
    </svg>
  );
}
