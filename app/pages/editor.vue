<script setup lang="ts">
const displayDropZone = useDisplayDropZone();
const theme = useTheme();
</script>

<template>
    <div v-if="!consented && !displayDropZone" class="consentZone">
        The editor should be used with caution.<br />
        Use common sense to not ruin the experience for other players. <br />
        Please acknowledge these responsibilities before proceeding.
        <div class="consentButton cursorPointer" @click="setConsent">I understand.</div>
    </div>
    <CurtainsCurtainWrapper v-if="consented && !displayDropZone">
        <template #content="{ renderCallback }">
            <div class="editZone">
                <EditorOverview
                    :enable="setActive"
                    :callback="renderCallback"
                    v-if="active.every((e: number) => e === 0)"
                />
                <EditorLevelSelect v-if="active[0] === 1" />
                <EditorRobeSelect v-if="active[1] === 1" />
                <EditorScarfSelect v-if="active[2] === 1" />
                <EditorSymbolSelect v-if="active[3] === 1" @return-to-overview="returnToOverview" />
                <EditorCompanions v-if="active[4] === 1" />
                <div class="flex-container">
                    <div
                        v-if="active.some((e: number) => e > 0)"
                        :class="theme.background + ' flex-item cursorPointer'"
                        @click="
                            if (active[1]) {
                                renderCallback();
                            }
                            returnToOverview();
                        "
                    >
                        Back
                    </div>
                    <div :class="theme.background + ' flex-item cursorPointer'" @click="download">Download</div>
                </div>
            </div>
        </template>
    </CurtainsCurtainWrapper>
</template>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            saves: useSaves(),
            cookie: useEditorConsent(),
            active: [0, 0, 0, 0, 0],
            consented: false,
        };
    },
    mounted() {
        this.$watch(this.saves.get, () => this.checkLevel(), { deep: true });
        this.checkConsent();
        this.checkLevel();
    },
    methods: {
        setConsent() {
            this.cookie = true;
            this.consented = true;
        },
        checkConsent() {
            if (this.cookie) {
                this.consented = true;
            }
        },
        checkLevel() {
            const levelData = readData(this.saves, "u8", offsets.levelValue);
            if (levelData === 0) {
                writeData(this.saves, "u8", offsets.levelValue, 1);
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
            const save = this.saves.get();
            let file = new Blob([save.u8]);
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = "SAVE.BIN";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        },
    },
});
</script>

<style scoped>
.consentZone {
    font-size: var(--font-size--section);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 50px;
}

.consentButton {
    margin-top: 60px;
    padding: 10px 20px 10px 20px;
    border: 4px dashed #ffffff;
    width: fit-content;
    display: flex;
}

.editZone {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: var(--font-size--heading);
    margin: 0;
}

.editZone > div:first-of-type {
    margin-top: 100px;
}

.flex-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
    @media (max-width: 1160px) {
        width: unset;
    }
}

.flex-item {
    flex-basis: 350px;
    width: fit-content;
    text-align: center;
    padding: 5px 10px;
}
</style>
