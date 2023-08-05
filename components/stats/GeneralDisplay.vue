<script setup lang="ts">
const saves = useSaves().value;
const names = ref([] as string[]);
const values = ref([] as string[]);

const createData = () => {
	const journeyNumber = readData(saves, "u8", offsets.journeyAmount).toString();
	const companionNumber = readData(saves, "u8", offsets.companionAmountTotal).toString();
	const symbolNumber = readData(saves, "u8", offsets.symbolAmount).toString();

	names.value = ["Completed Journeys", "Total Companions met", "Total Symbols collected"];
	values.value = [journeyNumber, companionNumber, symbolNumber];
};

createData();
watch(saves, () => createData(), { deep: true });
</script>

<template>
	<StatsValueItem
		v-for="i in 3"
		:key="i"
		:item-name="names[i-1]"
		:item-value="values[i-1]"
	/>
</template>
