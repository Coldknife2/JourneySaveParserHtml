<script setup lang="ts">
import EditorLayout from "./EditorLayout.vue";
import { writeData, readData } from "@/ts/dataManager";
import { offsets } from "@/ts/offsets";
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