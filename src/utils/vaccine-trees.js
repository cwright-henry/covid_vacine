import { vaccineTypes } from './vaccine-types';
import { objectSorter } from './sorting';

const uuid = () => {
	return parseInt(Math.random().toString().slice(2, 11))
}

const incEntry = (entry, stage) => {
	entry.total += 1;
	switch (stage) {
		case "pre-clinical":
			entry.preClinical += 1;
			break;
		case "stage-1":
			entry.phase1 += 1;
			break;
		case "stage-1half2":
		case "stage-2":
			entry.phase2 += 1;
			break;
		case "stage-2half3":
		case "stage-3":
			entry.phase3 += 1;
			break;
		case "stage-rr":
			entry.approved += 1;
			break;
		case "stage-authorized":
			entry.phase4 += 1;
			break;
	}
};

const createBranch = (name, total, filter) => {
	return {
		id: uuid(),
		name,
		total,
		children: [],
		locked: false,
		filter
	};
}

const createLeaf = (name, total, filter) => {
	return {
		id: uuid(),
		name,
		total,
		locked: total === 0,
		filter
	};
}

export const createPhaseTree = (vaccines) => {
	const phases = {
		total: 0,
		preClinical: 0,
		phase1: 0,
		phase2: 0,
		phase3: 0,
		phase4: 0,
		approved: 0,
	};

	for (const vaccine of vaccines) {
		incEntry(phases, vaccine.stage);
	}

	const root = createBranch("Phases", phases.total);
	root.children.push(createLeaf('Phase IV', phases.phase4, { type: 'stage', stages: ['stage-authorized'] }));
	root.children.push(createLeaf('Regulatory Review', phases.approved, { type: 'stage', stages: ['stage-rr'] }));
	root.children.push(createLeaf('Phase III', phases.phase3, { type: 'stage', stages: ['stage-2half3', 'stage-3'] }))
	root.children.push(createLeaf('Phase II', phases.phase2, { type: 'stage', stages: ['stage-1half2', 'stage-2'] }));
	root.children.push(createLeaf('Phase I', phases.phase1, { type: 'stage', stages: ['stage-1'] }));
	root.children.push(createLeaf('Pre-Clinical', phases.preClinical, { type: 'stage', stages: ['pre-clinical'] }));

	return root;
}

export const createTypeTree = (vaccines) => {
	const types = [];
	const root = createBranch("Categories", vaccines.length);

	for (const vaccine of vaccines) {
		let entry = types.find((item) => item.type === vaccine.type);
		if (!entry) {
			const name = vaccineTypes[vaccine.type]
				? vaccineTypes[vaccine.type].name
				: vaccine.type;
			entry = {
				type: vaccine.type,
				name,
				total: 0,
				preClinical: 0,
				phase1: 0,
				phase2: 0,
				phase3: 0,
				phase4: 0,
				approved: 0,
			};
			types.push(entry);
		}
		incEntry(entry, vaccine.stage);
	}
	types.sort(objectSorter("total", "asc"));

	for (const vaccineType of types) {
		const branch = createBranch(vaccineType.name, vaccineType.total, { type: 'type', vaccine: vaccineType.type });
		branch.children.push(createLeaf('Phase IV', vaccineType.phase4, { type: 'type', vaccine: vaccineType.type, stages: ['stage-authorized'] }));
		branch.children.push(createLeaf('Regulatory Review', vaccineType.approved, { type: 'type', vaccine: vaccineType.type, stages: ['stage-rr'] }));
		branch.children.push(createLeaf('Phase III', vaccineType.phase3, { type: 'type', vaccine: vaccineType.type, stages: ['stage-2half3', 'stage-3'] }));
		branch.children.push(createLeaf('Phase II', vaccineType.phase2, { type: 'type', vaccine: vaccineType.type, stages: ['stage-1half2', 'stage-2'] }));
		branch.children.push(createLeaf('Phase I', vaccineType.phase1, { type: 'type', vaccine: vaccineType.type, stages: ['stage-1'] }));
		branch.children.push(createLeaf('Pre-Clinical', vaccineType.preClinical, { type: 'type', vaccine: vaccineType.type, stages: ['pre-clinical'] }));

		root.children.push(branch);
	}

	return root;
}

export const createFunderTree = (vaccines, funders) => {
	const root = createBranch("Funded By", vaccines.length);

	const list = Object.keys(funders).map((key) => {
		return {
			name: key,
			total: funders[key],
		};
	});

	for (const entry of list) {
		root.children.push(createLeaf(entry.name, entry.total, { type: 'fundedBy', name: entry.name }));
	}

	return root;
}