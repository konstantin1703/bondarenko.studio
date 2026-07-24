import Link from 'next/link';
import { HudPanel } from '@/components/hud/HudPanel';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { contactChannels } from '@/data/stage9-remaining-sections';
import styles from './ContactFoundation.module.scss';

export function ContactFoundation() {
  return (
    <SectionFrame
      id="contacts"
      number="08"
      eyebrow="СЛЕДУЮЩИЙ ШАГ / STATIC CONTACT FOUNDATION"
      title="ОБСУДИМ ЗАДАЧУ"
      className={styles.section}
      headingClassName={styles.heading}
      visualId="stage9-contact"
      fixtureState="submission-disabled"
      fixtureVersion="stage-9"
    >
      <div className={styles.layout}>
        <div className={styles.copy}>
          <div className={styles.routeLabel}>PROCESS → ARCHITECTURE → PRODUCT</div>
          <h3>Опишите процесс или проблему — формат решения определим вместе</h3>
          <p>
            После уточнения требований можно сформировать предварительную архитектуру, определить модули
            и выбрать подходящий способ реализации. Production-контакты и отправка будут подключены отдельно.
          </p>

          <div className={styles.channels} aria-label="Статус контактных каналов">
            {contactChannels.map((channel) => (
              <div key={channel.code} className={styles.channel}>
                <span aria-hidden="true">{channel.code}</span>
                <div>
                  <strong>{channel.label}</strong>
                  <small>{channel.value}</small>
                </div>
                <i aria-hidden="true">PENDING</i>
              </div>
            ))}
          </div>

          <div className={styles.contactStatus}>
            <span>CONTACT PIPELINE</span>
            <strong>PRODUCTION DATA REQUIRED</strong>
          </div>
        </div>

        <HudPanel className={styles.formPanel}>
          <header>
            <div>
              <span>BRIEF INPUT / PREVIEW</span>
              <h3>Статический contact foundation</h3>
            </div>
            <span className={styles.disabledStatus}><i aria-hidden="true" /> SUBMISSION DISABLED</span>
          </header>

          <form aria-label="Предварительная форма обсуждения задачи" data-static-contact-form="true">
            <fieldset disabled>
              <label>
                <span>Имя</span>
                <input type="text" name="name" placeholder="Будет доступно на production-этапе" />
              </label>
              <label>
                <span>Контакт</span>
                <input type="text" name="contact" placeholder="Telegram или email" />
              </label>
              <label className={styles.messageField}>
                <span>Описание задачи</span>
                <textarea name="message" rows={4} placeholder="Что происходит сейчас и что требуется изменить" />
              </label>
              <label className={styles.consent}>
                <input type="checkbox" name="consent" defaultChecked={false} />
                <span>Согласие на обработку данных. Текст будет уточнён после privacy/legal review.</span>
              </label>
              <button type="submit" disabled>ОТПРАВКА БУДЕТ ПОДКЛЮЧЕНА ПОЗЖЕ <span aria-hidden="true">→</span></button>
            </fieldset>
          </form>

          <footer>
            <p id="contact-form-note">Данные не сохраняются и сетевые запросы не выполняются.</p>
            <Link href="/privacy">Открыть privacy draft</Link>
          </footer>
        </HudPanel>
      </div>
    </SectionFrame>
  );
}
