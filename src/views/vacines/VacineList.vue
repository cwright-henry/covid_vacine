<template>
	<section class="covid-vacine-page">
		<div class="covid-vacine-sheet">
			<VacineHeader
				:vaccines="filteredVaccines"
				@onFilterChange="filterVaccines"
			/>
			<ul>
				<li v-for="(vacine, index) of filteredVaccines" :key="index">
					<div class="covid-vacine-list--header">
						<div class="covid-vacine-list--header__label">
							<label>Vaccine</label>
							<h1>{{ vacine.vaccine }}</h1>
						</div>
						<PhaseProgess :stage="vacine.stage" />
					</div>
					<div class="covid-vacine-list--info">
						<div class="covid-vacine-list--info__column">
							<label>Manufactured By</label>
							<div>{{ vacine.developer }}</div>
						</div>
						<div class="covid-vacine-list--info__column ml-12">
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
									vacine.funder && vacine.funder !== "Unknown"
										? vacine.funder
										: "n/a"
								}}
							</div>
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
										color="#43A047"
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
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import { vaccineTypes, phaseTypes } from "@/utils";
import PhaseProgess from "./PhaseProgress";
import VacineHeader from "./VacineHeader";

export default {
	data() {
		return {
			filter: null,
		};
	},
	computed: {
		...mapState(["vaccines"]),
		filteredVaccines() {
			if (this.filter) {
				return this.vaccines.filter((item) => {
					return item.entry.indexOf(this.filter) !== -1;
				});
			}
			return this.vaccines;
		},
	},
	components: {
		PhaseProgess,
		VacineHeader,
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
		filterVaccines(filter) {
			this.filter = filter;
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
				color: #e0e0e0;
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
				align-items: flex-end;
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
				justify-content: space-between;
				font-size: 14px;
				margin: 0 0 24px;
				.covid-vacine-list--info__column {
					display: flex;
					flex-direction: column;
					width: 25%;
				}
			}
		}
	}
}
</style>