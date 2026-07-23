export function HudNode({ x, y, active = false }: { x: number; y: number; active?: boolean }) {
  return <circle cx={x} cy={y} r={active ? 4 : 2} fill={active ? '#8AE7E7' : '#2ED8D5'} opacity={active ? .95 : .55} />;
}
