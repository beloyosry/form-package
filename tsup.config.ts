import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-hook-form",
        "react-phone-input-2",
        "lucide-react",
        "date-fns",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
    ],
    esbuildOptions(options) {
        options.jsx = "automatic";
    },
});
