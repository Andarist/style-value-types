import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

const typescriptConfig = { cacheRoot: 'tmp/.rpt2_cache' };
const noDeclarationConfig = Object.assign({}, typescriptConfig, {
  tsconfigOverride: { compilerOptions: { declaration: false } }
});

const config = {
  input: 'src/index.ts'
};

const umd = Object.assign({}, config, {
  output: {
    file: 'dist/style-value-types.js',
    format: 'umd',
    name: 'valueTypes',
    exports: 'named'
  },
  plugins: [typescript(noDeclarationConfig)]
});

const umdProd = Object.assign({}, umd, {
  output: Object.assign({}, umd.output, {
    file: 'dist/style-value-types.min.js'
  }),
  plugins: [typescript(noDeclarationConfig), uglify()]
});

const es = Object.assign({}, config, {
  output: {
    file: 'dist/style-value-types.es.js',
    format: 'es',
    exports: 'named'
  },
  plugins: [typescript(noDeclarationConfig)]
});

const cjs = Object.assign({}, config, {
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [typescript(typescriptConfig)]
});

export default [umd, umdProd, es, cjs];
