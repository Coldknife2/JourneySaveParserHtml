import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";
import Components from "unplugin-vue-components/vite";
import {
	AntDesignVueResolver,
	ElementPlusResolver,
	VantResolver,
} from "unplugin-vue-components/resolvers";

export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [
				AntDesignVueResolver(),
				ElementPlusResolver(),
				VantResolver(),
			]
		})
	],
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
		emptyOutDir: true,
		assetsInlineLimit: 3072
	}
});
