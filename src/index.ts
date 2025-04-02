import { CancelledError, InvalidInputError } from "./CustomError.js";
import { Readline, updateProgressBar } from "./utils.js";

const DELAY_TIME = 1; // (secs)

async function processWithDelay(
  numbers: number[],
  abortSignal: AbortSignal
): Promise<void> {
  if (!Array.isArray(numbers))
    throw new InvalidInputError("Input must be an array of numbers.");

  if (!numbers.every((num) => typeof num === "number"))
    throw new InvalidInputError("Input must be an array of numbers.");

  if (numbers.length === 0) {
    console.log("No numbers to process.");
    return Promise.resolve();
  }

  for (let i = 0; i < numbers.length; i++) {
    await new Promise<void>((resolve, reject) => {
      const timerId = setTimeout(() => {
        console.log(numbers[i]);
        updateProgressBar(i + 1, numbers.length);
        resolve();
      }, DELAY_TIME * 1000);
      abortSignal.addEventListener("abort", () => {
        clearTimeout(timerId);
        reject(new CancelledError("Process was canceled."));
      });
    });
  }

  console.log("All numbers processed.");
}

//--------------------------------------------------------------

const controller = new AbortController();
const signal = controller.signal;

Readline(controller);

try {
  processWithDelay([1, 2, 3, 4, 5], signal);
} catch (e) {
  console.error(e);
}

console.log("Press 'c' + enter to cancel the process...");
