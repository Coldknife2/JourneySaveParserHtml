<script setup lang="ts">
import EditorLayout from "@/components/editor/EditorLayout.vue";
import { lightBackground } from "@/ts/visualManager";
import { writeData, readData } from "@/ts/dataManager";
import { offsets } from "@/ts/offsets";
import { randomRange } from "@/ts/math";
</script>

<template>
	<div>Symbol {{ symbolIndex }}</div>
	<EditorLayout @left-arrow="decrementSymbol" @right-arrow="incrementSymbol">
		<template #innerEditorContent>
			<div ref="symbol" class="glyphDisplay bigGlyph">
				{{ String.fromCharCode(0xE001+symbolIndex) }}
			</div>
		</template>
	</EditorLayout>
	<div :class="lightBackground + ' cursorPointer'" @click="randomSymbol">
		Random Symbol
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["returnToOverview"],
	data() {
		return {
			symbolIndex: 0
		};
	},
	mounted() {
		this.updateSymbol();
	},
	methods: {
		decrementSymbol() {
			let symbolData = readData("uint8", offsets.symbolValue) as number;
			symbolData = symbolData - 1 < 0 ? 20 : symbolData - 1;
			writeData("uint8", offsets.symbolValue, symbolData);
			this.updateSymbol();
		},
		incrementSymbol() {
			let symbolData = readData("uint8", offsets.symbolValue) as number;
			symbolData = (symbolData+1) % 21;
			writeData("uint8", offsets.symbolValue, symbolData);
			this.updateSymbol();
		},
		updateSymbol() {
			this.symbolIndex = readData("uint8", offsets.symbolValue) as number;
		},
		randomSymbol() {
			const symbolData = readData("uint8", offsets.symbolValue) as number;
			let randomData = symbolData;
			do {
				randomData = randomRange(0, 20);
			} while (symbolData === randomData);
			writeData("uint8", offsets.symbolValue, randomData);
			(this.$refs.symbol as HTMLElement).classList.add("fade");
			setTimeout(() => this.$emit("returnToOverview"), 500);
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
	animation: fade-out .5s;
	opacity: 0;
}
</style>
