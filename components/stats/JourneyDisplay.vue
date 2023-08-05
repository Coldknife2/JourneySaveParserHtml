<script setup lang="ts">
const saves = useSaves().value;
const names = ref([] as string[]);
const values = ref([] as string[]);

const createData = () => {
	const level = readData(saves, "u8", offsets.levelValue) as number;
	const companionNumber = readData(saves, "u8", offsets.companionAmount).toString();
	const scarfValue = readData(saves, "u8", offsets.scarfValue).toString();
	const symbolValue = readData(saves, "u8", offsets.symbolValue)as number;
	const robeData = readData(saves, "u8", offsets.robeValue) as number;
	const robeColor = robeData > 3 ? "White" : "Red";
	const robeTier = (robeData > 3 ? robeData - 2 : robeData + 1).toString();

	names.value = ["Current Level", "Companions met (this Journey)", "Scarf length", "Symbol", "Robe Tier", "Robe Color"];
	values.value = [levelNames[level], companionNumber, scarfValue, String.fromCharCode(0xF101 + symbolValue), robeTier, robeColor];
};

createData();
watch(saves, () => {
	createData();
}, { deep: true });
</script>

<template>
	<StatsValueItem
		v-for="i in 6"
		:key="i"
		:item-name="names[i-1]"
		:item-value="values[i-1]"
		:use-glyph="(i==4) ? true : false"
	/>
</template>
