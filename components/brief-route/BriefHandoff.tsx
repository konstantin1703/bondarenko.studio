import styles from "./brief-handoff.module.css";

const STAGES = [
  {
    index: "01",
    label: "REVIEW",
    title: "Сначала — проверить задачу, а не продавать решение.",
    copy: "Контекст, ограничения и собранная спецификация проходят разбор. Если для архитектуры не хватает критичного входа, это формулируется отдельно — без догадок вместо данных.",
    output: "CONTEXT / RISKS / OPEN QUESTIONS",
  },
  {
    index: "02",
    label: "ARCHITECTURE",
    title: "Затем — вернуть рабочий контур проекта.",
    copy: "Формируется реалистичная схема: что действительно нужно собрать, какие части связаны между собой, где находятся зависимости и какие решения должны быть приняты до производства.",
    output: "SCOPE / ROUTE / DEPENDENCIES",
  },
  {
    index: "03",
    label: "START",
    title: "Только после согласования — переходить в производство.",
    copy: "Дизайн, engineering, интеграции и QA запускаются как один маршрут с понятными контрольными точками. Релиз считается частью работы, а не передачей файлов в конце.",
    output: "BUILD / QA / RELEASE",
  },
] as const;

export default function BriefHandoff() {
  return (
    <section id="handoff" className={styles.root} aria-labelledby="handoff-title">
      <div className={styles.frame} aria-hidden="true">
        <i className={styles.cornerTl} />
        <i className={styles.cornerTr} />
        <i className={styles.cornerBl} />
        <i className={styles.cornerBr} />
      </div>

      <header className={styles.header}>
        <div className={styles.kicker}>
          <span>05 / HANDOFF PROTOCOL</span>
          <i />
          <span>AFTER TRANSMISSION</span>
        </div>
        <div className={styles.headingGrid}>
          <h2 id="handoff-title">
            После Brief —<br />
            <em>не созвон ради созвона.</em>
          </h2>
          <p>
            Спецификация нужна, чтобы следующий контакт уже был предметным. BND сначала
            разбирает вход, затем возвращает архитектуру и только после этого переводит
            задачу в production-контур.
          </p>
        </div>
      </header>

      <div className={styles.sequence} role="list" aria-label="Что происходит после отправки Brief">
        {STAGES.map((stage) => (
          <article key={stage.index} className={styles.row} role="listitem">
            <small>{stage.index}</small>
            <div className={styles.label}>
              <strong>{stage.label}</strong>
              <span>STATE / READY</span>
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>
            <div className={styles.output}>
              <span>OUTPUT</span>
              <i aria-hidden="true" />
              <b>{stage.output}</b>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.bottom} aria-hidden="true">
        <span>INPUT / PROJECT SPEC</span>
        <i />
        <span>REVIEW</span>
        <i />
        <span>ARCHITECTURE</span>
        <i />
        <span>PRODUCTION</span>
      </div>
    </section>
  );
}
