module.exports = {
    extends: [
      "next",
      "plugin:@next/next/recommended",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        "no-console": "off",
    //   "no-console": 2,
      "import/named": 2,
      "import/namespace": 2,
      "import/default": 2,
      "import/export": "off",
      "import/no-unresolved": [2, { commonjs: true, amd: true }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  };
  