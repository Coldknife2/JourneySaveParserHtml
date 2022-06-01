<script setup lang="ts">
import NavBarItem from "@/components/NavBarItem.vue";
defineProps({
	path: {
		type: String,
		default: "null"
	}
});
</script>

<template>
	<div class="navbar" :class="{ navbarOffsetRetracted: !isDisplayed, navbarOffsetExpanded: isDisplayed }">
		<div class="flex">
			<slot name="editorLink" />
			<NavBarItem
				link="/"
				display-name="Journey Parser"
				:path="path"
				@dragstart.prevent
			/>
			<NavBarItem
				link="about/"
				display-name="About"
				:path="path"
				@dragstart.prevent
			/>
		</div>
		<div class="center">
			<img
				:style="{ transform: (isDisplayed ? 'rotate(90deg)' : 'rotate(270deg)') }"
				src="@/images/arrows/arrow1L.svg"
				alt="Expand Navigation Bar"
				@click="toggleNavbar"
				@dragstart.prevent
			>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["preserveData"],
	data() {
		return {
			isDisplayed: false
		};
	},
	methods: {
		toggleNavbar() {
			this.isDisplayed = !this.isDisplayed;
		}
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
