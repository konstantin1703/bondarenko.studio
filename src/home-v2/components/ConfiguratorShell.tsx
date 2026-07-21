import { configuratorSteps } from '../data/configurator-steps';

export function ConfiguratorShell() {
  return (
    <section className="preview-section" id="configurator" aria-labelledby="configurator-title">
      <header className="preview-section-heading">
        <span className="preview-index">04 / CONFIGURATOR</span>
        <h2 id="configurator-title">Собрать решение</h2>
        <p>
          На этом этапе configurator не собирает контакты, не хранит ответы и не отправляет запросы в production Worker.
        </p>
      </header>
      <ol className="preview-steps">
        {configuratorSteps.map((step) => (
          <li key={step.id}>
            <span>{String(step.order).padStart(2, '0')}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.hint}</p>
            </div>
          </li>
        ))}
      </ol>
      <button type="button" disabled>
        Отправка отключена в техническом preview
      </button>
    </section>
  );
}
