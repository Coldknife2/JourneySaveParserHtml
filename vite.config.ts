import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";

export default defineConfig({
	plugins: [vue()],
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
				journeyEditor: resolve(__dirname, "journeyEditor/index.html"),
				about: resolve(__dirname, "about/index.html")
			}
		},
		emptyOutDir: true
	}
});
