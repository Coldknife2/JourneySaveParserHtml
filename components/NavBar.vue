<template>
	<div class="navbar" :class="(isDisplayed ? 'navbarOffsetExpanded' : 'navbarOffsetRetracted') + ' ' + (theme.isLight ? 'navbar-light' : 'navbar-dark')">
		<div class="flex">
			<NavBarItem
				v-for="path in paths" :key="path.n"
				:link="path.p"
				:display-name="path.n"
				@retract="isDisplayed = false"
			/>
		</div>
		<div class="center" :class="bounce ? 'bounce' : ''" @click="stopBounce">
			<img
				:style="{ transform: (isDisplayed ? 'rotate(90deg)' : 'rotate(270deg)') }"
				src="~images/arrows/arrow1L.svg"
				alt="Expand Navigation Bar"
				@click="isDisplayed = !isDisplayed"
				@dragstart.prevent
			>
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
			paths: [
				{ p: "/editor/", n: "Editor" },
				{ p: "/stats/",  n: "Statistics" },
				{ p: "/",        n: "Parser" },
				{ p: "/help/",   n: "Help" },
				{ p: "/about/",  n: "About" },
			],
			bounce: true
		};
	},
	mounted() {
		if (this.navBarClicked !== "false") {
			this.bounce = false;
		}
	},
	methods: {
		stopBounce() {
			if (this.navBarClicked === "false") {
				this.navBarClicked = "true";
				this.bounce = false;
			}
		}
	}
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
	min-width: 100%;
	width: 100%;
	z-index: 9999;
}

.navbar-light {
	background: linear-gradient(#B69174 40%, transparent 80%);
}

.navbar-dark {
	background: linear-gradient(#0E1322 40%, transparent 80%);
}

.navbarOffsetExpanded {
	padding-top: 10px;
	top: 0px;
	transition: top var(--navbar-time), padding-top var(--navbar-time);
}

.navbarOffsetRetracted {
	padding-top: 0;
	top: -50px;
	transition: top var(--navbar-time), padding-top var(--navbar-time);
}

.flex {
	display: flex;
	justify-content: space-evenly;
	text-align: center;
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
