<script setup lang="ts">
defineProps<{
    link: string;
    displayName: string;
}>();
defineEmits(["retract"]);
const theme = useTheme();
const hovered = ref(false);
</script>

<template>
    <div
        class="container"
        :class="{ hov: hovered, hovLight: theme.isLight }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <NuxtLink :to="link" class="item" @click="$emit('retract')" @dragstart.prevent>
            <template v-if="$route.fullPath === link">
                <u>{{ displayName }}</u>
            </template>
            <template v-else>
                {{ displayName }}
            </template>
        </NuxtLink>
    </div>
</template>

<style scoped>
.container {
    flex: 0 0 auto;
    white-space: nowrap;
    transition:
        text-shadow 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease,
        border-radius 0.2s ease;
}

a,
a:visited {
    color: var(--color-text);
    font-size: var(--font-size--default);
    text-decoration: none;
}

.item {
    padding: 0 10px;
}
</style>
