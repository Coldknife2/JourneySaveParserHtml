import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";

export default defineConfig({
	plugins: [vue()],
	server: {
		port: 5000
	},
	resolve: {
		extensions: [".ts", ".css"],
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				editor: resolve(__dirname, "editor/index.html"),
				stats: resolve(__dirname, "stats/index.html"),
				about: resolve(__dirname, "about/index.html")
			}
		},
		emptyOutDir: true
	}
});
