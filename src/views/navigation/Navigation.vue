<template>
	<v-navigation-drawer
		v-model="drawer"
		app
		clipped
		hoverable
		fixed
		width="330"
		class="covid-vaccine-nav"
	>
		<div class="covid-vaccine-nav--controls">
			<v-bottom-navigation v-model="treeType" color="#00C853" grow>
				<v-btn>
					<span>Phases</span>
					<v-icon size="22">mdi-speedometer</v-icon>
				</v-btn>
				<v-btn>
					<span>Categories</span>
					<v-icon size="22">mdi-format-list-bulleted</v-icon>
				</v-btn>
				<v-btn>
					<span>Funded By</span>
					<v-icon size="22">mdi-account-cash</v-icon>
				</v-btn>
			</v-bottom-navigation>
		</div>
		<v-treeview
			dense
			shaped
			aria-label="Naviagtion Tree"
			:open.sync="initiallyOpen"
			activatable
			hoverable
			ref="tree"
			color="#FFEB3B"
			item-disabled="locked"
			active-class="covid-vaccine-nav--item__active"
			:items="items"
		>
			<template v-slot:label="{ item }">
				<div
					class="covid-vaccine-nav--item"
					:class="{ disabled: item.locked }"
					@click="select(item)"
				>
					<div :title="item.name">{{ item.name }}</div>
					<span
						>{{ item.total }}
						{{ item.total !== 1 ? "Vaccines" : "Vaccine" }}</span
					>
				</div>
			</template>
		</v-treeview>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { createPhaseTree, createTypeTree, createFunderTree } from "@/utils";
import EventBus from "@/events";

export default {
	data() {
		return {
			drawer: true,
			items: [],
			tree: [],
			initiallyOpen: [],
			treeType: 0,
		};
	},
	computed: {
		...mapState(["vaccines", "funders"]),
	},
	created() {
		this.typeTree = null;
		this.phaseTree = null;
		this.funderTree = null;
	},
	watch: {
		vaccines() {
			if (this.vaccines.length > 0) {
				this.createTrees();
			}
		},
		treeType() {
			this.setTreeType();
			EventBus.$emit("onFilterChange", null);
		},
	},
	mounted() {
		EventBus.$on("onToggleNavBar", () => {
			this.drawer = !this.drawer;
		});
		if (this.vaccines.length > 0) {
			this.createTrees();
		}
	},
	methods: {
		select(item) {
			if (!item.locked) {
				EventBus.$emit("onFilterChange", item.filter);
			}
		},

		createTrees() {
			this.typeTree = createTypeTree(this.vaccines);
			this.phaseTree = createPhaseTree(this.vaccines);
			this.funderTree = createFunderTree(this.vaccines, this.funders);
			this.setTreeType();
		},

		setTreeType() {
			switch (this.treeType) {
				case 0:
					this.items = [this.phaseTree];
					this.initiallyOpen = [this.phaseTree.id];
					break;
				case 1:
					this.items = [this.typeTree];
					this.initiallyOpen = [this.typeTree.id];
					break;
				case 2:
					this.items = [this.funderTree];
					this.initiallyOpen = [this.funderTree.id];
					break;
				default:
					this.items = [this.typeTree];
					this.initiallyOpen = [this.typeTree.id];
					break;
			}
		},
	},
};
</script>

<style lang="less">
.covid-vaccine-nav--controls {
	position: sticky;
	top: 0px;
	padding: 0 0 0px 0;
	z-index: 1;
	> div {
		background-color: #363636;
	}
}
.covid-vaccine-nav--item__active {
	.covid-vaccine-nav--item {
		font-weight: 400;
	}
}
.covid-vaccine-nav {
	.covid-vaccine-nav--item {
		display: flex;
		flex-direction: column;
		div {
			line-height: 1.2;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 240px;
		}
		span {
			font-size: 11px;
			color: #ffe082;
		}
		cursor: pointer;
		&.disabled {
			cursor: default;
			div {
				color: #BDBDBD;
				font-weight: 300;
			}
		}
	}
}
</style>