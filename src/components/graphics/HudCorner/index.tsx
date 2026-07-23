export function HudCorner({ x = 0, y = 0, size = 16 }: { x?: number; y?: number; size?: number }) {
  return <path d={`M${x} ${y+size}V${y}H${x+size}`} fill="none" stroke="#2ED8D5" strokeWidth="1" opacity=".55" />;
}
