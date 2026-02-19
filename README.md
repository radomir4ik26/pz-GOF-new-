# Practical lesson pz-GOF
# Реалізація GoF патернів проєктування

> Реалізація 8 класичних патернів проєктування (Gang of Four) на TypeScript.  
> Кожен патерн розміщено в окремій директорії з поясненням і демонстрацією роботи.

---

## Структура проєкту

```
├── pz-GOF
│   ├── src
│   │   ├── creational
│   │   │   ├── factory-method/index.ts
│   │   │   ├── builder/index.ts
│   │   │   └── singleton/index.ts
│   │   ├── structural
│   │   │   ├── adapter/index.ts
│   │   │   ├── facade/index.ts
│   │   │   └── decorator/index.ts
│   │   ├── behavioral
│   │   │   ├── strategy/index.ts
│   │   │   └── observer/index.ts
│   ├── examples
│   │   └── run-all.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .editorconfig
│   ├── .gitignore
│   └── README.md
```

---

## Запуск

```bash
npm install
npm start
```

---

## Реалізовані патерни

### 🏗 Породжувальні (Creational)

#### 1. Factory Method
**Проблема:** клієнтський код не повинен знати, який конкретний клас створювати.  
**Рішення:** `LoggerFactory.create(type)` повертає потрібну реалізацію логера (`Console`, `File`, `JSON`) не змінюючи клієнтський код.

```typescript
const logger = LoggerFactory.create("json");
logger.log("Повідомлення"); // [JSON] {"message":"Повідомлення","timestamp":"..."}
```

#### 2. Builder
**Проблема:** конструктор Pizza з 6+ параметрів важко читати і підтримувати.  
**Рішення:** `PizzaBuilder` будує об'єкт покроково через fluent-інтерфейс.

```typescript
const pizza = new PizzaBuilder()
  .setSize("large")
  .setSauce("tomato")
  .addTopping("моцарела")
  .withExtraCheese()
  .build();
```

#### 3. Singleton
**Проблема:** конфігурація або з'єднання з БД не мають дублюватися.  
**Рішення:** `AppConfig.getInstance()` завжди повертає один і той самий екземпляр.

```typescript
const a = AppConfig.getInstance();
const b = AppConfig.getInstance();
console.log(a === b); // true
```

---

### 🔧 Структурні (Structural)

#### 4. Adapter
**Проблема:** US-пристрій (110V) несумісний з EU-розеткою (220V).  
**Рішення:** `UStoEUAdapter` конвертує напругу прозоро для клієнта.

```typescript
const adapted = new UStoEUAdapter(new USDevice());
adapted.plugIn(220); // [Adapter] Конвертовано 220V → 110V
```

#### 5. Facade
**Проблема:** для відтворення відео треба вручну керувати VideoDecoder, AudioDecoder, SubtitleLoader, BufferManager.  
**Рішення:** `VideoPlayerFacade.play()` приховує складність за одним простим методом.

```typescript
const player = new VideoPlayerFacade();
player.play("movie.mp4", "uk"); // все відбувається автоматично
```

#### 6. Decorator
**Проблема:** `CoffeeWithMilk`, `CoffeeWithSugar`, `CoffeeWithMilkAndSugar` — вибух класів через наслідування.  
**Рішення:** декоратори динамічно «загортають» об'єкт, додаючи нову поведінку.

```typescript
let coffee: Coffee = new SimpleCoffee();         // 20грн
coffee = new MilkDecorator(coffee);             // 25грн
coffee = new WhipDecorator(coffee);             // 35грн
```

---

### 🔄 Поведінкові (Behavioral)

#### 7. Strategy
**Проблема:** вибір алгоритму сортування через великий `if/else` — важко розширювати.  
**Рішення:** кожен алгоритм — окремий клас, стратегія підміняється динамічно.

```typescript
const sorter = new Sorter(new BubbleSort());
sorter.sort([5, 3, 8, 1]); // Bubble Sort

sorter.setStrategy(new QuickSort());
sorter.sort([5, 3, 8, 1]); // Quick Sort
```

#### 8. Observer
**Проблема:** при реєстрації користувача треба надіслати Email, SMS і записати в лог — жорстке зв'язування.  
**Рішення:** `EventEmitter` сповіщає всіх підписників; кожен реагує незалежно.

```typescript
emitter.subscribe("user:registered", emailNotifier);
emitter.subscribe("user:registered", smsNotifier);
emitter.subscribe("user:registered", auditLogger);

emitter.emit("user:registered", { userId: 42 }); // всі отримають подію
```

---

## Приклад виводу

```
╔══════════════════════════════════════════╗
║        GoF Design Patterns Demo          ║
╚══════════════════════════════════════════╝

▶ CREATIONAL PATTERNS

=== FACTORY METHOD ===
[Console] Привіт від console логера!
[File] Writing to file: Привіт від file логера!
[JSON] {"message":"Привіт від json логера!","timestamp":"..."}

=== BUILDER ===
Маргарита: { size: 'large', crust: 'thick', sauce: 'tomato', toppings: [...], extraCheese: false }

=== SINGLETON ===
config1 === config2: true
config2.get('env'): production

▶ STRUCTURAL PATTERNS
...

▶ BEHAVIORAL PATTERNS
...

✅ Усі патерни виконано успішно!
```

---

## Висновки

| Група | Патерн | Головна ідея |
|-------|--------|--------------|
| Creational | Factory Method | Делегувати створення об'єктів підкласам |
| Creational | Builder | Будувати складний об'єкт покроково |
| Creational | Singleton | Гарантувати єдиний екземпляр |
| Structural | Adapter | Поєднати несумісні інтерфейси |
| Structural | Facade | Спростити складну підсистему |
| Structural | Decorator | Динамічно додавати поведінку |
| Behavioral | Strategy | Підміняти алгоритми незалежно від контексту |
| Behavioral | Observer | Сповіщати підписників про зміни стану |

Патерни GoF допомагають писати код, який легко розширювати, тестувати і підтримувати, уникаючи жорсткого зв'язування між компонентами.

---

## Корисні посилання

- [Refactoring Guru — Патерни проєктування](https://refactoring.guru/uk/design-patterns)
- [Design Patterns in JavaScript](https://www.patterns.dev/posts/classic-design-patterns/)
- [Gang of Four Patterns Overview](https://www.digitalocean.com/community/tutorials/gangs-of-four-gof-design-patterns)
