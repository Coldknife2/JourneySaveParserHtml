<script setup lang="ts">
</script>

<template>
	<div class="container">
		<div :class="lightBackground + ' block cursorPointer'" @click="emitChange('level')">
			Level Select
		</div>
		<div :class="lightBackground + ' block cursorPointer'" @click="emitChange('robe')">
			Robe Select
		</div>
		<div :class="lightBackground + ' block cursorPointer'" @click="emitChange('scarf')">
			Scarf Length Select
		</div>
		<div :class="lightBackground + ' block cursorPointer'" @click="emitChange('symbol')">
			Symbol Select
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["enableLevel", "enableRobe", "enableScarf", "enableSymbol"],
	methods: {
		emitChange(type: string) {
			switch(type) {
				case "level":
					this.$emit("enableLevel");
					break;
				case "robe":
					this.$emit("enableRobe");
					break;
				case "scarf":
					this.$emit("enableScarf");
					break;
				case "symbol":
					this.$emit("enableSymbol");
					break;
			}
		}
	}
});
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  font-size: 5vh;
  height: 4em;
  justify-content: center;
  padding: 2vh;
  text-align: center;
  width: 4em;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100vw;
}
</style>
