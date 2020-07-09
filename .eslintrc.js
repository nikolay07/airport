module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    "no-console": 0,
    "import/prefer-default-export": 0,
    "prefer-template": 0,

    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
};
