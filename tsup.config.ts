import { defineConfig } from "tsup";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

export default defineConfig({
    entry: {
        index: "src/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: false, // CRITICAL: Keep false to preserve exports
    minify: false,
    external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-hook-form",
        "react-router-dom",
        "lucide-react",
        "react-phone-input-2",
    ],
    noExternal: ["clsx", "class-variance-authority", "tailwind-merge"],
    esbuildOptions(options) {
        options.jsx = "automatic";
        options.platform = "neutral";
        options.mainFields = ["module", "main"];
        options.treeShaking = false;
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
