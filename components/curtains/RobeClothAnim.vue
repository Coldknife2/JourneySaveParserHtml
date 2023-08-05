<script setup lang="ts">
import { robe } from "images";
import { Plane } from "vue-curtains";
import { Texture } from "curtainsjs";
import vertexShader from "assets/shaders/vertex.glsl?raw";
import fragmentShader from "assets/shaders/fragment.glsl?raw";

defineProps<{
	robeData: number
}>();
</script>

<template>
	<Plane
		class="plane"
		:params="planeProps"
		@render="onRender"
		@ready="onReady"
	>
		<template v-for="i in 2">
			<template v-for="j in 4">
				<img :src="robe[i-1][j-1]" v-if="i == 2 ? j < 4 : true" :key="4*(i-1)+(j-1)">
			</template>
		</template>
	</Plane>
</template>

<script lang="ts">
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
			if (this.robeData !== this.currentTextureIndex && this.ready) {
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
