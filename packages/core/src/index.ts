import { pipeline, TextGenerationOutput } from "@xenova/transformers";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { forceRunIdleTask, setIdleTask } from "idle-task";

const taskKey = setIdleTask(() => pipeline("text-generation"));

export async function predictTexts(text: string) {
  if (!text || text.trim().length === 0) {
    return [];
  }
  const pipe = await forceRunIdleTask(taskKey);
  const results = await pipe(text, {
    return_full_text: true,
    temperature: 0,
  });
  return (results as TextGenerationOutput).map(
    ({ generated_text }) => generated_text,
  ) as string[];
}
