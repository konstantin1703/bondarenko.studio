import Link from 'next/link';

export default function PrivacyDraftPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px' }}>
      <p className="type-technical-md">DRAFT / REQUIRES APPROVAL</p>
      <h1 className="type-heading-lg" style={{ marginTop: 16 }}>Политика обработки данных</h1>
      <p className="type-body-md" style={{ marginTop: 24, color: '#a7b4b8' }}>
        Текст политики ещё не утверждён. На Stage 4 реальные данные не собираются и форма не отправляется.
      </p>
      <Link href="/" style={{ display: 'inline-block', marginTop: 32 }}>← Вернуться на главную</Link>
    </main>
  );
}
