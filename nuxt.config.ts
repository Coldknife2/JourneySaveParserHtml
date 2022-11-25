import { fileURLToPath, URL } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript : {
		typeCheck: "build",
		strict: true
	},
	alias: {
		"utils": fileURLToPath(new URL("./utils", import.meta.url)),
		"css": fileURLToPath(new URL("./assets/css", import.meta.url)),
		"images": fileURLToPath(new URL("./assets/images", import.meta.url))
	},
	css: [
		"css/style.css"
	],
	ssr: false
});
