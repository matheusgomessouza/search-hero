import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [react(), tsconfigPaths()],
		define: {
			'process.env.MARVEL_PV_KEY': JSON.stringify(
				env.VITE_MARVEL_PRIVATE_KEY || env.MARVEL_PV_KEY || '',
			),
			'process.env.MARVEL_PB_KEY': JSON.stringify(
				env.VITE_MARVEL_PUBLIC_KEY || env.MARVEL_PB_KEY || '',
			),
		},
		server: {
			port: 5173,
			open: true, // Abre o browser automaticamente
			host: true, // Permite acesso externo (útil para testes em rede local)
		},
		build: {
			outDir: 'dist',
			sourcemap: true, // Sourcemaps para debug em produção
			// Otimizações de build
			rollupOptions: {
				output: {
					manualChunks: (id: string) => {
						if (id.includes('node_modules')) {
							if (
								id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('react-router-dom')
							) {
								return 'react-vendor';
							}
							if (id.includes('styled-components') || id.includes('swiper')) {
								return 'ui-vendor';
							}
							return 'vendor';
						}
					},
				},
			},
		},
		// Otimizações de performance
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-router-dom', 'styled-components'],
		},
	};
});
