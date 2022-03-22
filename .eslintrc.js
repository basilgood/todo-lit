const env = {
  browser: true,
  es2021: true,
};

const parserOptions = {
  ecmaVersion: 13,
  sourceType: 'module',
};

const rules = {};

export default {
  env,
  extends: ['airbnb-base'],
  parserOptions,
  rules,
};
