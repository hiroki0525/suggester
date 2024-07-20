"use client";

import { ChangeEventHandler, startTransition, useState } from "react";
import { predictTexts } from "@suggester/core";

// const taskKey = setIdleTask(() => import("@suggester/core"));

export default function Input() {
  const [predictValue, setPredictValue] = useState("");

  const changeHandler: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const targetValue = e.target.value;
    // const { predictTexts } = await forceRunIdleTask(taskKey);
    const res = await predictTexts(targetValue);
    startTransition(() => setPredictValue(res[0]));
  };

  return (
    <input type="text" onChange={changeHandler} placeholder={predictValue} />
  );
}
