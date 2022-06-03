<script setup lang="ts">
import EditorOverview from "@/components/editor/EditorOverview.vue";
import EditorLevelSelect from "@/components/editor/EditorLevelSelect.vue";
import EditorRobeSelect from "@/components/editor/EditorRobeSelect.vue";
import EditorScarfSelect from "@/components/editor/EditorScarfSelect.vue";
import EditorSymbolSelect from "@/components/editor/EditorSymbolSelect.vue";
import { lightBackground } from "@/ts/visualManager";
import { getStorage, writeData, readData } from "@/ts/dataManager";
import { offsets } from "@/ts/offsets";
</script>

<template>
	<div class="editZone">
		<div v-if="active.every(e=>e===0)">
			<EditorOverview
				@enable-level="setActive(0)"
				@enable-robe="setActive(1)"
				@enable-scarf="setActive(2)"
				@enable-symbol="setActive(3)"
			/>
		</div>
		<div v-if="active[0]===1">
			<EditorLevelSelect />
		</div>
		<div v-if="active[1]===1">
			<EditorRobeSelect />
		</div>
		<div v-if="active[2]===1">
			<EditorScarfSelect />
		</div>
		<div v-if="active[3]===1">
			<EditorSymbolSelect />
		</div>
		<div class="flex-container">
			<div v-if="active.some(e=>e>0)" :class="lightBackground + ' flex-item cursorPointer'" @click="returnToOverview">
				Back
			</div>
			<div :class="lightBackground + ' flex-item cursorPointer'" @click="download">
				Download
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			active: [0, 0, 0, 0]
		};
	},
	mounted() {
		this.checkLevel();
	},
	methods: {
		checkLevel() {
			const levelData = readData("uint8", offsets.level_value);
			if (levelData === 0) {
				writeData("uint8", offsets.level_value, 1);
			}
		},
		setActive(index: number) {
			this.active[index] = 1;
		},
		returnToOverview() {
			this.active = [0, 0, 0, 0];
		},
		download() {
			// https://stackoverflow.com/a/30832210
			let file = new Blob([getStorage("uint8") as Uint8Array]);
			let a = document.createElement("a"), url = URL.createObjectURL(file);
			a.href = url;
			a.download = "SAVE.BIN";
			document.body.appendChild(a);
			a.click();
			setTimeout(() => {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}
});
</script>

<style scoped>
@import "@/css/style.css";
.editZone {
  font-size: 5vh;
  left: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.flex-container {
  display: flex;
  justify-content: space-evenly;
}

.flex-item {
  flex-basis: 100%;
  margin-top: 5vh;
  max-width: 15vw;
  width: 10vw;
  min-width: fit-content;
  margin: 20px 50px;
  text-align: center;
}
</style>
