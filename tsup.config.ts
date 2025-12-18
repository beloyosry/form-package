// tsup.config.ts
import { defineConfig } from "tsup";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

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
        "react-phone-input-2/lib/style.css",
        "lucide-react",
        "date-fns",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
    ],
    esbuildOptions(options) {
        options.jsx = "automatic";
    },
    onSuccess: async () => {
        const srcCSS = join(process.cwd(), "src/styles/styles.css");
        const distCSS = join(process.cwd(), "dist/styles.css");

        if (existsSync(srcCSS)) {
            copyFileSync(srcCSS, distCSS);
            console.log("✓ Copied styles.css to dist/");
        }
    },
});
