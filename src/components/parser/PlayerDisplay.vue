<script setup lang="ts">
defineProps({
	headingName: {
		type: String,
		default: "Companions"
	},
	companions: {
		type: [Object],
		default() {
			return [];
		}
	},
	pastCompanions: {
		type: [Object],
		default() {
			return [];
		}
	},
	slicePosition: {
		type: Number,
		default: 4
	}
});
</script>

<template>
	<div class="resultZone">
		<div v-if="companions.length > 0">
			<PlayerDisplayHeading :player-type="headingName" />
			<div class="companions">
				<div>
					<div v-for="player in companions.slice(0, slicePosition)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
				</div>
				<div>
					<div v-for="player in companions.slice(slicePosition, companions.length)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
				</div>
			</div>
		</div>
		<div v-if="pastCompanions.length > 0">
			<PlayerDisplayHeading :player-type="headingName" :use-past-cmatw="true" />
			<div class="companions">
				<div>
					<div v-for="player in pastCompanions.slice(0, slicePosition)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
				</div>
				<div>
					<div v-for="player in pastCompanions.slice(slicePosition, pastCompanions.length)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
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
