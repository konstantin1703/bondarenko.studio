import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './ContactFoundation.module.scss';
export function ContactFoundation(){return <SectionFrame id="contacts" number="08" eyebrow="СЛЕДУЮЩИЙ ШАГ" title="ОПИШИТЕ ПРОЦЕСС — СОБЕРЁМ АРХИТЕКТУРУ"><div className={styles.content}><p>На Stage 4 контактная отправка отключена. Готовый конфигуратор и server-side pipeline будут реализованы позднее.</p><a href="#configurator">ПЕРЕЙТИ К КОНФИГУРАТОРУ <span>→</span></a></div></SectionFrame>}
