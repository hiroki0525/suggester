/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // https://github.com/chroma-core/chroma/issues/1178#issuecomment-2166977134
        if (!isServer) {
            // Fixes npm packages that depend on `fs` module
            config.resolve.fallback.fs = false;
        }

        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });

        // https://github.com/microsoft/onnxruntime-nextjs-template/blob/60c0254beb2277431e96f15ec6613d781c2ad294/next.config.js
        // config.plugins.push(
        //     new CopyPlugin({
        //         patterns: [
        //             {
        //                 from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
        //                 to: 'static/chunks/pages',
        //             },             {
        //                 from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
        //                 to: 'static/chunks/pages',
        //             },
        //             // {
        //             //     from: './model',
        //             //     to: 'static/chunks/pages',
        //             // },
        //         ],
        //     }),
        // );

        return config;
    },
};

export default nextConfig;
