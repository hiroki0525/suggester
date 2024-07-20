"use client";

import { ChangeEventHandler, startTransition, useId, useState } from "react";
import { forceRunIdleTask, setIdleTask } from "idle-task";

const taskKey = setIdleTask(() => import("@suggester/core"));

export default function Input() {
  const listId = useId();
  const [predictValues, setPredictValues] = useState([]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const targetValue = e.target.value;
    const { predictTexts } = await forceRunIdleTask(taskKey);
    const res = await predictTexts(targetValue);
    console.log(res);
    startTransition(() => setPredictValues(res));
  };

  return (
    <>
      <input
        className="w-96 p-4 rounded-md"
        type="search"
        onChange={changeHandler}
        list={listId}
      />
      <datalist id={listId}>
        {predictValues.map((value) => (
          <option key={value} value={value} />
        ))}
      </datalist>
    </>
  );
}
