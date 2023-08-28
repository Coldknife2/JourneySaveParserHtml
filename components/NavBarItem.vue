<script setup lang="ts">
defineProps<{
	link: string
	displayName: string
}>();
defineEmits(["retract"]);
const lightBackground = useLightBackground();
</script>

<template>
	<div>
		<NuxtLink
			:to="link"
			:class="'item ' + lightBackground"
			@click="$emit('retract')"
			@dragstart.prevent
		>
			<template v-if="$route.fullPath === link">
				<u>{{ displayName }}</u>
			</template>
			<template v-else>
				{{ displayName }}
			</template>
		</NuxtLink>
	</div>
</template>

<style scoped>
div {
	flex-basis: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

a,
a:visited {
	color: var(--color-text);
	font-size: var(--font-size--default);
	text-decoration: none;
}

.item {
	padding: 0 10px;
}
</style>
