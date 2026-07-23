import type { CoreState } from '@/domain/contracts/foundation';
import styles from './OctagonalCore.module.scss';

type Props = { size?: number|string; state?: CoreState; label?: string; subtitle?: string; className?: string; decorative?: boolean };
export function OctagonalCore({ size=196, state='idle', label='BND ENGINE', subtitle='ЯДРО СИСТЕМЫ', className='', decorative=true }: Props) {
  const [first, second='ENGINE'] = label.split(' ');
  return <svg className={`${styles.core} ${className}`} data-visual-id="octagonal-core" data-state={state} width={size} height={typeof size==='number'?Math.round(size/1.12):size} viewBox="0 0 224 200" role={decorative?undefined:'img'} aria-hidden={decorative||undefined} aria-label={decorative?undefined:`${label}. ${subtitle}`} focusable="false">
    <defs><filter id="bnd-core-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <g id="core-outer-silhouette" className={styles.outer}><path d="M38 5H186L219 38V162L186 195H38L5 162V38Z"/></g>
    <g id="core-segmented-contour" className={styles.segmented}><path d="M44 11H103M121 11H180L211 42V78M211 121V157L181 188H130M96 188H43L12 157V124M12 79V43L43 12"/><path d="M26 54V39L41 24H63M161 24H183L198 39V55M198 145V161L181 177H159M65 177H41L26 161V145"/></g>
    <g id="core-corner-brackets" className={styles.brackets}><path d="M30 58V40L47 23H64M160 23H177L195 41V58M195 142V160L178 177H160M64 177H47L30 160V142"/></g>
    <g id="core-secondary-frame" className={styles.secondary}><path d="M49 25H175L200 50V150L175 175H49L24 150V50Z"/><path d="M62 38H162L187 63V137L162 162H62L37 137V63Z"/></g>
    <g id="core-glass-shell" className={styles.glass}><path d="M70 48H154L177 71V129L154 152H70L47 129V71Z"/></g>
    <g id="core-inner-segments" className={styles.inner}><path d="M72 55H105M119 55H151L169 73V92M169 108V127L151 145H119M105 145H72L55 127V108M55 92V73L72 55"/><path d="M83 67H141L157 83V117L141 133H83L67 117V83Z"/></g>
    <g id="core-central-panel" className={styles.panel}><path d="M84 72H140L152 84V116L140 128H84L72 116V84Z"/></g>
    <g id="core-internal-nodes" className={styles.nodes}><circle cx="112" cy="55" r="2"/><circle cx="169" cy="100" r="2"/><circle cx="112" cy="145" r="2"/><circle cx="55" cy="100" r="2"/><path d="M18 100H42M182 100H206M112 16V38M112 162V184"/></g>
    <g id="core-labels" className={styles.labels}><text x="112" y="94" textAnchor="middle">{first}</text><text x="112" y="109" textAnchor="middle">{second}</text><text x="112" y="119" textAnchor="middle" className={styles.subtitle}>{subtitle}</text></g>
    <g id="core-route-anchors" className={styles.anchors}><circle cx="5" cy="100" r="1"/><circle cx="219" cy="100" r="1"/><circle cx="112" cy="5" r="1"/><circle cx="112" cy="195" r="1"/></g>
  </svg>;
}
