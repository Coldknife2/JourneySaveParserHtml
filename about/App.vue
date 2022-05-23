<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import PlayerDisplay from "@/components/PlayerDisplay.vue";
import { setBackground, setIcon } from "@/ts/visualManager";
</script>

<template>
	<NavBar />
	<PlayerDisplay :companions="companions" heading-name="Contributors" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

setBackground();
setIcon();
export default defineComponent({
	data() {
		return {
			companions: [
				{ l:"https://github.com/Coldknife2/JourneySaveParserHtml", n:"Coldknife2", s:0xE014 },
				{ l:"https://github.com/Peksa", n:"Peksa", s:0xE003 },
				{ l:"https://www.twitch.tv/lbanj", n:"Banj", s:0xE012 },
				{ l:"https://github.com/ArcKoor", n:"arckoor", s:0xE001 },
				{ l:"https://www.twitch.tv/lovelyflight", n:"Lovely Flight", s:0xE011 },
				{ l:"https://www.youtube.com/channel/UCEPMlDvuIcrHHGaEeakKkZA/featured", n:"Paleologos", s:0xE001 },
				{ l:"https://www.twitch.tv/nathanj29", n:"nathanj", s:0xE010 }
			],
		};
	}
});
</script>

<style>
@import "@/css/style.css";
</style>
