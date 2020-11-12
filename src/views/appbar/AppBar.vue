<template>
	<v-app-bar app clipped-left prominent fixed class="covid-vacine-appbar">
		<v-app-bar-nav-icon
			aria-label="Toggle Side Navigation"
			color="#fff"
			@click="toggleNavBar"
		></v-app-bar-nav-icon>
		<div class="covid-vacine-appbar--header">
			<h1>
				Covid 19 Vaccine Watch
				<img
					src="@/assets/covid.png"
					alt="Covid 19 Image"
					height="24"
					width="24"
				/>
			</h1>
			<div class="covid-vacine-appbar--info">
				<h2>
					{{ vaccines.length | number }} Vaccines under development
					<span>...we’ll need more than one vaccine to inoculate the planet!</span>
				</h2>
				<Performance v-if="supportsMemory" class="mr-2 mt-2" />
			</div>
		</div>
	</v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/events";
import Performance from "./Performance";

export default {
	methods: {
		toggleNavBar() {
			EventBus.$emit("onToggleNavBar");
		},
	},
	components: {
		Performance,
	},
	computed: {
		...mapState(["vaccines"]),
		supportsMemory() {
			return window.performance && window.performance.memory;
		},
	},
};
</script>

<style lang="less">
.covid-vacine-appbar {
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
		}
	}
	.covid-vacine-appbar--info {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		h2 {
			font-size: 22px;
			font-weight: 300;
			color: #fff9c4;
			span {
				font-size: 14px;
				padding: 0 0 0 12px;
				font-style: italic;
				font-weight: 300;
				color:#ffffff;
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