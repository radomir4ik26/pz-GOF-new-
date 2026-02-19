/**
 * STRATEGY — Поведінковий патерн
 *
 * Проблема: алгоритм змінюється залежно від контексту, if/else розростається.
 * Рішення: інкапсулювати кожен алгоритм в окремий клас і підміняти їх динамічно.
 */

interface SortStrategy {
  sort(data: number[]): number[];
  name: string;
}

class BubbleSort implements SortStrategy {
  name = "Bubble Sort";

  sort(data: number[]): number[] {
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort implements SortStrategy {
  name = "Quick Sort";

  sort(data: number[]): number[] {
    if (data.length <= 1) return data;
    const pivot = data[Math.floor(data.length / 2)];
    const left  = data.filter(x => x < pivot);
    const mid   = data.filter(x => x === pivot);
    const right = data.filter(x => x > pivot);
    return [...this.sort(left), ...mid, ...this.sort(right)];
  }
}

class NativeSort implements SortStrategy {
  name = "Native Sort";
  sort(data: number[]): number[] {
    return [...data].sort((a, b) => a - b);
  }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    console.log(`  Використовую: ${this.strategy.name}`);
    return this.strategy.sort(data);
  }
}

export function runStrategy(): void {
  console.log("\n=== STRATEGY ===");
  console.log("Проблема: великий if/else для вибору алгоритму сортування.");
  console.log("Рішення: Strategy дозволяє підміняти алгоритм без зміни контексту.\n");

  const data = [5, 3, 8, 1, 9, 2, 7];
  console.log("  Вхідні дані:", data);

  const sorter = new Sorter(new BubbleSort());
  console.log("  Результат:", sorter.sort(data));

  sorter.setStrategy(new QuickSort());
  console.log("  Результат:", sorter.sort(data));

  sorter.setStrategy(new NativeSort());
  console.log("  Результат:", sorter.sort(data));
}
