import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false, // Don't minify to preserve structure
    external: [
        "react",
        "react-dom",
        "react-hook-form",
        "react-phone-input-2",
        "lucide-react",
        "date-fns",
    ],
    esbuildOptions(options) {
        options.jsx = "automatic";
        options.banner = {
            js: '"use client";',
        };
    },
});
