module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'jsx-a11/label-has-associated-control': 'off',
    // 'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'linebreak-style': [2, 'windows'],
    'max-len': ['error', 110],
  },
};
