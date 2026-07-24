import { ArchitecturePreviewFoundation } from '@/components/architecture-preview/ArchitecturePreviewFoundation';
import { ConfiguratorProgress } from '@/components/configurator/ConfiguratorProgress';
import { SelectableOptionCard } from '@/components/configurator/SelectableOptionCard';
import { MicroLabel } from '@/components/hud/MicroLabel';
import { configuratorParameters, configuratorScenarios } from '@/data/configurator-fixtures';
import styles from './ConfiguratorFoundation.module.scss';

const productParameter = configuratorParameters.find((item) => item.label === 'Тип продукта');
const integrationParameters = configuratorParameters.filter((item) => item.label === 'Интеграции');
const timelineParameter = configuratorParameters.find((item) => item.label === 'Срок');
const budgetParameter = configuratorParameters.find((item) => item.label === 'Бюджет');

function StaticValue({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.staticValue}>
      <span>{label}</span>
      <strong>{value}</strong>
      <i aria-hidden="true">⌄</i>
    </div>
  );
}

export function ConfiguratorFoundation() {
  return (
    <section
      id="configurator"
      className={styles.section}
      aria-labelledby="configurator-title"
      data-visual-id="configurator"
      data-fixture-state="static-selected"
      data-fixture-version="stage-7"
    >
      <span className={styles.sectionNumber} aria-hidden="true">04 / CONFIGURATOR</span>
      <div className={styles.cornerTop} aria-hidden="true" />
      <div className={styles.cornerBottom} aria-hidden="true" />
      <div className={styles.backgroundGrid} aria-hidden="true" />

      <div className={styles.grid}>
        <aside className={`${styles.panel} ${styles.intro}`} data-configurator-zone="intro">
          <header className={styles.introHeader}>
            <MicroLabel priority={1}>КОНСТРУКТОР РЕШЕНИЯ</MicroLabel>
            <h2 id="configurator-title">
              <span>СОБЕРЁМ</span>
              <span>РЕШЕНИЕ</span>
              <span>ПОД ВАШ</span>
              <span>ПРОЦЕСС</span>
            </h2>
            <p>
              Ответьте на несколько вопросов. Система покажет предварительную структуру решения;
              реальная отправка на этом этапе отключена.
            </p>
          </header>
          <ConfiguratorProgress />
        </aside>

        <div className={`${styles.panel} ${styles.workspace}`} data-configurator-zone="workspace">
          <header className={styles.workspaceHeader}>
            <div>
              <MicroLabel priority={1}>ШАГ 01 / БРИФ</MicroLabel>
              <h3>Что требуется изменить?</h3>
              <p>Выберите наиболее близкий сценарий</p>
            </div>
            <span className={styles.workspaceStatus} aria-label="Статический режим конфигуратора">STATIC / LOCAL</span>
          </header>

          <div className={styles.options} aria-label="Сценарии задачи">
            {configuratorScenarios.map((scenario) => (
              <SelectableOptionCard key={scenario.id} {...scenario} />
            ))}
          </div>

          <section className={styles.parameters} aria-labelledby="configurator-parameters-title">
            <h4 id="configurator-parameters-title" className="sr-only">Предварительные параметры решения</h4>
            <div className={styles.parameterPrimary}>
              <StaticValue label="Тип продукта" value={productParameter?.value ?? 'Требует выбора'} />
            </div>
            <div className={styles.integrationGroup}>
              <span className={styles.parameterLabel}>Интеграции</span>
              <div className={styles.chips}>
                {integrationParameters.map((item) => <span key={item.value}>{item.value}<b aria-hidden="true">×</b></span>)}
              </div>
            </div>
            <StaticValue label="Срок" value={timelineParameter?.value ?? 'Обсуждается'} />
            <StaticValue label="Бюджет" value={budgetParameter?.value ?? 'Предварительная оценка'} />
          </section>

          <div className={styles.controls} aria-label="Навигация по статическому конфигуратору">
            <button type="button" className={styles.back} disabled aria-disabled="true">← Назад</button>
            <button type="button" className={styles.next} disabled aria-disabled="true">Продолжить →</button>
          </div>
        </div>

        <ArchitecturePreviewFoundation />
      </div>
    </section>
  );
}
