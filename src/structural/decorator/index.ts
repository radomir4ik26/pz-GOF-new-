/**
 * DECORATOR — Структурний патерн
 *
 * Проблема: потрібно динамічно розширювати функціональність об'єктів без наслідування.
 * Рішення: обгортати об'єкти в декоратори, які додають нову поведінку.
 */

interface Coffee {
  cost(): number;
  description(): string;
}

// Базовий об'єкт
class SimpleCoffee implements Coffee {
  cost(): number { return 20; }
  description(): string { return "Проста кава"; }
}

// Базовий декоратор
abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  abstract cost(): number;
  abstract description(): string;
}

// Конкретні декоратори
class MilkDecorator extends CoffeeDecorator {
  cost(): number { return this.coffee.cost() + 5; }
  description(): string { return this.coffee.description() + " + молоко"; }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number { return this.coffee.cost() + 3; }
  description(): string { return this.coffee.description() + " + цукор"; }
}

class WhipDecorator extends CoffeeDecorator {
  cost(): number { return this.coffee.cost() + 10; }
  description(): string { return this.coffee.description() + " + збиті вершки"; }
}

export function runDecorator(): void {
  console.log("\n=== DECORATOR ===");
  console.log("Проблема: CoffeeWithMilk, CoffeeWithSugar, CoffeeWithMilkAndSugar... — вибух класів.");
  console.log("Рішення: Decorator динамічно «загортає» об'єкт, додаючи функціональність.\n");

  let coffee: Coffee = new SimpleCoffee();
  console.log(`  ${coffee.description()} — ${coffee.cost()}грн`);

  coffee = new MilkDecorator(coffee);
  console.log(`  ${coffee.description()} — ${coffee.cost()}грн`);

  coffee = new SugarDecorator(coffee);
  console.log(`  ${coffee.description()} — ${coffee.cost()}грн`);

  coffee = new WhipDecorator(coffee);
  console.log(`  ${coffee.description()} — ${coffee.cost()}грн`);
}
