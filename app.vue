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

initializeSaves();
useHead({
	bodyAttrs: {
		class: setBackground()
	},
	meta: [

	],
	link: [
		{ rel: "icon", type: "image/svg+xml", href: sym[randomInt(0, 20)] }
	]
});
</script>

<template>
	<NavBar />
	<DropZone v-if="displayDropZone" />
	<NuxtPage v-else />
</template>
