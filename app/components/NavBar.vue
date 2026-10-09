<template>
    <div class="navbar" ref="navbarRoot" :class="theme.isLight ? 'navbar-light' : 'navbar-dark'">
        <div class="itemsCollapse" :style="{ maxHeight: (isDisplayed ? itemsHeight : 0) + 'px' }">
            <div class="scrollWrap" ref="scrollWrap">
                <div class="fade fade-left" :class="{ visible: showLeftFade }"></div>
                <div
                    ref="scrollContainer"
                    class="flex"
                    @pointerdown="onPointerDown"
                    @scroll="updateFade"
                    @click.capture="onContainerClick"
                >
                    <NavBarItem
                        v-for="path in paths"
                        :key="path.n"
                        :link="path.p"
                        :display-name="path.n"
                        @retract="isDisplayed = false"
                    />
                </div>
                <div class="fade fade-right" :class="{ visible: showRightFade }"></div>
            </div>
        </div>
        <div class="center" :class="bounce ? 'bounce' : ''" @click="stopBounce">
            <img
                :style="{
                    transform: isDisplayed ? 'rotate(90deg)' : 'rotate(270deg)',
                    cursor: 'pointer',
                }"
                src="~images/arrows/arrow1L.svg"
                alt="Expand Navigation Bar"
                @click="isDisplayed = !isDisplayed"
                @dragstart.prevent
            />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            theme: useTheme(),
            isDisplayed: useNavBarExpanded(),
            navBarClicked: useNavBarClicked(),
            showEditor: useShowEditor(),
            commonPaths: [
                { p: "/stats/", n: "Statistics" },
                { p: "/", n: "Parser" },
                { p: "/help/", n: "Help" },
                { p: "/options/", n: "Options" },
                { p: "/about/", n: "About" },
            ],
            paths: [] as { p: string; n: string }[],
            bounce: true,
            isDragging: false,
            dragMoved: false,
            dragStartX: 0,
            dragStartScrollLeft: 0,
            showLeftFade: false,
            showRightFade: false,
            itemsHeight: 0,
            resizeObserver: null as ResizeObserver | null,
        };
    },
    mounted() {
        if (this.navBarClicked) {
            this.bounce = false;
        }
        this.$watch("showEditor", () => this.updatePaths());
        this.updatePaths();
        this.$nextTick(() => {
            this.updateFade();
            this.updateItemsHeight();
            this.updateNavHeightVar();
        });
        const scrollWrapEl = this.$refs.scrollWrap as HTMLElement;
        const navbarEl = this.$refs.navbarRoot as HTMLElement;
        if (typeof ResizeObserver !== "undefined") {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateFade();
                this.updateItemsHeight();
                this.updateNavHeightVar();
            });
            if (scrollWrapEl) {
                this.resizeObserver.observe(scrollWrapEl);
            }
            if (navbarEl) {
                this.resizeObserver.observe(navbarEl);
            }
        }
    },
    beforeUnmount() {
        this.resizeObserver?.disconnect();
        window.removeEventListener("pointermove", this.onWindowPointerMove);
        window.removeEventListener("pointerup", this.onWindowPointerUp);
        window.removeEventListener("pointercancel", this.onWindowPointerUp);
    },
    methods: {
        updateItemsHeight() {
            const el = this.$refs.scrollWrap as HTMLElement;
            this.itemsHeight = el.offsetHeight;
        },
        updateNavHeightVar() {
            const el = this.$refs.navbarRoot as HTMLElement;
            document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
        },
        stopBounce() {
            if (!this.navBarClicked) {
                this.navBarClicked = true;
                this.bounce = false;
            }
        },
        updatePaths() {
            if (this.showEditor) {
                this.paths = JSON.parse(JSON.stringify(this.commonPaths));
                this.paths.splice(0, 0, { p: "/editor/", n: "Editor" });
            } else {
                this.paths = JSON.parse(JSON.stringify(this.commonPaths));
            }
            this.$nextTick(() => {
                this.updateFade();
                this.updateItemsHeight();
                this.updateNavHeightVar();
            });
        },
        updateFade() {
            const el = this.$refs.scrollContainer as HTMLElement;
            this.showLeftFade = el.scrollLeft > 2;
            this.showRightFade = el.scrollLeft < el.scrollWidth - el.clientWidth - 2;
        },
        onPointerDown(e: PointerEvent) {
            if (e.pointerType !== "mouse") {
                return;
            }
            const el = this.$refs.scrollContainer as HTMLElement;
            this.isDragging = true;
            this.dragMoved = false;
            this.dragStartX = e.clientX;
            this.dragStartScrollLeft = el.scrollLeft;
            // Track the drag via window-level listeners instead of
            // setPointerCapture: capture can get stuck in real-world usage
            // (e.g. the pointerup firing somewhere capture doesn't expect),
            // and while captured, hover/pointerover stops being delivered to
            // the individual links underneath, breaking their :hover state
            // for the rest of the session.
            window.addEventListener("pointermove", this.onWindowPointerMove);
            window.addEventListener("pointerup", this.onWindowPointerUp);
            window.addEventListener("pointercancel", this.onWindowPointerUp);
        },
        onWindowPointerMove(e: PointerEvent) {
            if (!this.isDragging) {
                return;
            }
            const el = this.$refs.scrollContainer as HTMLElement;
            const delta = e.clientX - this.dragStartX;
            if (!this.dragMoved && Math.abs(delta) > 4) {
                this.dragMoved = true;
            }
            if (this.dragMoved) {
                el.scrollLeft = this.dragStartScrollLeft - delta;
            }
        },
        onWindowPointerUp() {
            this.isDragging = false;
            window.removeEventListener("pointermove", this.onWindowPointerMove);
            window.removeEventListener("pointerup", this.onWindowPointerUp);
            window.removeEventListener("pointercancel", this.onWindowPointerUp);
        },
        onContainerClick(e: MouseEvent) {
            if (this.dragMoved) {
                e.preventDefault();
                e.stopPropagation();
                this.dragMoved = false;
            }
        },
    },
});
</script>

<style scoped>
img {
    transform: rotate(270deg);
    transition: transform 0.3s;
    width: 70px;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--navbar-height);
    z-index: 9999;
}

.itemsCollapse {
    overflow: hidden;
    max-height: 0px;
    transition: max-height var(--navbar-time);
}

.scrollWrap {
    position: relative;
    padding: 10px;
}

.flex {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    text-align: center;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x;
    cursor: grab;
}

.flex::-webkit-scrollbar {
    display: none;
}

.flex:active {
    cursor: grabbing;
}

.fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 24px;
    pointer-events: none;
    z-index: 1;
    background: #ffffff60;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 0;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.fade.visible {
    opacity: 1;
}

.fade-left {
    left: 0;
    mask-image: linear-gradient(to right, black, transparent);
    -webkit-mask-image: linear-gradient(to right, black, transparent);
}

.fade-right {
    right: 0;
    mask-image: linear-gradient(to left, black, transparent);
    -webkit-mask-image: linear-gradient(to left, black, transparent);
}

.bounce {
    animation: 5s infinite arrowBounce;
}

@keyframes arrowBounce {
    5% {
        transform: translateY(0px);
    }

    10% {
        transform: translateY(20px);
    }

    15% {
        transform: translateY(0px);
    }

    25% {
        transform: translateY(0px);
    }

    30% {
        transform: translateY(20px);
    }

    35% {
        transform: translateY(0px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>
