import { pipeline } from "@xenova/transformers";

export async function predictTexts(text: string) {
  const pipe = await pipeline("text-generation");
  return pipe(text, {
    return_full_text: true,
    temperature: 0,
  });
}
