import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,   // ← Not a function — just spread the array
  {
    rules: {
      "prefer-const": "off",
    },
  },
];
