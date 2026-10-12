import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "coverage/**", "website/public/**"] },
  {
    files: ["website/app.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        location: "readonly",
        navigator: "readonly",
      },
    },
  },
  {
    files: ["website/*.mjs"],
    languageOptions: { globals: { URL: "readonly" } },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { console: "readonly" },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
