<template>
	<section class="covid-vacine-page">
		<div class="covid-vacine-sheet">
			<VacineHeader :vaccines="filteredVaccines" />
			<transition-group tag="ul" @enter="enter" :css="false">
				<li v-for="vacine of scrollableVaccines" :key="vacine.id">
					<div class="covid-vacine-list--header">
						<div class="covid-vacine-list--header__label">
							<label>Vaccine</label>
							<h1>{{ vacine.vaccine }}</h1>
						</div>
						<PhaseProgess :stage="vacine.stage" />
					</div>
					<div class="covid-vacine-list--info">
						<div class="covid-vacine-list--info__column">
							<label>Developed By</label>
							<div>{{ vacine.developer }}</div>
						</div>
					</div>
					<div class="covid-vacine-list--progress">
						<div>
							<v-tooltip right max-width="500" open-delay="250">
								<template v-slot:activator="{ on, attrs }">
									<v-chip
										color="#FFF59D"
										light
										v-bind="attrs"
										v-on="on"
										small
										class="elevation-4"
									>
										{{ getVaccineTypeName(vacine.type) }}
										<v-icon
											size="18"
											color="#333333"
											right
											class="ml-3"
											>mdi-comment-question</v-icon
										>
									</v-chip>
								</template>
								<span>{{
									getVaccineTypeDescription(vacine.type)
								}}</span>
							</v-tooltip>
							<v-tooltip right max-width="500" open-delay="250">
								<template v-slot:activator="{ on, attrs }">
									<v-chip
										color="#2E7D32"
										v-bind="attrs"
										v-on="on"
										small
										class="elevation-4 ml-4"
									>
										{{ getPhaseTypeName(vacine.stage) }}
										<v-icon
											size="18"
											color="#fff"
											right
											class="ml-3"
											>mdi-comment-question</v-icon
										>
									</v-chip>
								</template>
								<span>{{
									getPhaseTypeDescription(vacine.stage)
								}}</span>
							</v-tooltip>
						</div>
						<div class="covid-vacine-list--progress__updated">
							<span class="mr-4"
								>Last Updated
								{{ vacine.updated | dateShort }}</span
							>
							<v-btn
								text
								small
								color="#69F0AE"
								@click="
									vacine.showDetails = !vacine.showDetails
								"
								class="font-weight-light"
							>
								{{ vacine.showDetails ? "Less" : "More" }}
								<v-icon color="#69F0AE">{{
									vacine.showDetails
										? "mdi-menu-up"
										: "mdi-menu-down"
								}}</v-icon>
							</v-btn>
						</div>
					</div>
					<v-slide-y-transition>
						<div
							class="covid-vacine-list--info-more"
							v-show="vacine.showDetails"
						>
							<div class="covid-vacine-list--info__column">
								<label>Next Steps</label>
								<div>{{ vacine.nextSteps }}</div>
							</div>
							<div class="covid-vacine-list--info__column ml-12">
								<label>Related To</label>
								<div>
									{{
										vacine.relatedUse
											? vacine.relatedUse
											: "n/a"
									}}
								</div>
							</div>
							<div class="covid-vacine-list--info__column ml-12">
								<label>Funded By</label>
								<div>
									{{
										vacine.funder &&
										vacine.funder !== "Unknown"
											? vacine.funder
											: "n/a"
									}}
								</div>
							</div>
						</div>
					</v-slide-y-transition>
				</li>
			</transition-group>
		</div>
		<InfiniteScroll :hasNext="scrollable" @loadmore="loadMore" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/events";
import { vaccineTypes, phaseTypes } from "@/utils";
import PhaseProgess from "./PhaseProgress";
import VacineHeader from "./VacineHeader";
import InfiniteScroll from "./InfiniteScroll";

const SCROLL_AMOUNT = 10;
const ANIMATION_IN = "animate__zoomIn";

export default {
	data() {
		return {
			filter: null,
			scrollAmount: SCROLL_AMOUNT,
		};
	},
	computed: {
		...mapState(["vaccines"]),
		filteredVaccines() {
			if (this.filter) {
				return this.vaccines.filter((item) => {
					switch (this.filter.type) {
						case "stage":
							return this.filter.stages.some((filter) => {
								return item.stage === filter;
							});
						case "type":
							if (this.filter.vaccine === item.type) {
								if (this.filter.stages) {
									return this.filter.stages.some((filter) => {
										return item.stage === filter;
									});
								}
								return true;
							}
							return false;
						case "fundedBy":
							return item.entry.indexOf(this.filter.name) !== -1;
					}
				});
			}
			return this.vaccines;
		},
		scrollableVaccines() {
			return this.filteredVaccines.slice(0, this.scrollAmount);
		},
		scrollable() {
			return this.scrollAmount < this.filteredVaccines.length;
		},
	},
	mounted() {
		EventBus.$on("onFilterChange", (filter) => {
			this.filter = filter;
			document.documentElement.scrollTop = 0;
			this.scrollAmount = SCROLL_AMOUNT;
		});
	},
	components: {
		PhaseProgess,
		VacineHeader,
		InfiniteScroll,
	},
	methods: {
		getVaccineTypeName(type) {
			return vaccineTypes[type].name;
		},
		getVaccineTypeDescription(type) {
			return vaccineTypes[type].description;
		},
		getPhaseTypeName(type) {
			return phaseTypes[type].name;
		},
		getPhaseTypeDescription(type) {
			return phaseTypes[type].description;
		},
		loadMore() {
			this.scrollAmount += SCROLL_AMOUNT;
		},
		enter(el, done) {
			el.classList.add("animated", ANIMATION_IN);
			el.style.animationDuration = "0.75s";

			const handleAnimationEnd = () => {
				el.classList.remove("animated", ANIMATION_IN);
				el.removeEventListener("animationend", handleAnimationEnd);
				done();
			};
			el.addEventListener("animationend", handleAnimationEnd);
		},
	},
};
</script>

<style lang="less" scoped>
section {
	ul {
		li {
			border: solid #757575;
			background-color: #333333;
			border-width: 1px 1px 0 1px;
			overflow: hidden;
			width: 100%;
			padding: 12px;
			label {
				font-size: 11px;
				font-weight: 300;
				text-transform: uppercase;
				color: #fff9c4;
				margin: 0 0 2px;
			}
			&:first-child {
				border-radius: 4px 4px 0 0;
			}
			&:last-child {
				border-radius: 0 0 4px 4px;
				border-width: 1px 1px 1px 1px;
			}
			.covid-vacine-list--progress {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				.covid-vacine-list--progress__updated {
					font-size: 11px;
					color: #e0e0e0;
					display: flex;
					align-items: baseline;
				}
			}
			.covid-vacine-list--header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 0 32px;
				.covid-vacine-list--header__label {
					display: flex;
					flex-direction: column;
					h1 {
						font-size: 16px;
						font-weight: 400;
						max-width: 400px;
						color: #fff59d;
					}
				}
			}
			.covid-vacine-list--info {
				display: flex;
				justify-content: flex-start;
				font-size: 14px;
				margin: 0 0 24px;
				.covid-vacine-list--info__column {
					display: flex;
					flex-direction: column;
					width: 40%;
					max-width: 600px;
				}
			}
			.covid-vacine-list--info-more {
				display: flex;
				justify-content: flex-start;
				font-size: 14px;
				margin: 24px 0 0 0;
				.covid-vacine-list--info__column {
					display: flex;
					flex-direction: column;
					width: 30%;
					max-width: 600px;
				}
			}
		}
	}
}
</style>