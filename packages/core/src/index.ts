import { Remote, wrap } from "comlink";
import { predictTextsOnWorker } from "./worker";

let func: Remote<(text: string) => Promise<string[]>>;

export async function predictTexts(text: string) {
  if (!func) {
    func = wrap<typeof predictTextsOnWorker>(
      new Worker(new URL("./worker", import.meta.url)),
    );
  }
  return func(text);
}
