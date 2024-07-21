import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const outputFormats = ["cjs", "es"];

const productionConfigs = outputFormats.map((format) => ({
  input: ["src/index.ts", "src/worker.ts"],
  output: [
    {
      format,
      compact: true,
      dir: "dist",
      // entryFileNames: `[name].${format === "es" ? "js" : "cjs"}`,
    },
  ],
  plugins: [typescript(), terser()],
}));

export default productionConfigs;
