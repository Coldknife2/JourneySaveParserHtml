<script setup lang="ts">
const steamLink = useSteamLink();
const showEditor = useShowEditor();
</script>

<template>
    <div class="container">
        <div class="options-item">
            <Checkbox @checked="steamLink = true" @unchecked="steamLink = false" :initialValue="steamLink" />
            <span class="item-description">Open companion profiles in Steam</span>
        </div>
        <div class="options-item">
            <Checkbox @checked="showEditor = true" @unchecked="showEditor = false" :initialValue="showEditor" />
            <span class="item-description">Show the editor pane in the navbar</span>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 20vh 0 10px 16%;
    max-width: 90%;
    overflow: scroll;
}

.companions {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
    font-size: var(--font-size--default);
    height: 100%;
    width: 100%;
}

.options-item {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    margin-bottom: 20px;
}

.item-description {
    margin-left: 20px;
    font-size: var(--font-size--default);
}
</style>
