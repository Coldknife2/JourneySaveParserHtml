<script setup lang="ts">
import { robe } from "images";
import { Plane } from "vue-curtains";
import { Texture } from "curtainsjs";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
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
	>
		<img :src="robe[0][0]">
		<img :src="robe[0][1]">
		<img :src="robe[0][2]">
		<img :src="robe[0][3]">
		<img :src="robe[1][0]">
		<img :src="robe[1][1]">
		<img :src="robe[1][2]">
	</Plane>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			planeProps: {
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				visible: false,
				widthSegments: 20,
				heightSegments: 40,
				uniforms: {
					time: {
						name: "uTime",
						type: "1f",
						value: 0
					},
					seed: {
						name: "uSeed",
						type: "1f",
						value: randomFloat(5000, 40000)
					}
				},
			},
			activeTexture: Texture,
			currentTextureIndex: 0,
			ready: false
		};
	},
	mounted() {
		this.currentTextureIndex = this.robeData;
	},
	methods: {
		onRender(plane: typeof Plane) {
			this.textureSwap(plane);
			plane.uniforms.time.value++;
		},
		onReady(plane: typeof Plane) {
			this.activeTexture = plane.createTexture({
				sampler: "uTexture",
				fromTexture: plane.textures[this.currentTextureIndex]
			});
			this.ready = true;
			plane.visible = true;
		},
		textureSwap(plane: typeof Plane) {
			if (this.ready && this.robeData !== this.currentTextureIndex) {
				this.currentTextureIndex = this.robeData;
				this.activeTexture.setSource(plane.images[this.currentTextureIndex]);
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
