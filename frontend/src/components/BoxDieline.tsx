/**
 * BoxDieline.tsx
 * Renders a 2D flat box dieline (net) using real L x W x H dimensions
 * from the backend detection results.
 *
 * Box Net Layout:
 *
 *              [   TOP   ]
 *   [LEFT] [FRONT] [RIGHT] [BACK]
 *              [  BOTTOM ]
 */

type BoxDielineProps = {
  length: number; // cm - depth (front to back)
  width: number;  // cm - left to right
  height: number; // cm - top to bottom
};

export default function BoxDieline({ length, width, height }: BoxDielineProps) {
  // ── Scale: fit into SVG canvas ──────────────────────────────────────────────
  const SCALE = 6; // pixels per cm — adjust if box looks too big/small
  const PADDING = 60;

  const W = width * SCALE;   // front face width
  const H = height * SCALE;  // front face height
  const L = length * SCALE;  // depth (side face width)

  // Total SVG size needed
  const svgWidth = L + W + L + W + PADDING * 2;       // left+front+right+back
  const svgHeight = H + H + H + PADDING * 2;           // top+middle+bottom (extra H for flaps)

  // Origin point (top-left of FRONT face)
  const ox = PADDING + L;
  const oy = PADDING + H;

  // Colors
  const fillColor = "#FEF9C3";       // light yellow
  const strokeColor = "#D97706";     // amber
  const textColor = "#92400E";       // dark amber
  const dimColor = "#3B82F6";        // blue for dimension lines
  const foldColor = "#D97706";       // dashed fold lines

  const strokeW = 1.5;
  const fontSize = 11;
  const labelSize = 13;

  // ── Helper: dimension line with arrows ──────────────────────────────────────
  const DimLine = ({
    x1, y1, x2, y2, label, offset = 18, horizontal = true
  }: {
    x1: number; y1: number; x2: number; y2: number;
    label: string; offset?: number; horizontal?: boolean;
  }) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={dimColor} strokeWidth={1} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
        {horizontal ? (
          <text x={mx} y={y1 - 5} textAnchor="middle" fill={dimColor} fontSize={10} fontWeight="600">{label}</text>
        ) : (
          <text x={x1 - 5} y={my} textAnchor="end" fill={dimColor} fontSize={10} fontWeight="600" dominantBaseline="middle">{label}</text>
        )}
      </g>
    );
  };

  // ── Face label ──────────────────────────────────────────────────────────────
  const FaceLabel = ({ x, y, label }: { x: number; y: number; label: string }) => (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize={labelSize} fontWeight="700" opacity={0.7}>
      {label}
    </text>
  );

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="mx-auto"
        style={{ maxWidth: "100%" }}
      >
        {/* ── Arrow marker definition ── */}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={dimColor} />
          </marker>
        </defs>

        {/* ════════════════════════════════════════════
            FACES
        ════════════════════════════════════════════ */}

        {/* TOP face */}
        <rect x={ox} y={oy - H} width={W} height={H} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        <FaceLabel x={ox + W / 2} y={oy - H / 2} label="TOP" />

        {/* FRONT face */}
        <rect x={ox} y={oy} width={W} height={H} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        <FaceLabel x={ox + W / 2} y={oy + H / 2} label="FRONT" />

        {/* BOTTOM face */}
        <rect x={ox} y={oy + H} width={W} height={H} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        <FaceLabel x={ox + W / 2} y={oy + H + H / 2} label="BOTTOM" />

        {/* LEFT face */}
        <rect x={ox - L} y={oy} width={L} height={H} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        <FaceLabel x={ox - L / 2} y={oy + H / 2} label="LEFT" />

        {/* RIGHT face */}
        <rect x={ox + W} y={oy} width={L} height={H} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        <FaceLabel x={ox + W + L / 2} y={oy + H / 2} label="RIGHT" />

        {/* BACK face */}
        <rect x={ox + W + L} y={oy} width={W} height={H} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        <FaceLabel x={ox + W + L + W / 2} y={oy + H / 2} label="BACK" />

        {/* ════════════════════════════════════════════
            FOLD LINES (dashed)
        ════════════════════════════════════════════ */}

        {/* fold: top-front */}
        <line x1={ox} y1={oy} x2={ox + W} y2={oy} stroke={foldColor} strokeWidth={1} strokeDasharray="6 4" />
        {/* fold: front-bottom */}
        <line x1={ox} y1={oy + H} x2={ox + W} y2={oy + H} stroke={foldColor} strokeWidth={1} strokeDasharray="6 4" />
        {/* fold: left-front */}
        <line x1={ox} y1={oy} x2={ox} y2={oy + H} stroke={foldColor} strokeWidth={1} strokeDasharray="6 4" />
        {/* fold: front-right */}
        <line x1={ox + W} y1={oy} x2={ox + W} y2={oy + H} stroke={foldColor} strokeWidth={1} strokeDasharray="6 4" />
        {/* fold: right-back */}
        <line x1={ox + W + L} y1={oy} x2={ox + W + L} y2={oy + H} stroke={foldColor} strokeWidth={1} strokeDasharray="6 4" />

        {/* ════════════════════════════════════════════
            DIMENSION LINES
        ════════════════════════════════════════════ */}

        {/* Width dimension (top, horizontal) */}
        <DimLine
          x1={ox} y1={oy - H - 20}
          x2={ox + W} y2={oy - H - 20}
          label={`W: ${width} cm`}
          horizontal={true}
        />

        {/* Height dimension (left, vertical) */}
        <DimLine
          x1={ox - L - 20} y1={oy}
          x2={ox - L - 20} y2={oy + H}
          label={`H: ${height} cm`}
          horizontal={false}
        />

        {/* Length dimension (side face, horizontal) */}
        <DimLine
          x1={ox + W} y1={oy + H + H + 20}
          x2={ox + W + L} y2={oy + H + H + 20}
          label={`L: ${length} cm`}
          horizontal={true}
        />

        {/* ════════════════════════════════════════════
            CORNER MARKS (cut lines)
        ════════════════════════════════════════════ */}
        {[
          [ox, oy - H], [ox + W, oy - H],
          [ox, oy + H + H], [ox + W, oy + H + H],
          [ox - L, oy], [ox - L, oy + H],
          [ox + W + L + W, oy], [ox + W + L + W, oy + H],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="#9CA3AF" strokeWidth={1} />
            <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#9CA3AF" strokeWidth={1} />
          </g>
        ))}

        {/* ════════════════════════════════════════════
            LEGEND
        ════════════════════════════════════════════ */}
        <g transform={`translate(${PADDING}, ${svgHeight - 30})`}>
          <line x1={0} y1={8} x2={20} y2={8} stroke={foldColor} strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={25} y={12} fill={textColor} fontSize={10}>Fold line</text>
          <line x1={80} y1={8} x2={100} y2={8} stroke={strokeColor} strokeWidth={1.5} />
          <text x={105} y={12} fill={textColor} fontSize={10}>Cut line</text>
          <line x1={160} y1={8} x2={180} y2={8} stroke={dimColor} strokeWidth={1} />
          <text x={185} y={12} fill={dimColor} fontSize={10}>Dimension</text>
        </g>
      </svg>

      {/* ── Summary below SVG ── */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Width</p>
          <p className="text-lg font-bold text-amber-700">{width} cm</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Height</p>
          <p className="text-lg font-bold text-amber-700">{height} cm</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Length</p>
          <p className="text-lg font-bold text-amber-700">{length} cm</p>
        </div>
      </div>
    </div>
  );
}