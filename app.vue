<script setup lang="ts">
import { sym } from "images";

const lightBackground = useLightBackground();
const displayDropZone = useDisplayDropZone();

function setBackground() {
	if (Math.random() > (1 - squarePolynomial(new Date().getHours(), -0.00694444, 0.1666666))) {
		lightBackground.value += " hovLight";
		return "light";
	} else {
		return "dark";
	}
}

useHead({
	bodyAttrs: {
		class: setBackground()
	},
	meta: [

	],
	link: [
		{ rel: "icon", type: "image/svg+xml", href: sym }
	]
});
</script>

<template>
	<NavBar />
	<NuxtPage v-if="$route.path === '/about/' || !displayDropZone" />
	<DropZone v-else />
</template>
