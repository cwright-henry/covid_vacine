<template>
	<v-app-bar app fixed color="#212121" class="covid-vacine-appbar">
		<div class="covid-vacine-appbar--header">
			<v-icon size="22" color="yellow" class="mx-2"
				>mdi-needle</v-icon
			>
			<h1>Covid 19 Vaccine Watch</h1>
		</div>
	</v-app-bar>
</template>

<script>
export default {};
</script>

<style lang="less">
.covid-vacine-appbar {
	border-bottom: 1px solid #424242 !important;
	.covid-vacine-appbar--header {
		display: flex;
		align-items: center;
		h1 {
			font-weight: 400;
			font-size: 24px;
		}
	}
}
</style>