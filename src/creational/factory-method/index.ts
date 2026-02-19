/**
 * FACTORY METHOD — Породжувальний патерн
 *
 * Проблема: клієнтський код не повинен знати, який конкретний клас створювати.
 * Рішення: делегувати створення об'єктів підкласам через єдиний інтерфейс.
 */

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Console] ${message}`);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    console.log(`[File] Writing to file: ${message}`);
  }
}

class JsonLogger implements Logger {
  log(message: string): void {
    console.log(`[JSON] ${JSON.stringify({ message, timestamp: new Date().toISOString() })}`);
  }
}

// Factory
type LoggerType = "console" | "file" | "json";

class LoggerFactory {
  static create(type: LoggerType): Logger {
    switch (type) {
      case "console": return new ConsoleLogger();
      case "file":    return new FileLogger();
      case "json":    return new JsonLogger();
      default:        throw new Error(`Unknown logger type: ${type}`);
    }
  }
}

export function runFactoryMethod(): void {
  console.log("\n=== FACTORY METHOD ===");
  console.log("Проблема: треба логувати по-різному залежно від середовища.");
  console.log("Рішення: Factory створює потрібний логер без зміни клієнтського коду.\n");

  const types: LoggerType[] = ["console", "file", "json"];
  for (const type of types) {
    const logger = LoggerFactory.create(type);
    logger.log(`Привіт від ${type} логера!`);
  }
}
