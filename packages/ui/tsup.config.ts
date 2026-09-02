import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
  external: [
    /^@base-ui\/react/,
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@mithunsalinda/veyqor-tokens",
  ],
  loader: {
    ".css": "local-css",
  },
});
