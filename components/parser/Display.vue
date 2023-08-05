<script setup lang="ts">
import { Companions } from "utils/interfaces";

interface Props {
	headingName?: string
	companions?: Array<Companions>
	pastCompanions?: Array<Companions>
	slicePosition?: number
}

withDefaults(defineProps<Props>(), {
	headingName: "Companions",
	companions: () => new Array<Companions>(),
	pastCompanions: () => new Array<Companions>(),
	slicePosition: 4
});
</script>

<template>
	<div class="resultZone">
		<div v-if="companions.length > 0">
			<ParserDisplayHeading :player-type="headingName" />
			<div class="companions">
				<div v-for="i in [0, 1]" :key="i" class="companion--wrapper">
					<ParserDisplayItem
						v-for="player, j in companions.slice([0, slicePosition][i], [slicePosition, companions.length][i])"
						:key="`companions-${j}`"
						:player-link="player.l"
						:player-name="player.n"
						:player-symbol="player.s"
					/>
				</div>
			</div>
		</div>
		<div v-if="pastCompanions.length > 0">
			<ParserDisplayHeading :player-type="headingName" :use-past-cmatw="true" />
			<div class="companions">
				<div v-for="i in [0, 1]" :key="i" class="companion--wrapper">
					<ParserDisplayItem
						v-for="player, j in pastCompanions.slice([0, slicePosition][i], [slicePosition, pastCompanions.length][i])"
						:key="`pastCompanions-${j}`"
						:player-link="player.l"
						:player-name="player.n"
						:player-symbol="player.s"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.resultZone {
	padding: 160px 0 10px 16%;
	max-width: 90%;
}

.companions {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	font-size: var(--font-size--default);
	height: 100%;
	width: 100%;
}

.companion--wrapper {
	flex-basis: 40%;
}
</style>
