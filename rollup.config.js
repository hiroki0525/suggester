import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const outputFormats = ["cjs", "es"];

const productionConfigs = outputFormats.map((format) => ({
  input: "src/index.ts",
  output: [
    {
      file: `index.${format === "es" ? "js" : "cjs"}`,
      format,
      compact: true,
    },
  ],
  plugins: [typescript(), terser()],
}));

export default productionConfigs;
