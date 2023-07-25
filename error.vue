<template>
	<NavBar />
	<div class="container">
		<div class="text">It seems like this page was lost in the sands...</div>
		<NuxtLink to="/" class="hov hovLight cursorPointer">Go back home</NuxtLink>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	font-size: var(--font-size--heading);
}

a,
a:visited {
	color: #ffffff;
	text-decoration: none;
	padding: 5px 20px;
}
</style>
