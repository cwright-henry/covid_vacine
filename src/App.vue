<template>
	<v-app>
		<AppBar/>
		<v-main>
			<v-container fluid>
				<div class="covid-vacine-perspective">
					<transition :name="transitionName">
						<keep-alive>
							<router-view></router-view>
						</keep-alive>
					</transition>
				</div>
			</v-container>
		</v-main>
		<v-snackbar
			v-model="notification"
			top
			:timeout="timeout"
			:color="color"
		>
			{{ text }}
			<v-btn text @click="notification = false">Close</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
import { load } from "@/services/Api";
import EventBus from "@/events";
import AppBar from "@/views/appbar/AppBar";

const VACINE_API = "/covid/api/covid-vaccine-data";

export default {
	name: "App",
	data() {
		return {
			notification: false,
			timeout: 8000, // Allow 10 seconds to read error message
			text: "",
			color: "#F44336",
			transitionName: null,
		};
	},
	components: {
		AppBar,
	},
	mounted() {
		EventBus.$on("onError", (error) => {
			this.notification = true;
			this.text = error;
		});
	},
	async created() {
		const vaccines = await load(VACINE_API);
		this.$store.commit("setVaccines", vaccines);
		this.$router.beforeEach((to, from, next) => {
			this.transitionName = "fade";
			next();
		});
	},
};
</script>

<style lang="less">
html,
body {
	min-height: 100%;
	scroll-behavior: auto;
	background-color: #121212;
}
ul {
	padding: 0 !important;
	margin: 0;
	list-style: none;
}
:root {
	--app-header-color: #b3e5fc;
	--nav-region-header-color: #e1f5fe;
	--section-header-color: #b3e5fc;
	--link-color: #64b5f6;
}
[v-cloak] {
	display: none;
}
.covid-vacine-link {
	text-decoration: none;
	padding: 2px 0;
	display: flex;
}
.covid-vacine-perspective {
	position: relative;
	max-width: 1750px;
	margin: 0 auto;
	perspective: 1200px;
	.covid-vacine-page {
		width: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		padding-bottom: 48px;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
		transform-style: preserve-3d;
		will-change: transform, opacity;
		.covid-vacine-sheet {
			width: 100%;
			border-radius: 4px;
			padding: 8px;
			overflow: hidden;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.175s;
	transition-property: opacity;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition-duration: 0.375s;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
	overflow: hidden;
	position: absolute;
	width: 100%;
}

.slide-left-enter,
.slide-right-leave-active {
	opacity: 0;
	transform: translate(80%, 0) !important;
}

.slide-left-leave-active,
.slide-right-enter {
	opacity: 0;
	max-width: 1750px;
	transform: translate(-80%, 0) !important;
}
</style>
