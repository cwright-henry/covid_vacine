<template>
	<div class="covid-vaccine--stages">
		<span :class="getPhase1()"></span>
		<span :class="getPhase2()"></span>
		<span :class="getPhase3()"></span>
		<span :class="getPhase4()"></span>
		<span :class="getPhase5()"></span>
		<span :class="getPhase6()"></span>
	</div>
</template>

<script>
export default {
	props: {
		stage: {
			type: String,
			default: null,
		},
	},
	computed: {
		level() {
			switch (this.stage) {
				case "stage-authorized":
					return 6;
				case "stage-rr":
					return 5;
				case "stage-3":
					return 4;
				case "stage-2half3":
					return 3.5;
				case "stage-2":
					return 3;
				case "stage-1half2":
					return 2.5;
				case "stage-1":
					return 2;
				case "pre-clinical":
					return 1;
				default:
					return 0;
			}
		},
	},
	methods: {
		getPhase1() {
			if (this.level === 1) {
				return "partial";
			}
			else if (this.level > 1) {
				return "complete";
			}
		},
		getPhase2() {
			if (this.level === 2) {
				return "partial";
			}
			else if (this.level === 2.5) {
				return "partial";
			}
			else if (this.level > 2.5) {
				return "complete";
			}
		},
		getPhase3() {
			if (this.level === 2.5) {
				return "partial";
			}
			if (this.level === 3.5) {
				return "partial";
			}
			else if (this.level === 3) {
				return "partial";
			}
			else if (this.level > 3.5) {
				return "complete";
			}
		},
		getPhase4() {
			if (this.level === 3.5) {
				return "partial";
			}
			else if (this.level === 4) {
				return "partial";
			}
			else if (this.level > 4) {
				return "complete";
			}
		},
		getPhase5() {
			if (this.level === 5) {
				return "partial";
			}
			else if (this.level >= 5) {
				return "complete";
			}
		},
		getPhase6() {
			if (this.level === 6) {
				return "partial";
			}
			else if (this.level >= 6) {
				return "complete";
			}
		},
	},
};
</script>

<style lang="less">
.covid-vaccine--stages {
	display: flex;
	justify-content: space-evenly;
	border: 1px solid #fff176;
	border-radius: 4px;
	height: 8px;
	margin: 32px 0 8px 0;
	width: 50%;
	span {
		background-color: #ffffff;
		display: inline-block;
		width: 100%;
		position: relative;
		font-size: 11px;
		font-weight: 300;
		&.complete {
			background-color: #00e676;
		}
		&.partial {
			background-color: #ffc107;
		}
		&:nth-child(1) {
			border-radius: 4px 0 0 4px;
		}
		&:nth-child(6) {
			border-radius: 0 4px 4px 0;
		}
		&:nth-child(1)::before {
			content: "Pre Clinical";
			left: calc(50% - 26px);
		}
		&:nth-child(2)::before {
			content: "Phase I";
			left: calc(50% - 18px);
		}
		&:nth-child(3)::before {
			content: "Phase II";
			left: calc(50% - 19px);
		}
		&:nth-child(4)::before {
			content: "Phase III";
			left: calc(50% - 21px);
		}
		&:nth-child(5)::before {
			content: "In Review";
			left: calc(50% - 21px);
		}
		&:nth-child(6)::before {
			content: "Phase IV";
			left: calc(50% - 21px);
		}
		&::before {
			position: absolute;
			top: -24px;
		}
		&::after {
			position: absolute;
			top: -8px;
			left: 50%;
			content: "";
			border-right: 1px solid #fff176;
			height: 8px;
		}
	}
}
</style>