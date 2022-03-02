// Using `config` because of https://github.com/microsoft/TypeScript/issues/47107

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        target: 'es2020',
        format: 'esm',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
};

export default config;
