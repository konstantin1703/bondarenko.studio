import type { ReactNode } from 'react';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function TechFrame({
  as: Element = 'div',
  className,
  children,
}: {
  as?: 'div' | 'section' | 'aside';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Element className={classes('tech-frame', className)}>
      <TechCorner position="top-left" />
      <TechCorner position="top-right" />
      <TechCorner position="bottom-left" />
      <TechCorner position="bottom-right" />
      {children}
    </Element>
  );
}

export function TechCorner({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  return <span className={`tech-corner tech-corner--${position}`} aria-hidden="true" />;
}

export function TechCard({
  className,
  active,
  children,
}: {
  className?: string;
  active?: boolean;
  children: ReactNode;
}) {
  return <div className={classes('tech-card', active && 'is-active', className)}>{children}</div>;
}

export function TechConnectorSvg({
  className,
  viewBox,
  children,
}: {
  className?: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <svg
      className={classes('tech-connectors', className)}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function TechGrid({ className }: { className?: string }) {
  return <span className={classes('tech-grid', className)} aria-hidden="true" />;
}

export interface TechStatusItem {
  icon: ReactNode;
  label: string;
  value: string;
}

export function TechStatusStrip({ items, className }: { items: readonly TechStatusItem[]; className?: string }) {
  return (
    <dl className={classes('tech-status-strip', className)}>
      {items.map((item) => (
        <div key={item.label}>
          <span className="tech-status-strip__icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </span>
        </div>
      ))}
    </dl>
  );
}

export function TechIconTile({
  icon,
  title,
  meta,
}: {
  icon: ReactNode;
  title: string;
  meta?: string;
}) {
  return (
    <li className="tech-icon-tile">
      <span className="tech-icon-tile__icon" aria-hidden="true">
        {icon}
      </span>
      <strong>{title}</strong>
      {meta ? <small>{meta}</small> : null}
    </li>
  );
}

export function TechWorkflowStep({
  icon,
  title,
  description,
  isLast,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <li className="tech-workflow-step">
      <span className="tech-workflow-step__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="tech-workflow-step__copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      {!isLast ? <span className="tech-workflow-step__arrow" aria-hidden="true" /> : null}
    </li>
  );
}

export function TechPrincipleRow({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <li className="tech-principle-row">
      <span className="tech-principle-row__icon" aria-hidden="true">
        {icon}
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </li>
  );
}
