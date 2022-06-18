<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import PlayerDisplay from "@/components/parser/PlayerDisplay.vue";
import { setBackground, setIcon } from "@/ts/visualManager";
</script>

<template>
	<NavBar path="about/" />
	<PlayerDisplay :companions="companions" heading-name="Contributors" :slice-position="Math.ceil(companions.length/2)" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

setBackground();
setIcon();
export default defineComponent({
	data() {
		return {
			companions: [
				{ l:"https://github.com/Coldknife2/JourneySaveParserHtml", n:"Coldknife2", s:0xF114 },
				{ l:"https://github.com/Peksa", n:"Peksa", s:0xF103 },
				{ l:"https://www.twitch.tv/lbanj", n:"Banj", s:0xF112 },
				{ l:"https://github.com/ArcKoor", n:"arckoor", s:0xF101 },
				{ l:"https://www.twitch.tv/lovelyflight", n:"Lovely Flight", s:0xF111 },
				{ l:"https://www.youtube.com/channel/UCEPMlDvuIcrHHGaEeakKkZA/featured", n:"Paleologos", s:0xF101 },
				{ l:"https://www.twitch.tv/nathanj29", n:"nathanj", s:0xF110 },
				{ l:"https://www.twitch.tv/aravshetikolava", n:"aravshetikolava", s:0xF10B },
				{ l:"https://steamcommunity.com/profiles/76561198144512124", n:"Lain", s:0xF112 }
			],
		};
	}
});
</script>

<style>
@import "@/css/style.css";
</style>
