<template>
	<highcharts :options="options" :ref="ref"></highcharts>
</template>

<script>
import { uuid } from "@/utils";

const options = (vm) => {
	return {
		chart: {
			height: vm._props.height,
			backgroundColor: vm._props.backgroundColor,
		},
		title: {
			text: null,
		},
		credits: {
			enabled: false,
		},
		legend: {
			enabled: false,
		},
	};
};

export default {
	props: {
		vaccines: {
			type: Array,
			default: () => {
				return [];
			},
		},
		height: {
			type: String,
			default: "500",
		},
		backgroundColor: {
			type: String,
			default: "rgba(0, 0, 0, 0)",
		},
	},
	data() {
		return {
			options: options(this),
			ref: `covid-columnchart-${uuid()}`,
		};
	},
	watch: {
		vaccines() {
			this.render();
		},
	},
	mounted() {
		this.render();
	},
	methods: {
		render() {
			const chart = this.$refs[this.ref].chart;
			if (this.vaccines.length > 0) {
				this.clearSeries();
				setTimeout(() => {
					chart.addSeries({
						type: "treemap",
						layoutAlgorithm: "squarified",
						allowDrillToNode: true,
						animationLimit: 500,
						dataLabels: {
							enabled: false,
						},
						levelIsConstant: false,
						levels: [
							{
								level: 1,
								dataLabels: {
									enabled: true,
								},
								borderWidth: 1,
							},
						],
						data: this.createVaccineTree(),
					});
					chart.reflow();
				}, 400); // Synchronize with transitions else main thread will be blocked
			}
		},

		clearSeries() {
			const chart = this.$refs[this.ref].chart;
			while (chart.series.length > 0) {
				chart.series[0].remove(false);
			}
		},

		createVaccineTree() {
			const typeTree = [];
			for (const vaccine of this.vaccines) {
				const parent = typeTree.find(
					(item) => item.name === vaccine.type
				);
				if (!parent) {
					const root = {
						id: `${uuid()}`,
						name: vaccine.type,
						color: "green",
					};
					const branch = {
						id: `${uuid()}`,
						parent: root.id,
						name: vaccine.stage,
					};
					const leaf = {
						id: `${uuid()}`,
						parent: branch.id,
						name: vaccine.vaccine,
						value: 1,
					};

					typeTree.push(root);
					typeTree.push(branch);
					typeTree.push(leaf);
				} else {
					const parentBranch = typeTree.find(
						(item) =>
							item.parent === parent.id &&
							item.name === vaccine.stage
					);
					if (!parentBranch) {
						const branch = {
							parent: parent.id,
							id: `${uuid()}`,
							name: vaccine.stage,
						};
						const leaf = {
							id: `${uuid()}`,
							parent: branch.id,
							name: vaccine.vaccine,
							value: 1,
						};
						typeTree.push(branch);
						typeTree.push(leaf);
					} else {
						const leaf = {
							id: `${uuid()}`,
							parent: parentBranch.id,
							name: vaccine.vaccine,
							value: 1,
						};
						typeTree.push(leaf);
					}
				}
			}
			return typeTree;
		},
	},
};
</script>

