<script setup lang="ts">
const theme = useTheme();

function normalizeRoute(route: string) {
    return route.replace(/\/+$/, "");
}

function routeToTitle(route: string) {
    let normalized = normalizeRoute(route);
    switch (normalized) {
        case "":
            return "Journey Parser";
        case "/stats":
            return "Journey Statistics";
        case "/editor":
            return "Journey Editor";
        case "/about":
            return "About";
        case "/help":
            return "Finding your Save.bin";
        case "/options":
            return "Options";
    }
}

useHead({
    bodyAttrs: {
        class: theme.value.isLight ? "light" : "dark",
    },
});

const route = useRoute();

const pathInclude = computed(() => {
    let normalized = normalizeRoute(route.path);
    return !["/about", "/help", "/options"].includes(normalized);
});
</script>

<template>
    <NavBar />
    <Title>{{ routeToTitle($route.path) }}</Title>
    <div class="scrollViewport">
        <div v-if="displayDropZone && pathInclude" class="dropZoneContainer">
            <div
                :class="'dropZone' + (dragging ? ' dz-dragover' : '')"
                @click="clickInput"
                @dragenter.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
                @dragover.prevent
                @drop.prevent="dropHandler"
            >
                Click or Drop your Journey Save.bin here
                <input ref="input" type="file" style="display: none" accept=".bin" @change="inputHandler()" />
            </div>
            <NuxtLink to="/help/" :class="'help-link ' + theme.background">I need help finding my Save.bin!</NuxtLink>
        </div>
        <div
            :class="
                (!displayDropZone || !pathInclude ? 'hidden-dropZone' : 'hidden') + (dragging ? ' hdz-dragover' : '')
            "
            @dragenter.prevent="dragTest($event, true)"
            @dragleave.prevent="dragTest($event, false)"
            @dragover.prevent
            @drop.prevent="dropHandler"
        >
            <NuxtPage />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            saves: useSaves(),
            displayDropZone: useDisplayDropZone(),
            fileReader: null as FileReader | null,
            tooltipEnabled: false,
            dragging: false,
        };
    },
    mounted() {
        this.fileReader = new FileReader();
        this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);
    },
    methods: {
        dragTest(e: DragEvent, set: boolean) {
            if (!(e.currentTarget as HTMLElement)?.contains(e.relatedTarget as Node)) {
                this.dragging = set;
            }
        },
        clickInput() {
            (this.$refs.input as HTMLInputElement).click();
        },
        inputHandler() {
            if (!this.fileReader) {
                return;
            }
            this.fileReader.readAsArrayBuffer(((this.$refs.input as HTMLInputElement).files as FileList)[0] as Blob);
        },
        dropHandler(ev: DragEvent) {
            this.dragging = false;
            if (!this.fileReader) {
                return;
            }
            // Moz wiki https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
            this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);
            ev.preventDefault();
            if (ev.dataTransfer?.items.length && ev.dataTransfer?.items.length >= 1) {
                if (ev.dataTransfer.items[0]!.kind === "file") {
                    const file = ev.dataTransfer.items[0]!.getAsFile() as File;
                    this.fileReader.readAsArrayBuffer(file);
                }
            } else {
                this.fileReader.readAsArrayBuffer(ev.dataTransfer?.files[0] as File);
            }
        },
        callback(callbackEvent: ProgressEvent) {
            const buffer = (callbackEvent.target as FileReader).result as ArrayBuffer;
            this.saves.set(buffer);
            this.displayDropZone = false;
        },
    },
});
</script>

<style scoped>
.scrollViewport {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    mask-image: linear-gradient(
        to bottom,
        transparent 0,
        transparent var(--nav-height, 0px),
        black calc(var(--nav-height, 0px) + 56px)
    );
    -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0,
        transparent var(--nav-height, 0px),
        black calc(var(--nav-height, 0px) + 56px)
    );
}

.dropZoneContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 70px - 50px);
    min-height: 60vh;
}

.dropZone {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    border: 4px dashed #ffffff;
    font-size: var(--font-size--section);
    margin-bottom: 10px;
    width: 95%;
    height: 33%;
    transition: transform 0.3s ease;
}

.dz-dragover {
    transform: scale(1.01);
}

.help-link {
    font-size: var(--font-size--subscript);
    text-align: center;
    margin-top: 20px;
    padding: 5px 10px;
}

a,
a:visited {
    color: var(--color-text);
    text-decoration: none;
}

.hidden-dropZone {
    z-index: 999;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 4px solid transparent;
    border-top: 0px;
    transition: border-color 0.5s ease;
}

.hdz-dragover {
    border-color: #ffffff;
}

.hidden {
    display: none;
}
</style>
