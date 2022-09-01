import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: [
    {
      format: "umd",
      name: "c-tracker",
      file: "dist/bundle.umd.js",
    },
  ],
  external: [],
  plugins: [
    terser(),
    // Compile TypeScript files
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),
    babel({
      // babelHelpers: "bundled",
      babelHelpers: "runtime",
      extensions: [".js", ".ts"],
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
            },
          },
        ],
      ],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
    }),
  ],
};
