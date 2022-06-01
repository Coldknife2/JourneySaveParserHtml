<script setup lang="ts">
import PlayerDisplayItem from "@/components/PlayerDisplayItem.vue";
import PlayerDisplayHeading from "@/components/PlayerDisplayHeading.vue";
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
	}
});
</script>

<template>
	<div class="resultZone">
		<div v-if="companions.length > 0">
			<PlayerDisplayHeading :player-type="headingName" />
			<div class="companions">
				<div>
					<div v-for="player in companions.slice(0, 4)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
				</div>
				<div>
					<div v-for="player in companions.slice(4, 8)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
				</div>
			</div>
		</div>
		<div v-if="pastCompanions.length > 0">
			<PlayerDisplayHeading :use-past-cmatw="true" />
			<div class="companions">
				<div>
					<div v-for="player in pastCompanions.slice(0, 4)" :key="player.n">
						<PlayerDisplayItem :player-link="player.l" :player-name="player.n" :player-symbol="player.s" />
					</div>
				</div>
				<div>
					<div v-for="player in pastCompanions.slice(4, 8)" :key="player.n">
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
