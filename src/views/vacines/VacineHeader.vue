<template>
	<section>
		<div class="covid-vacine-header">
			<div class="covid-vacine-header--select">
				<v-select
					:items="fundersList"
					outlined
					v-model="fundedBy"
					label="Funded By"
					hide-details
					color="#e0e0e0"
					clearable
					@click:clear="resetFilter"
					ref="fundersList"
				>
					<template v-slot:item="data">
						<div class="covid-vacine-header--list-item">
							<v-icon size="16" color="#FFE082" class="mr-4"
								>mdi-account-cash</v-icon
							>
							<div>
								<div>
									{{ data.item.text }}
								</div>
								<label
									><span>{{ data.item.count | number }}</span
									>{{
										data.item.count > 1
											? "Vaccines"
											: "Vaccine"
									}}</label
								>
							</div>
						</div>
					</template>
					<template v-slot:selection="data">
						<div class="covid-vacine-header--list-item">
							<v-icon size="16" color="#FFE082" class="mr-4"
								>mdi-account-cash</v-icon
							>
							<div>
								<div class="selected-text">
									{{ data.item.text }}
								</div>
								<label
									><span>{{ data.item.count | number }}</span
									>{{
										data.item.count > 1
											? "Vaccines"
											: "Vaccine"
									}}</label
								>
							</div>
						</div>
					</template>
				</v-select>
			</div>
			<ul>
				<li>
					<div>
						<label>Pre Clinical</label>
						<span>{{ preClinical | number }}</span>
					</div>
				</li>
				<li>
					<div class="ml-4">
						<label>Phase I</label>
						<span>{{ phase1 | number }}</span>
					</div>
				</li>
				<li>
					<div class="ml-4">
						<label>Phase II</label>
						<span>{{ phase2 | number }}</span>
					</div>
				</li>
				<li>
					<div class="ml-4">
						<label>Phase III</label>
						<span>{{ phase3 | number }}</span>
					</div>
				</li>
				<li>
					<div class="ml-4">
						<label>Approved</label>
						<span>{{ approved || 0 | number }}</span>
					</div>
				</li>
				<li>
					<div class="ml-4">
						<label>Phase IV</label>
						<span>{{ phase4 || 0 | number }}</span>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: {
		vaccines: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			preClinical: 0,
			phase1: 0,
			phase2: 0,
			phase3: 0,
			approved: 0,
			phase4: 0,
			fundedBy: null,
			fundersList: [],
		};
	},
	computed: {
		...mapState(["funders"]),
		stages() {
			return this.vaccines.reduce((acc, { stage }) => {
				acc[stage] = (acc[stage] || 0) + 1;
				return acc;
			}, {});
		},
	},
	watch: {
		stages: {
			handler() {
				this.preClinical = this.stages["pre-clinical"] || 0;
				this.phase1 = this.stages["stage-1"] || 0;
				this.phase2 =
					(this.stages["stage-2"] || 0) +
					(this.stages["stage-1half2"] || 0);
				this.phase3 =
					(this.stages["stage-3"] || 0) +
					(this.stages["stage-2half3"] || 0);
				this.approved = this.stages["stage-4"] || 0;
				this.phase4 = this.stages["stage-5"] || 0;
			},
			immediate: true,
		},

		funders: {
			handler() {
				this.fundersList = Object.keys(this.funders).map((key) => {
					return {
						value: key,
						text: key,
						count: this.funders[key],
					};
				});
			},
			deep: true,
			immediate: true,
		},

		fundedBy() {
			this.$emit("onFilterChange", this.fundedBy);
		},
	},
	methods: {
		resetFilter() {
			this.fundedBy = null;
			this.$emit("onFilterChange", this.fundedBy);
			setTimeout(() => {
				this.$refs["fundersList"].blur();
			}, 0);
		},
	},
};
</script>

<style lang="less">
.covid-vacine-header--list-item {
	display: flex;
	padding: 8px 0;
	position: relative;
	> div {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
		color: #fff;
		label {
			font-size: 11px;
			color: #ffe082;
			span {
				display: inline-block;
				margin-right: 4px;
			}
		}
	}
	.selected-text {
		overflow: hidden !important;
		white-space: nowrap;
		width: 270px;
		text-overflow: ellipsis;
	}
}
</style>

<style lang="less" scoped>
.covid-vacine-header {
	margin: 0 0 16px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	.covid-vacine-header--select {
		width: 400px;
	}
	ul {
		display: flex;
		justify-content: flex-end;
		li {
			> div {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 6px 12px;
				border-radius: 4px;
				width: 90px;
				border: 1px solid #757575;
				background-color: #333333;
				label {
					font-size: 13px;
					font-weight: 300;
					margin: 0 0 4px;
				}
				span {
					font-size: 18px;
				}
			}
		}
	}
}
</style>