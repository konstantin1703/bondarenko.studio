import { HudNode } from '@/components/graphics/HudNode';

type Props = { width?: number; height?: number; active?: boolean; kind?: 'straight'|'orthogonal'|'chamfered'; className?: string };
export function ConnectorLine({ width=180, height=48, active=false, kind='chamfered', className='' }: Props) {
  const mid = height/2;
  const d = kind === 'straight' ? `M4 ${mid}H${width-4}` : kind === 'orthogonal' ? `M4 4H${width*.55}V${height-4}H${width-4}` : `M4 ${mid}H${width*.42}L${width*.52} ${height-4}H${width-4}`;
  return <svg className={className} viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" aria-hidden="true" focusable="false"><path d={d} fill="none" stroke={active?'#2ED8D5':'#16777C'} strokeWidth={active?1.5:1} opacity={active?.92:.34}/><HudNode x={4} y={kind==='orthogonal'?4:mid} active={active}/><HudNode x={width-4} y={kind==='straight'?mid:height-4} active={active}/></svg>;
}
