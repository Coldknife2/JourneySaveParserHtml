<template>
	<div class="wrapper">
		<div class="column">
			<div class="general">
				<StatsGeneralDisplay />
			</div>
			<div class="journey">
				<StatsJourneyDisplay />
			</div>
			<div class="misc">
				<StatsMiscDisplay />
			</div>
		</div>
		<div class="column">
			<div class="symbols">
				<StatsSymbolDisplay />
			</div>
			<div class="murals">
				<StatsMuralDisplay />
			</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
}

.column {
  flex: 50%
}
.general,
.symbols {
	margin-top: 4vh;
}

.general,
.journey,
.misc {
	height: 30vh;
	margin-left: 3vw;
}

.symbols,
.murals {
	height: 45vh;
}
</style>
