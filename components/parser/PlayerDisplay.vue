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
			<ParserPlayerDisplayHeading :player-type="headingName" />
			<div class="companions">
				<div v-for="i in [0, 1]" :key="i">
					<ParserPlayerDisplayItem
						v-for="player in companions.slice([0, slicePosition][i], [slicePosition, companions.length][i])" :key="player.n"
						:player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
				</div>
			</div>
		</div>
		<div v-if="pastCompanions.length > 0">
			<ParserPlayerDisplayHeading :player-type="headingName" :use-past-cmatw="true" />
			<div class="companions">
				<div v-for="i in [0, 1]" :key="i">
					<ParserPlayerDisplayItem
						v-for="player in pastCompanions.slice([0, slicePosition][i], [slicePosition, pastCompanions.length][i])" :key="player.n"
						:player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.resultZone {
	margin-bottom: 10px;
	margin-left: 16%;
	margin-top: 10vh;
	max-width: 90%;
}

.companions {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	font-size: 3vh;
	height: 100%;
	width: 100%;
}
</style>
