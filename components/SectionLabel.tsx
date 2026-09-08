export default function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-label" aria-hidden="true">
      <span>{index} — 04</span>
      <span className="section-label__line" />
      <span>{label}</span>
    </div>
  );
}
