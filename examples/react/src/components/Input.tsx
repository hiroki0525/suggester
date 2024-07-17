"use client";

import { useEffect, useState } from "react";

export default function Input() {
  const [value, setValue] = useState("");
  const [predictValue, setPredictValue] = useState("");

  useEffect(() => {
    (async () => {
      const { predictTexts } = await import("@suggester/core");
      const res = await predictTexts(value);
      console.log(res);
    })();
  }, []);

  return (
    <input
      type="text"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
