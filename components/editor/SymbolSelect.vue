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
	<div class="button-container">
		<div :class="lightBackground + ' cursorPointer button'" @click="randomSymbol">
			Random Symbol
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	emits: ["returnToOverview"],
	data() {
		return {
			saves: useSaves(),
			symbolIndex: 0,
			superseded: false
		};
	},
	mounted() {
		this.$watch("saves", () => {
			if (!this.superseded) {
				this.updateSymbol();
			} else {
				this.superseded = false;
			}
		}, { deep: true });
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
			this.superseded = true;
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
	margin-bottom: 30px;
}

.bigGlyph {
	font-size: 230px;
}

.fade {
	animation: fade-out .3s;
	opacity: 0;
}

.button-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.button {
	padding: 5px 10px;
}
</style>
