import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    target: "es2020",

    lib: {
      entry: "src/my-accordian.ts",
      formats: ["es"]
    },
    rollupOptions: {
      external: [/^lit/]
    }
  }
});
