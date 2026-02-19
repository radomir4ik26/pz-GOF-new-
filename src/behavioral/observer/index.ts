/**
 * OBSERVER — Поведінковий патерн
 *
 * Проблема: об'єкт змінює стан, і кілька інших мають реагувати — тісне зв'язування.
 * Рішення: Subject сповіщає підписників (Observers) про зміни через єдиний механізм.
 */

interface Observer {
  update(event: string, data: unknown): void;
}

class EventEmitter {
  private listeners: Map<string, Observer[]> = new Map();

  subscribe(event: string, observer: Observer): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(observer);
  }

  unsubscribe(event: string, observer: Observer): void {
    const obs = this.listeners.get(event) ?? [];
    this.listeners.set(event, obs.filter(o => o !== observer));
  }

  emit(event: string, data: unknown): void {
    const obs = this.listeners.get(event) ?? [];
    obs.forEach(o => o.update(event, data));
  }
}

// Конкретні спостерігачі
class EmailNotifier implements Observer {
  update(event: string, data: unknown): void {
    console.log(`  [Email] Подія "${event}":`, data);
  }
}

class SMSNotifier implements Observer {
  update(event: string, data: unknown): void {
    console.log(`  [SMS]   Подія "${event}":`, data);
  }
}

class AuditLogger implements Observer {
  private log: string[] = [];

  update(event: string, data: unknown): void {
    const entry = `${new Date().toISOString()} | ${event} | ${JSON.stringify(data)}`;
    this.log.push(entry);
    console.log(`  [Audit] Записано: ${entry}`);
  }

  getLogs(): string[] { return this.log; }
}

export function runObserver(): void {
  console.log("\n=== OBSERVER ===");
  console.log("Проблема: при реєстрації треба надіслати email, SMS і записати в лог — жорстке зв'язування.");
  console.log("Рішення: Observer підписується на події і реагує незалежно.\n");

  const emitter = new EventEmitter();
  const email  = new EmailNotifier();
  const sms    = new SMSNotifier();
  const audit  = new AuditLogger();

  emitter.subscribe("user:registered", email);
  emitter.subscribe("user:registered", sms);
  emitter.subscribe("user:registered", audit);
  emitter.subscribe("user:login", audit);

  console.log("  → Реєстрація користувача:");
  emitter.emit("user:registered", { userId: 42, name: "Іван" });

  console.log("\n  → Вхід в систему:");
  emitter.emit("user:login", { userId: 42 });

  console.log("\n  → Відписуємо SMS і знову реєструємо:");
  emitter.unsubscribe("user:registered", sms);
  emitter.emit("user:registered", { userId: 43, name: "Марія" });
}
