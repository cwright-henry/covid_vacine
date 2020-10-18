import Vue from 'vue'
import Vuex from 'vuex'
import { objectSorter } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		vaccines: [],
		stages: {},
		types: {},
		funders: {}
	},
	mutations: {
		setVaccines(state, vaccines) {
			state.vaccines = vaccines.sort(objectSorter('stage', 'asc', 'updated', 'desc'));
			state.stages = vaccines.reduce((acc, { stage }) => {
				acc[stage] = (acc[stage] || 0) + 1;
				return acc;
			}, {});
			state.types = vaccines.reduce((acc, { type }) => {
				acc[type] = (acc[type] || 0) + 1;
				return acc;
			}, {});
			const funders = vaccines.reduce((acc, { funder }) => {
				const split_1 = funder.split('/');
				for (let splits1 of split_1) {
					const split_2 = splits1.split(';');
					for (let splits2 of split_2) {
						splits2 = splits2.replace(/"/g, "").trim();
						acc[splits2] = (acc[splits2] || 0) + 1;
					}
				}
				return acc;
			}, {});
			const operationWarpSpeed = vaccines.filter(item => {
				return item.entry.indexOf('Warp Speed') !== -1;
			});
			funders['Operation Warp Speed'] = operationWarpSpeed.length;
			const sortedFunder = {}
			Object.keys(funders).sort().forEach(function (key) {
				sortedFunder[key] = funders[key];
			});
			state.funders = sortedFunder;
		},
	},
	actions: {
	},
	modules: {
	}
})
