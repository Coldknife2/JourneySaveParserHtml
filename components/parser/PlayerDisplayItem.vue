<script setup lang="ts">
const lightBackground = useLightBackground();

defineProps<{
	playerLink: string
	playerSymbol: number
	playerName: string
}>();
</script>

<template>
	<a
		:class="lightBackground"
		:href="playerLink"
		target="_blank"
		@dragstart.prevent
	>
		<div class="glyphDisplay">
			{{ String.fromCharCode(playerSymbol) }}
		</div>
		<div class="playerDisplay enableSelection">
			{{ playerName }}
		</div>
	</a>
</template>

<style scoped>
a {
	color: #ffffff;
	display: flex;
	margin-bottom: 1vh;
	text-decoration: unset;
}

.playerDisplay {
	display: inline-block;
	margin: 10px;
	width: 29vw;
}
</style>
