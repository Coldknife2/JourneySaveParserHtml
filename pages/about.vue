<script setup lang="ts">
const companions = [
	{ l: "https://github.com/Coldknife2/JourneySaveParserHtml",               n: "Coldknife2",      s: 0xF114 },
	{ l: "https://github.com/Peksa",                                          n: "Peksa",           s: 0xF103 },
	{ l: "https://www.twitch.tv/lbanj",                                       n: "Banj",            s: 0xF112 },
	{ l: "https://github.com/arckoor/JourneySaveParserHtml",                  n: "arckoor",         s: 0xF101 },
	{ l: "https://www.twitch.tv/lovelyflight",                                n: "Lovely Flight",   s: 0xF111 },
	{ l: "https://www.youtube.com/channel/UCEPMlDvuIcrHHGaEeakKkZA/featured", n: "Paleologos",      s: 0xF101 },
	{ l: "https://www.twitch.tv/nathanj29",                                   n: "nathanj",         s: 0xF110 },
	{ l: "https://www.twitch.tv/avalo_ki",                                    n: "aravshetikolava", s: 0xF10B }
];
</script>

<template>
	<ParserDisplay :companions="companions" heading-name="Contributors" :slice-position="Math.ceil(companions.length/2)" />
</template>
