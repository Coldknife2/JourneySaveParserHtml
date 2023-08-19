<template>
	<div class="navbar" :class="{ navbarOffsetRetracted: !isDisplayed, navbarOffsetExpanded: isDisplayed }">
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
			isDisplayed: useNavBarExpanded(),
			paths: [
				{ p: "/editor/", n: "Editor" },
				{ p: "/stats/",  n: "Statistics" },
				{ p: "/",        n: "Parser" },
				{ p: "/help/",   n: "Help" },
				{ p: "/about/",  n: "About" },
			],
			navBarClicked: useNavBarClicked(),
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
