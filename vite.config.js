import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                exp: resolve(__dirname, 'exp/index.html'),
            },
        },
    },
    server: {
        proxy: {
            "/exp": {
                target: "http://localhost:5173/exp", // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
                rewrite: (path) => path+='/index.html', // 重写 api 为 空，就是去掉它
            },
        },
    }
})
