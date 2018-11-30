module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
  },

  rules: {
    semi: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
  },
};
