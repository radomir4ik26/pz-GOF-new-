/**
 * BUILDER — Породжувальний патерн
 *
 * Проблема: складний об'єкт має багато опціональних параметрів — конструктор роздувається.
 * Рішення: будувати об'єкт покроково через зрозумілий fluent-інтерфейс.
 */

interface Pizza {
  size: string;
  crust: string;
  sauce: string;
  toppings: string[];
  extraCheese: boolean;
}

class PizzaBuilder {
  private pizza: Pizza = {
    size: "medium",
    crust: "thin",
    sauce: "tomato",
    toppings: [],
    extraCheese: false,
  };

  setSize(size: string): this {
    this.pizza.size = size;
    return this;
  }

  setCrust(crust: string): this {
    this.pizza.crust = crust;
    return this;
  }

  setSauce(sauce: string): this {
    this.pizza.sauce = sauce;
    return this;
  }

  addTopping(topping: string): this {
    this.pizza.toppings.push(topping);
    return this;
  }

  withExtraCheese(): this {
    this.pizza.extraCheese = true;
    return this;
  }

  build(): Pizza {
    return { ...this.pizza };
  }
}

export function runBuilder(): void {
  console.log("\n=== BUILDER ===");
  console.log("Проблема: Pizza(size, crust, sauce, t1, t2, t3, cheese) — важко читати.");
  console.log("Рішення: Builder дозволяє будувати об'єкт крок за кроком.\n");

  const margherita = new PizzaBuilder()
    .setSize("large")
    .setCrust("thick")
    .setSauce("tomato")
    .addTopping("моцарела")
    .addTopping("базилік")
    .build();

  const veggie = new PizzaBuilder()
    .setSize("small")
    .setSauce("pesto")
    .addTopping("перець")
    .addTopping("гриби")
    .withExtraCheese()
    .build();

  console.log("Маргарита:", margherita);
  console.log("Веджі:", veggie);
}
