import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import zip from "rollup-plugin-zip";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      inlineDynamicImports: true,
      // minifyInternalExports: true,
      compact: true,
      sourcemap: true,
    },
    {
      dir: "dist",
      format: "cjs",
      plugins: [
        zip({
          file: "target.zip",
        }),
      ],
      minifyInternalExports: true,
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      sourceMap: true,
    }),
    commonjs(),
    json(),
    resolve({
      preferBuiltins: false,
    }),
    terser(),
  ],
  preserveEntrySignatures: false,
};
