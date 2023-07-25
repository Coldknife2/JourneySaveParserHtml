<template>
	<StatsItemRow
		v-for="lvl in muralData.length"
		:key="lvl"
		:row-name="levelNames[lvl-1]"
	>
		<template #rowContent>
			<StatsHoverItem
				v-for="mural in muralData[lvl-1].length"
				:key="mural"
				:unlocked="muralData[lvl-1][mural-1]"
				:index="[1, lvl-1, mural-1]"
				:symbol="0xF116"
			/>
		</template>
	</StatsItemRow>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			muralData: new Array<Array<boolean>>(),
			saves: useSaves()
		};
	},
	mounted() {
		this.extractMuralData();
	},
	methods: {
		extractMuralData() {
			const lengths = [1, 1, 2, 2, 1, 1, 2];
			const murals = (readData(this.saves, "u8", offsets.muralValue) as number).toString(2).padStart(8, "0");
			const muralsSnow = (readData(this.saves, "u8", offsets.muralValueSnow) as number).toString(2).padStart(2, "0");
			const allMurals = (muralsSnow + murals).split("").map(Number).map(Boolean).reverse();
			let index = 0;
			for (let i=0; i<7; i++) {
				this.muralData.push(allMurals.slice(index, index+lengths[i]));
				index += lengths[i];
			}
		}
	}
});
</script>
