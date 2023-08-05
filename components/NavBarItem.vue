<script setup lang="ts">
defineProps<{
	link: string
	displayName: string
}>();
const lightBackground = useLightBackground();
</script>

<template>
	<div>
		<NuxtLink
			:to="link"
			:class="'item ' + lightBackground"
			@click="clear"
			@dragstart.prevent
		>
			<template v-if="$route.fullPath == link">
				<u>{{ displayName }}</u>
			</template>
			<template v-else>
				{{ displayName }}
			</template>
		</NuxtLink>
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
	font-size: var(--font-size--default);
	text-decoration: none;
}

.item {
	padding: 0 10px;
}
</style>
