<script setup lang="ts">
interface Props {
    initialValue?: boolean;
}

withDefaults(defineProps<Props>(), {
    initialValue: false,
});
</script>

<template>
    <div class="checkbox" @click="toggle">
        <svg
            class="checkbox-svg"
            viewBox="0 0 700 700"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <g transform="matrix(1,0,0,1,-801,0)">
                <g transform="matrix(1,0,0,1,-698.066,1.13687e-13)">
                    <g transform="matrix(1.38889,0,0,1.38889,1500,0)">
                        <path d="M216,0L216,72L144,72L144,144L72,144L72,216L0,216L0,0L216,0Z" class="corner" />
                    </g>
                    <g transform="matrix(-1.38889,1.7009e-16,-1.7009e-16,-1.38889,2200,700)">
                        <path d="M216,0L216,72L144,72L144,144L72,144L72,216L0,216L0,0L216,0Z" class="corner" />
                    </g>
                    <g transform="matrix(8.50449e-17,1.38889,-1.38889,8.50449e-17,2200,0)">
                        <path d="M216,0L216,72L144,72L144,144L72,144L72,216L0,216L0,0L216,0Z" class="corner" />
                    </g>
                    <g transform="matrix(-2.55135e-16,-1.38889,1.38889,-2.55135e-16,1500,700)">
                        <path d="M216,0L216,72L144,72L144,144L72,144L72,216L0,216L0,0L216,0Z" class="corner" />
                    </g>
                    <g transform="matrix(0.428571,0,0,0.428571,1057.14,200)" :class="checked ? 'checked' : 'unchecked'">
                        <path
                            d="M1500,300L1600,300L1600,200L1700,200L1700,100L1800,100L1800,0L1900,0L1900,100L2000,100L2000,200L2100,200L2100,300L2200,300L2200,400L2100,400L2100,500L2000,500L2000,600L1900,600L1900,700L1800,700L1800,600L1700,600L1700,500L1600,500L1600,400L1500,400L1500,300Z"
                        />
                    </g>
                </g>
            </g>
        </svg>
        <input type="checkbox" :value="checked" />
    </div>
</template>

<script lang="ts">
export default defineComponent({
    emits: ["checked", "unchecked"],
    data() {
        return {
            checked: this.initialValue as unknown as boolean,
        };
    },
    mounted() {
        this.$watch("checked", () => {
            if (this.checked) {
                this.$emit("checked");
            } else {
                this.$emit("unchecked");
            }
        });
    },
    methods: {
        toggle() {
            this.checked = !this.checked;
        },
    },
});
</script>

<style scoped>
input[type="checkbox"],
input[type="checkbox"]:checked {
    display: none;
}

.checkbox {
    --inset: -20px;
    width: 70px;
    height: 70px;
    cursor: pointer;
}

.checkbox-svg {
    fill: #fff;
    overflow: visible;
    min-width: 30px;
}

.checkbox:hover .corner {
    transform: translate(var(--inset), var(--inset));
}

path {
    transition: all 0.2s;
}

.unchecked {
    fill: transparent;
}

.checked {
    fill: #fff;
}
</style>
