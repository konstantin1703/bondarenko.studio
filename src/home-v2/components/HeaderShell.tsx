const navigation = [
  { href: '#hero', label: 'Главная' },
  { href: '#change-panel', label: 'Что можно изменить' },
  { href: '#products-panel', label: 'Продукты' },
  { href: '#configurator', label: 'Контакты' },
] as const;

export function HeaderShell() {
  return (
    <header className="preview-header">
      <a className="preview-brand" href="#hero" aria-label="BND.STUDIO — к началу preview">
        BND.STUDIO
      </a>
      <nav aria-label="Навигация preview">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="preview-header-action" href="#configurator">
        Написать
      </a>
    </header>
  );
}
