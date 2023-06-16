import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const author = pkg.author;

const input = "src/index.ts";

const bundles = {
  es: "dist/bundle-es",
  cjs: "dist/bundle-cjs",
};

const banner = `
  /**
   * ${moduleName}.js
   * @summary ${pkg.description}
   * @version v${pkg.version}
   * @author  ${author}
   * @license Released under the ${pkg.license} license.
   * @copyright Paul Taiwo 2023
   */
`;

const commonPlugins = [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })];

const pluginsSetups = (bundle) => ({
  external: ["react", "react-dom"],
  plugins: bundle === bundle.es ? [...commonPlugins, terser()] : commonPlugins,
});

export default [
  // CommonJS (Node) build
  {
    input,
    output: {
      banner,
      sourcemap: "inline",
      dir: bundles.cjs,
      format: "cjs",
    },
    ...pluginsSetups(bundles.cjs),
  },

  // Minified ES module (for production)
  {
    input,
    output: {
      banner,
      sourcemap: "inline",
      dir: bundles.es,
      format: "es",
    },
    ...pluginsSetups(bundles.es),
  },
];
