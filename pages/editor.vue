<script setup lang="ts">
const lightBackground = useLightBackground();
</script>

<template>
	<div v-if="!consented" class="consentZone">
		The editor should be used with caution.<br />
		Use common sense to not ruin the experience for other players. <br />
		Please acknowledge these responsibilities before proceeding.
		<div class="consentButton cursorPointer" @click="setConsent">I understand.</div>
	</div>
	<CurtainsCurtainWrapper v-else>
		<template #content="{ renderCallback }">
			<div class="editZone">
				<div v-if="active.every((e: number)=>e===0)">
					<EditorOverview :enable="setActive" :callback="renderCallback" />
				</div>
				<EditorLevelSelect  v-if="active[0]===1"/>
				<EditorRobeSelect   v-if="active[1]===1"/>
				<EditorScarfSelect  v-if="active[2]===1"/>
				<EditorSymbolSelect v-if="active[3]===1" @return-to-overview="returnToOverview" />
				<div class="flex-container">
					<div v-if="active.some((e: number)=>e>0)" :class="lightBackground + ' flex-item cursorPointer'" @click="if (active[1]) renderCallback(); returnToOverview()">
						Back
					</div>
					<div :class="lightBackground + ' flex-item cursorPointer'" @click="download">
						Download
					</div>
				</div>
			</div>
		</template>
	</CurtainsCurtainWrapper>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			saves: useSaves().value,
			cookie: useEditorConsent(),
			active: [0, 0, 0, 0],
			consented: false
		};
	},
	mounted() {
		this.$watch("saves", () => this.checkLevel(), { deep: true });
		this.checkConsent();
		this.checkLevel();
	},
	methods: {
		setConsent() {
			this.cookie = "true";
			this.consented = true;
		},
		checkConsent()  {
			if (this.cookie !== "false") {
				this.consented = true;
			}
		},
		checkLevel() {
			const levelData = readData(this.saves, "u8", offsets.levelValue);
			if (levelData === 0) {
				writeData(this.saves, "u8", offsets.levelValue, 1);
			}
		},
		setActive(index: number) {
			this.active[index] = 1;
		},
		returnToOverview() {
			this.active = [0, 0, 0, 0];
		},
		download() {
			// https://stackoverflow.com/a/30832210
			let file = new Blob([this.saves.u8 as Uint8Array]);
			let a = document.createElement("a"), url = URL.createObjectURL(file);
			a.href = url;
			a.download = "SAVE.BIN";
			document.body.appendChild(a);
			a.click();
			setTimeout(() => {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}
});
</script>

<style scoped>
.consentZone {
	left: 50%;
	font-size: var(--font-size--section);
	top: 50%;
	position: absolute;
	transform: translate(-50%, -50%);
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.consentButton {
	margin-top: 60px;
	padding: 10px 20px 10px 20px;
	border: 4px dashed #ffffff;
	width: fit-content;
	display: flex;
}

.editZone {
	font-size: var(--font-size--heading);
	left: 50%;
	margin: 0;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
}

.flex-container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 60%;
	margin: 0 20%;
}

.flex-item {
	flex-basis: 50%;
	width: fit-content;
	margin: 20px 50px;
	text-align: center;
	padding: 5px 10px;
}
</style>
