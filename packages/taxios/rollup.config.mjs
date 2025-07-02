import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'dist/index.js',
    output: [
        {
            file: 'dist/taxios.min.js',
            format: 'es',
            plugins: [
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