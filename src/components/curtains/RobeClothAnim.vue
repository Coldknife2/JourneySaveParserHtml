<script setup lang="ts">
import { randomFloat, lerp, limitDecimals, shuffle } from "@/ts/math";
import { robe } from "@/images";
import { Plane } from "vue-curtains";
import { Texture } from "curtainsjs";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
defineProps({
	robeData: {
		type: Number,
		required: true
	}
});
</script>

<template>
	<Plane
		class="plane"
		:params="planeProps"
		@render="onRender"
		@ready="onReady"
	/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			planeProps: {
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				widthSegments: 20,
				heightSegments: 40,
				uniforms: {
					time: {
						name: "uTime",
						type: "1f",
						value: 0
					},
					movScaleLeft: {
						name: "uMovScaleLeft",
						type: "1f",
						value: .5
					},
					movScaleRight: {
						name: "uMovScaleRight",
						type: "1f",
						value: .5
					}
				},
			},
			activeTexture: Texture,
			plane: Plane,
			currentTextureIndex: 0,
			ready: false,
			movScale: {
				left: {
					default: .5,
					target: .5
				},
				right: {
					default: .5,
					target: .5
				},
				transition: 0,
				rise: false,
				decay: false
			}
		};
	},
	mounted() {
		this.currentTextureIndex = this.robeData;
	},
	beforeUnmount() {
		this.plane.remove();
	},
	methods: {
		onRender(plane: typeof Plane) {
			this.textureSwap(plane);
			this.handleTransition(plane);
			plane.uniforms.time.value++;
		},
		onReady(plane: typeof Plane) { // FIXME: flashes to white if the initial robe is a red one
			this.plane = plane;
			let cnt = 0;
			const allRobes = [...robe[0]];
			allRobes.push(...robe[1]);
			plane.loadSources(allRobes, {}, () => {
				cnt += 1;
				if (cnt === allRobes.length) {
					this.activeTexture = plane.createTexture({
						sampler: "uTexture",
						fromTexture: plane.textures[this.robeData]
					});
					this.ready = true;
				}
			});
		},
		textureSwap(plane: typeof Plane) {
			if (this.ready && this.robeData !== this.currentTextureIndex) {
				this.currentTextureIndex = this.robeData;
				this.activeTexture.setSource(plane.images[this.currentTextureIndex]);
			}
		},
		handleTransition(plane: typeof Plane) {
			const movScale = this.movScale;
			const leftTarget = this.movScale.left;
			const rightTarget = this.movScale.right;
			const leftActual = plane.uniforms.movScaleLeft;
			const rightActual = plane.uniforms.movScaleRight;

			if (!movScale.rise && !movScale.decay) {
				const [upSide, downSide] = shuffle([leftTarget, rightTarget]);
				upSide.target = limitDecimals(randomFloat(0.2, 0.5), 3);
				downSide.target = 0.2;
				movScale.rise = true;
			} else if (movScale.rise) {
				leftActual.value = limitDecimals(lerp(leftTarget.default, leftTarget.target, movScale.transition), 3);
				rightActual.value = limitDecimals(lerp(rightTarget.default, rightTarget.target, movScale.transition), 3);
				movScale.transition = limitDecimals(movScale.transition + 0.001, 5);
				if (movScale.transition === 1) {
					movScale.rise = false;
					movScale.decay = true;
					movScale.transition = 0;
				}
			} else {
				leftActual.value = limitDecimals(lerp(leftTarget.target, leftTarget.default, movScale.transition), 3);
				rightActual.value = limitDecimals(lerp(rightTarget.target, rightTarget.default, movScale.transition), 3);
				movScale.transition = limitDecimals(movScale.transition + 0.005, 5);
				if (movScale.transition === 1) {
					movScale.rise = false;
					movScale.decay = false;
					movScale.transition = 0;
				}
			}
		}
	}
});
</script>

<style scoped>
.plane {
	width: 20vh;
	height: 40vh;
}

img {
	display: none;
}
</style>
