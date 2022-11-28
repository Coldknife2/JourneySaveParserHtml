<template>
	<StatsSectionItem>
		<template #innerSectionContent>
			<StatsSectionHeading section-heading="Symbols" />
			<StatsItemRow
				v-for="lvl in symbolData.length"
				:key="lvl"
				:row-name="levelNames[lvl-1]"
			>
				<template #rowContent>
					<StatsHoverItem
						v-for="glyph in symbolData[lvl-1].length"
						:key="glyph"
						:unlocked="symbolData[lvl-1][glyph-1]"
						:index="[0, lvl-1, glyph-1]"
						:symbol="0xF101+randomSymbols[lvl-1][glyph-1]"
					/>
				</template>
			</StatsItemRow>
		</template>
	</StatsSectionItem>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			symbolData: new Array<Array<boolean>>(),
			randomSymbols: new Array<Array<number>>(),
			saves: useSaves()
		};
	},
	mounted() {
		this.extractSymbolData();
		this.makeRandomSymbols();
	},
	methods: {
		extractSymbolData() {
			const lengths = [3, 3, 4, 3, 4, 4];
			for (let i=0; i<6; i++) {
				const data = (readData(this.saves, "u8", offsets.glyphValue+offsets.glyphOffset*i) as number).toString(2);
				const dataSplit = data.split("").map(Number).map(Boolean);
				while (dataSplit.length < lengths[i]) {
					dataSplit.unshift(false);
				}
				this.symbolData.push(dataSplit);
			}
		},
		makeRandomSymbols() {
			const symbols = shuffle([...Array(21).keys()]);
			for (let i=0; i<6; i++) {
				let k = i > 3 || i == 2 ? 4 : 3;
				let l = [];
				for (let j = 0; j<k; j++) {
					l.push(symbols.pop());
				}
				this.randomSymbols.push(l);
			}
		}
	}
});
</script>
