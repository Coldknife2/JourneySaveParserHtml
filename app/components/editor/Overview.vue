<script setup lang="ts">
const theme = useTheme();

defineProps<{
    callback: () => void;
    enable: (i: number) => void;
}>();
const lvlNames = ["Level Select", "Robe Select", "Scarf Length Select", "Symbol Select", "CMATW"];
</script>

<template>
    <div class="container">
        <div
            :class="theme.background + ' block cursorPointer'"
            v-for="(item, i) in lvlNames"
            :key="i"
            @click="
                () => {
                    enable(i);
                    if (i === 1) callback();
                }
            "
        >
            {{ item }}
        </div>
    </div>
</template>

<style scoped>
.block {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size--heading);
    justify-content: center;
    padding: 30px;
    text-align: center;
    width: 260px;
    hyphens: auto;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
}
</style>
