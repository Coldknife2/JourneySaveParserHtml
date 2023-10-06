<script setup lang="ts">
const props = defineProps<{
	src: string,
	alt: string
}>();

const avif = ref({} as { default: string });
const webp = ref({} as { default: string });

const importImage = async () => {
	avif.value = await import(`images/levels/${props.src}.avif`);
	webp.value = await import(`images/levels/${props.src}.webp`);
};

await importImage();
watch(props, async () => await importImage(), { deep: true });

</script>

<template>
	<picture>
		<source :srcset="avif.default" type="image/avif" />
		<img :src="webp.default" :alt="alt" loading="lazy" />
	</picture>
</template>

