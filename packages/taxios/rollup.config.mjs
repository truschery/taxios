import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/taxios.min.js',
            format: 'es',
            plugins: [
                typescript(),
                terser({
                    compress: {
                        drop_console: false,
                        drop_debugger: true,
                        pure_funcs: ['console.log'],
                        passes: 2
                    },
                    mangle: {
                        toplevel: true,
                        keep_fnames: false,
                    },
                    format: {
                        comments: true
                    }
                }),
                
            ]
        }
    ],

};