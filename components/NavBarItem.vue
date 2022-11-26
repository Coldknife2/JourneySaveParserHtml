<script setup lang="ts">
defineProps({
	link : {
		type: String,
		required: true
	},
	displayName : {
		type: String,
		required: true
	}
});
</script>

<template>
	<div>
		<NuxtLink :to="link" @click="clear" @dragstart.prevent>{{ displayName }}</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["retract"],
	methods: {
		clear() { // todo
			if (this.$route.path === this.link) {
				// clear the current useState, or set ready to false
			}
			this.$emit("retract"); // todo retract with timeout?
		}
	}
});
</script>

<style scoped>
div {
	flex-basis: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

a,
a:visited {
	color: #ffffff;
	font-size: 3vh;
	text-decoration: none;
}
</style>
