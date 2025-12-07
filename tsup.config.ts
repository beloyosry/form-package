import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false, // Keep it readable for debugging

    // Mark all peer dependencies and heavy dependencies as external
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

    // Bundle these smaller utility libraries
    noExternal: ["clsx", "class-variance-authority", "tailwind-merge"],

    esbuildOptions(options) {
        options.jsx = "automatic";
        options.platform = "neutral";
        // Ensure proper module resolution
        options.conditions = ["module", "import", "require", "default"];
    },

    // Copy CSS to dist folder
    async onSuccess() {
        const fs = require("fs");
        const path = require("path");

        const srcCSS = path.join(__dirname, "src/styles/styles.css");
        const distCSS = path.join(__dirname, "dist/styles.css");

        if (fs.existsSync(srcCSS)) {
            fs.copyFileSync(srcCSS, distCSS);
            console.log("✓ Copied styles.css to dist/");
        }
    },
});
