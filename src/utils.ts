import readline from "readline";

export function updateProgressBar(progress: number, total: number) {
  const percent = (progress / total) * 100;
  const filledLength = Math.round((30 * progress) / total);
  const bar = "█".repeat(filledLength) + "-".repeat(30 - filledLength);

  process.stdout.write(`[${bar}] ${Math.round(percent)}%\n\n`);
}

export function Readline(controller: AbortController) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", (input) => {
    if (input.trim().toLowerCase() === "c") {
      controller.abort();
      rl.close();
    }
  });
}
