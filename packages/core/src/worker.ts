// import * as ort from "onnxruntime-web/webgpu";
import { cos_sim, pipeline } from "@xenova/transformers";
import { forceRunIdleTask, setIdleTask } from "idle-task";
import { expose } from "comlink";

// ort.env.wasm.numThreads = 1;
// ort.env.wasm.simd = true;

const importGeneratorTaskKey = setIdleTask(() => pipeline("text-generation"));
const importExtractTaskKey = setIdleTask(() => pipeline("feature-extraction"));

const maxChunks = 3;

async function getSimilarChunks(query: string, chunks: string[]) {
  const extractor = await forceRunIdleTask(importExtractTaskKey);
  const sim_results = await Promise.all(
    chunks.map(async (chunk) => {
      const output = await extractor([query, chunk], { pooling: "mean" });
      const sim = cos_sim(output[0].data, output[1].data);
      return { chunk, sim };
    }),
  );
  sim_results.sort((a, b) => b.sim - a.sim);
  return sim_results.slice(0, maxChunks).map(({ chunk }) => chunk);
}

export async function predictTextsOnWorker(text: string) {
  if (!text || text.trim().length === 0) {
    return [];
  }
  const generator = await forceRunIdleTask(importGeneratorTaskKey);
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: text },
  ];
  const output = await generator(messages, {
    return_full_text: false,
    temperature: 0,
    max_new_tokens: 128,
  });
  return output[0].generated_text;
}

expose(predictTextsOnWorker);
