<script setup lang="ts">
defineProps<{
    rowName: string;
}>();
</script>

<template>
    <div class="item">
        <div class="name">
            {{ rowName }}
        </div>
        <div class="content">
            <slot name="rowContent" />
        </div>
    </div>
</template>

<style scoped>
.item {
    display: flex;
    font-size: var(--font-size--default);
    margin: 10px 0 10px 0;
    gap: 10px;
    @media (max-width: 560px) {
        flex-direction: column;
        align-items: flex-start;
    }
}

.name {
    flex-basis: 40%;
    white-space: nowrap;
    @media (max-width: 560px) {
        max-width: 80%;
        white-space: normal;
    }
}

.content {
    display: flex;
    flex-basis: 60%;
    justify-content: left;
}
</style>
