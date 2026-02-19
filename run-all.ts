import { runFactoryMethod } from "../src/creational/factory-method";
import { runBuilder }       from "../src/creational/builder";
import { runSingleton }     from "../src/creational/singleton";
import { runAdapter }       from "../src/structural/adapter";
import { runFacade }        from "../src/structural/facade";
import { runDecorator }     from "../src/structural/decorator";
import { runStrategy }      from "../src/behavioral/strategy";
import { runObserver }      from "../src/behavioral/observer";

console.log("╔══════════════════════════════════════════════╗");
console.log("║         GoF Design Patterns — Demo           ║");
console.log("╚══════════════════════════════════════════════╝");

// ── Породжувальні ─────────────────────────────────────────────────────────────
console.log("\n◆ CREATIONAL PATTERNS");
runFactoryMethod();
runBuilder();
runSingleton();

// ── Структурні ────────────────────────────────────────────────────────────────
console.log("\n◆ STRUCTURAL PATTERNS");
runAdapter();
runFacade();
runDecorator();

// ── Поведінкові ───────────────────────────────────────────────────────────────
console.log("\n◆ BEHAVIORAL PATTERNS");
runStrategy();
runObserver();

console.log("\n✓ Усі патерни успішно продемонстровано!");
