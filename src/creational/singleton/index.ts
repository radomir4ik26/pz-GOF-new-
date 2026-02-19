/**
 * SINGLETON — Породжувальний патерн
 *
 * Проблема: деякі ресурси (з'єднання з БД, конфіг) мають існувати в єдиному екземплярі.
 * Рішення: клас сам контролює, що екземпляр лише один.
 */

class AppConfig {
  private static instance: AppConfig | null = null;

  private config: Record<string, string> = {
    appName: "GoF Demo",
    version: "1.0.0",
    env: "development",
  };

  private constructor() {
    console.log("  [AppConfig] Ініціалізація конфігурації...");
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  get(key: string): string {
    return this.config[key] ?? "не знайдено";
  }

  set(key: string, value: string): void {
    this.config[key] = value;
  }
}

export function runSingleton(): void {
  console.log("\n=== SINGLETON ===");
  console.log("Проблема: конфіг завантажується кілька разів, синхронізація складна.");
  console.log("Рішення: Singleton гарантує один екземпляр.\n");

  const config1 = AppConfig.getInstance();
  const config2 = AppConfig.getInstance();
  const config3 = AppConfig.getInstance();

  console.log("  config1 === config2:", config1 === config2); // true
  console.log("  config1 === config3:", config1 === config3); // true

  config1.set("env", "production");
  console.log("  config2.get('env'):", config2.get("env")); // production — той самий об'єкт
}
