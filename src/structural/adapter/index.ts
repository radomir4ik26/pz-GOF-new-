/**
 * ADAPTER — Структурний патерн
 *
 * Проблема: є несумісні інтерфейси — старий код і новий не можуть працювати разом.
 * Рішення: Adapter «перекладає» один інтерфейс в інший без зміни вихідного коду.
 */

// Новий інтерфейс, який очікує наш додаток
interface EUSocket {
  plugIn(voltage: 220): string;
}

// Старий/сторонній клас з несумісним інтерфейсом
class USDevice {
  connect(voltage: 110): string {
    return `Пристрій підключено до ${voltage}V (US стандарт)`;
  }
}

// Adapter: дозволяє US-пристрою працювати в EU-розетці
class UStoEUAdapter implements EUSocket {
  constructor(private device: USDevice) {}

  plugIn(voltage: 220): string {
    const converted = voltage / 2; // 220V → 110V
    return `[Adapter] Конвертовано ${voltage}V → ${converted}V. ${this.device.connect(converted)}`;
  }
}

// Рідний EU пристрій
class EUDevice implements EUSocket {
  plugIn(voltage: 220): string {
    return `EU пристрій підключено до ${voltage}V`;
  }
}

export function runAdapter(): void {
  console.log("\n=== ADAPTER ===");
  console.log("Проблема: US-пристрій не може підключитися до EU-розетки.");
  console.log("Рішення: Adapter перетворює 220V → 110V прозоро для клієнта.\n");

  const euDevice = new EUDevice();
  const usDevice = new USDevice();
  const adapted = new UStoEUAdapter(usDevice);

  const socket: EUSocket[] = [euDevice, adapted];
  socket.forEach(device => {
    console.log(" ", device.plugIn(220));
  });
}
