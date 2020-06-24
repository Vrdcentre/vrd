module.exports = {
  parser: `babel-eslint`,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    `ghost`,
    `react`,
    `node`,
    `promise`,
    `import`,
    `standard`,
  ],
  extends: [
    `plugin:ghost/node`,
    `plugin:ghost/ember`,
    `plugin:react/recommended`,
    `plugin:promise/recommended`,
    `plugin:jsx-a11y/recommended`,
    `eslint:recommended`,
  ],
  settings: {
    react: {
      createClass: `createReactClass`,
      pragma: `React`,
      version: `16.13.1`,
      flowVersion: `0.53`,
    },
    propWrapperFunctions: [`forbidExtraProps`],
  },
  env: {
    node: true,
  },
  rules: {
    "ghost/sort-imports-es6-autofix/sort-imports-es6": 0,
    "ghost/ember/use-ember-get-and-set": 0,
    "no-console": `off`,
    indent: [
      `error`, 2,
    ],
    "no-inner-declarations": `off`,
    "valid-jsdoc": `off`,
    "require-jsdoc": `off`,
    quotes: [
      `error`, `backtick`,
    ],
    "consistent-return": [`error`],
    "arrow-body-style": [
      `error`,
      `as-needed`, {
        requireReturnForObjectLiteral: true,
      },
    ],
    "jsx-a11y/alt-text": [
      1, {
        elements: [
          `img`, `object`, `area`, `input[type="image"]`,
        ],
        img: [`Image`],
        object: [`Object`],
        area: [`Area`],
        "input[type=\"image\"]": [`InputImage`],
      },
    ],
    "jsx-quotes": [
      `error`, `prefer-double`,
    ],
    semi: [
      `error`, `never`,
    ],
    "object-curly-spacing": [
      `error`, `always`,
    ],
    "comma-dangle": [
      `error`, {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
        functions: `ignore`,
      },
    ],
    "react/prop-types": [
      `warn`, {
        ignore: [`children`],
      },
    ],
  },
}
