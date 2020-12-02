<template>
	<header class="covid-vacine-header">
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
					<label>Review</label>
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
	</header>
</template>

<script>
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
		};
	},
	computed: {
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
				this.approved = this.stages["stage-rr"] || 0;
				this.phase4 = this.stages["stage-4"] || 0;
			},
			immediate: true,
		},
	},
};
</script>

<style lang="less" scoped>
.covid-vacine-header {
	margin: 0 0 16px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
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