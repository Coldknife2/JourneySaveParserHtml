<script setup lang="ts">
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

function routeToTitle(route: string) {
	switch(route) {
		case "/about/":
			return "About";
		case "/":
			return "Journey Parser";
		case "/stats/":
			return "Journey Statistics";
		case "/editor/":
			return "Journey Editor";
	}
}

useHead({
	bodyAttrs: {
		class: setBackground()
	}
});
</script>

<template>
	<Title>{{ routeToTitle($route.path) }}</Title>
	<NavBar />
	<NuxtPage v-if="$route.path === '/about/' || !displayDropZone" />
	<DropZone v-else />
</template>
