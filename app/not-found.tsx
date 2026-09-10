import Link from "next/link";

export default function NotFound() {
  return (
    <main className="v12-not-found">
      <div className="v12-not-found__meta">404 / ROUTE NOT FOUND</div>
      <div className="v12-not-found__body">
        <span>404</span>
        <h1>Такого маршрута нет.</h1>
        <p>Вернитесь в систему и соберите нужную конфигурацию проекта.</p>
        <Link href="/">Вернуться на главную →</Link>
      </div>
    </main>
  );
}
