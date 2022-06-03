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
			<div class="glyphDisplay bigGlyph">
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
			let symbolData = readData("uint8", offsets.symbol_value) as number;
			symbolData = symbolData - 1 < 0 ? 20 : symbolData - 1;
			writeData("uint8", offsets.symbol_value, symbolData);
			this.updateSymbol();
		},
		incrementSymbol() {
			let symbolData = readData("uint8", offsets.symbol_value) as number;
			symbolData = (symbolData+1) % 21;
			writeData("uint8", offsets.symbol_value, symbolData);
			this.updateSymbol();
		},
		updateSymbol() {
			this.symbolIndex = readData("uint8", offsets.symbol_value) as number;
		},
		randomSymbol() {
			const symbolData = readData("uint8", offsets.symbol_value) as number;
			let randomData = randomRange(0, 20);
			while (symbolData === randomData) {
				randomData = randomRange(0, 20);
			}
			writeData("uint8", offsets.symbol_value, randomData);
			this.updateSymbol();

		}
	}
});
</script>

<style scoped>
div {
	display: flex;
	justify-content: center;
	margin-bottom: 2vh;
}

.bigGlyph {
  font-size: 3.5em;
}
</style>
