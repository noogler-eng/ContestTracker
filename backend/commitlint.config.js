module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'subject-empty': [2, 'never'],  // Prevent empty commit subjects
      'type-empty': [2, 'never'],     // Prevent empty commit types
      'header-max-length': [2, 'always', 100]  // Allow longer messages (default 72)
    }
  };