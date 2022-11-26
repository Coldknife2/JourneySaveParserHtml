<template>
	<div class="navbar" :class="{ navbarOffsetRetracted: !isDisplayed, navbarOffsetExpanded: isDisplayed }">
		<div class="flex">
			<NavBarItem
				v-for="path in paths" :key="path.n"
				:link="path.p"
				:display-name="path.n"
				@retract="isDisplayed = false"
			/>
		</div>
		<div class="center">
			<img
				:style="{ transform: (isDisplayed ? 'rotate(90deg)' : 'rotate(270deg)') }"
				src="~images/arrows/arrow1L.svg"
				alt="Expand Navigation Bar"
				@click="isDisplayed = !isDisplayed"
				@dragstart.prevent
			>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			isDisplayed: false,
			paths: [
				{ p: "/editor/", n: "Editor" },
				{ p: "/stats/",  n: "Statistics" },
				{ p: "/",        n: "Parser" },
				{ p: "/about/",  n: "About" },
			]
		};
	}
});
</script>

<style scoped>
img {
	transform: rotate(270deg);
	transition: transform 0.3s;
	width: 4vh;
}

.center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.navbar {
	position: fixed;
	min-width: 100vw;
	width: 100vw;
}

.navbarOffsetExpanded {
	top: 0vh;
	transition: top 0.6s;
}

.navbarOffsetRetracted {
	top: -4vh;
	transition: top 0.6s;
}

.flex {
	display: flex;
	justify-content: space-evenly;
	text-align: center;
}
</style>
