/**
 * FACADE — Структурний патерн
 *
 * Проблема: складна підсистема (кілька класів) важка для використання напряму.
 * Рішення: Facade надає простий єдиний інтерфейс до складної підсистеми.
 */

// Підсистема: складні внутрішні компоненти
class VideoDecoder {
  decode(file: string): string {
    return `Декодовано відео: ${file}`;
  }
}

class AudioDecoder {
  decode(file: string): string {
    return `Декодовано аудіо: ${file}`;
  }
}

class SubtitleLoader {
  load(lang: string): string {
    return `Завантажено субтитри: ${lang}`;
  }
}

class BufferManager {
  allocate(mb: number): string {
    return `Виділено ${mb}MB буфера`;
  }
}

// Facade: простий інтерфейс для відтворення відео
class VideoPlayerFacade {
  private videoDecoder = new VideoDecoder();
  private audioDecoder = new AudioDecoder();
  private subtitleLoader = new SubtitleLoader();
  private buffer = new BufferManager();

  play(file: string, subtitleLang = "uk"): void {
    console.log(`  Відтворення "${file}":`);
    console.log("   ", this.buffer.allocate(256));
    console.log("   ", this.videoDecoder.decode(file));
    console.log("   ", this.audioDecoder.decode(file));
    console.log("   ", this.subtitleLoader.load(subtitleLang));
    console.log("  ▶ Відтворення розпочато!");
  }
}

export function runFacade(): void {
  console.log("\n=== FACADE ===");
  console.log("Проблема: щоб відтворити відео, треба керувати 4 підсистемами вручну.");
  console.log("Рішення: Facade приховує складність за одним методом play().\n");

  const player = new VideoPlayerFacade();
  player.play("movie.mp4", "uk");
}
