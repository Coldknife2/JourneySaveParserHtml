<script setup lang="ts">
defineProps({
	link : {
		type: String,
		required: true
	},
	displayName : {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	}
});
</script>

<template>
	<div>
		<a :href="link" @click="emitPreserve">{{ displayName }}</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["preserveData"],
	methods: {
		emitPreserve() {
			if (!(this.link === this.path)) {
				this.$parent?.$emit("preserveData");
			}
		}
	}
});
</script>

<style scoped>

div {
	flex-basis: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

a,
a:visited {
	color: #ffffff;
	font-size: 3vh;
	text-decoration: none;
}

</style>
