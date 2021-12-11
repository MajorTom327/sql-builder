import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
import tsTreeshaking from 'rollup-plugin-ts-treeshaking';

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  plugins: [
    tsTreeshaking()
  ],
  input: './dist/index.js',
  output: {
      dir: 'dist',
  }
});