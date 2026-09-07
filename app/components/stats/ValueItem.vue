<script setup lang="ts">
interface Props {
    itemName: string;
    itemValue: string;
    useGlyph?: boolean;
}

withDefaults(defineProps<Props>(), {
    useGlyph: false,
});
</script>

<template>
    <div class="item">
        <div class="name">
            {{ itemName }}
        </div>
        <div class="value" :style="{ fontFamily: useGlyph ? 'Glyphs' : 'inherit' }">
            {{ itemValue }}
        </div>
    </div>
</template>

<style scoped>
.item {
    display: flex;
    font-size: var(--font-size--default);
    margin: 10px 0 10px 0;
    align-items: center;
    @media (max-width: 560px) {
        flex-direction: column;
        align-items: flex-start;
    }
}

.name {
    white-space: nowrap;
    @media (max-width: 560px) {
        max-width: 80%;
        white-space: normal;
    }
}

.value {
    flex-basis: 100%;
    text-align: right;
    @media (max-width: 560px) {
        text-align: left;
    }
}
</style>
