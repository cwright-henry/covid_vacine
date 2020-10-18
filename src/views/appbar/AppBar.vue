<template>
	<v-app-bar app fixed color="#212121" class="covid-vacine-appbar">
		<div class="covid-vacine-appbar--header">
			<h1>
				<v-icon size="22" color="yellow" class="mx-2"
					>mdi-needle</v-icon
				>
				Covid 19 Vaccine Watch
				<span>...more than one vaccine will be required!</span>
				<img src="@/assets/covid.png" height="24" width="24" />
			</h1>
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
		width: 100%;
		h1 {
			font-size: 28px;
			font-weight: 400;
			margin: 4px 0;
			position: relative;
			display: flex;
			align-items: baseline;

			img {
				position: absolute;
				right: 4px;
				top: 8px;
				animation: spin 24s linear infinite;
			}

			span {
				font-size: 16px;
				padding: 0 0 0 16px;
				font-style: italic;
				font-weight: 300;
			}
		}
	}
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>