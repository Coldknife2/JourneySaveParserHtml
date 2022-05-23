<script setup lang="ts">
import { lightBackground } from "@/ts/visualManager";
defineProps({
	playerLink: {
		type: String,
		required: true
	},
	playerSymbol: {
		type: Number,
		required: true
	},
	playerName: {
		type: String,
		required: true
	}
});
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
		<div class="playerDisplay">
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
