import { readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const tokensSource = resolve("../../packages/tokens/dist/styles.css");
const baseSource = resolve("src/styles/styles.css");
const bundledCssSource = resolve("dist/index.css");
const bundledCssMapSource = resolve("dist/index.css.map");
const target = resolve("dist/styles.css");

const readOptionalFile = async (path) => {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return "";
    }

    throw error;
  }
};

const [tokensCss, baseCss, bundledCss] = await Promise.all([
  readFile(tokensSource, "utf8"),
  readFile(baseSource, "utf8"),
  readOptionalFile(bundledCssSource),
]);

await mkdir(dirname(target), { recursive: true });
await writeFile(target, `${tokensCss}\n\n${baseCss}\n\n${bundledCss}`, "utf8");
await rm(bundledCssSource, { force: true });
await rm(bundledCssMapSource, { force: true });
