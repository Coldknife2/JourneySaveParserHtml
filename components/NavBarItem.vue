<script setup lang="ts">
defineProps<{
	link: string
	displayName: string
}>();
</script>

<template>
	<div>
		<NuxtLink :to="link" @click="clear" @dragstart.prevent>{{ displayName }}</NuxtLink>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	emits: ["retract"],
	data() {
		return {
			displayDropZone: useDisplayDropZone()
		};
	},
	methods: {
		clear() {
			if (this.$route.path === this.link && this.$route.path !== "/about/") {
				this.displayDropZone = true;
			}
			this.$emit("retract");
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
