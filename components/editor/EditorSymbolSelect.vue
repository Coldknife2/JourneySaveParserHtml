<script setup lang="ts">
const lightBackground = useLightBackground();
</script>

<template>
	<div>Symbol {{ symbolIndex }}</div>
	<EditorLayout @left-arrow="changeSymbol(0)" @right-arrow="changeSymbol(1)">
		<template #innerEditorContent>
			<div ref="symbol" class="glyphDisplay bigGlyph">
				{{ String.fromCharCode(0xF101+symbolIndex) }}
			</div>
		</template>
	</EditorLayout>
	<div :class="lightBackground + ' cursorPointer'" @click="randomSymbol">
		Random Symbol
	</div>
</template>

<script lang="ts">
export default defineComponent({
	emits: ["returnToOverview"],
	data() {
		return {
			symbolIndex: 0,
			saves: useSaves()
		};
	},
	mounted() {
		this.updateSymbol();
	},
	methods: {
		changeSymbol(mode: number) {
			let symbolData = readData(this.saves, "u8", offsets.symbolValue) as number;
			symbolData = mode === 0 ? --symbolData : ++symbolData;
			symbolData = wrap(0, 20, symbolData);
			writeData(this.saves, "u8", offsets.symbolValue, symbolData);
			this.updateSymbol();
		},
		updateSymbol() {
			this.symbolIndex = readData(this.saves, "u8", offsets.symbolValue) as number;
		},
		randomSymbol() {
			const symbolData = readData(this.saves, "u8", offsets.symbolValue) as number;
			let randomData = symbolData;
			do {
				randomData = randomInt(0, 20);
			} while (symbolData === randomData);
			writeData(this.saves, "u8", offsets.symbolValue, randomData);
			(this.$refs.symbol as HTMLElement).classList.add("fade");
			setTimeout(() => this.$emit("returnToOverview"), 300);
		}
	}
});
</script>

<style scoped>
@keyframes fade-out {
	0% { opacity: 1; }
	100% { opacity: 0; }
}

div {
	display: flex;
	justify-content: center;
	margin-bottom: 2vh;
}

.bigGlyph {
  font-size: 3.5em;
}

.fade {
	animation: fade-out .3s;
	opacity: 0;
}
</style>
