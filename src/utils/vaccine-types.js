export const vaccineTypes = {
	'inactivated-virus': {
		name: 'Inactivated Virus',
		description: 'This type of vaccine consists of the disease-causing virus that has been killed (with heat or chemicals), so it won’t make you sick, and can be used in people that may not be able to use a live attenuated virus vaccine (e.g., those who are immunocompromised). In general, inactivated virus vaccines do not provide as strong of an immune response as live attenuated virus vaccines, so additional doses of the vaccine may be needed to get a strong enough immune response. Still, they may be safer for some people.'
	},
	'non-replicating-viral-vector': {
		name: 'Non-Replicating Viral Vector',
		description: 'Non-replicating viral vector vaccines use a killed viral vector to deliver the viral genetic blueprint into cells. Since the vector cannot replicate, in general this type of vaccine does not provide as long-lasting immunity as replicating viral vector vaccines. Therefore, booster shots may be needed to provide ongoing protection against the virus.'
	},
	'rna-based-vaccine': {
		name: 'RNA-Based Vaccine',
		description: 'RNA-based vaccines work similarly to DNA-based vaccines, but instead of using DNA, they use a related nucleic acid called RNA, and instead of using plasmids to get into cells, they use fatty molecules (called lipids). Once RNA vaccines are injected into vaccinated people, cells take in the RNAs and follow their instructions to build viral proteins to trigger an immune response.'
	},
	'protein-subunit': {
		name: 'Protein Subunit',
		description: 'Protein subunit vaccines are similar to inactivated virus vaccines in that they do not contain live viruses. Instead, protein fragments of a killed virus are introduced into the vaccinated person to trigger an immune response that will recognize the protein fragments and therefore recognize the virus.'
	},
	'dna-based': {
		name: 'DNA-Based Vaccine',
		description: 'DNA- based vaccines work by inserting a genetically engineered blueprint of viral gene(s) into small DNA molecules(called plasmids) for injection into vaccinated people.Cells take in the DNA plasmids and follow their instructions to build viral proteins, which the immune system recognizes as foreign, triggering the immune response that protects against the disease.'
	},
	'replicating-viral-vector': {
		name: 'Replicating Viral Vector',
		description: 'Replicating viral vector vaccines use a live but weakened viral vector to carry the viral genetic blueprint into cells. Since the viral vector can replicate within cells, the production of viral proteins will be robust, in general producing a stronger immune response against the virus than with a non-replicating viral vector.'
	},
	'virus-like-particle': {
		name: 'Virus-Like Particle',
		description: 'Another type of vaccine that uses only parts of the virus, virus-like particle (VLP) vaccines also do not contain live viruses (they lack the viral genetic material required to replicate) but resemble the virus closely enough (i.e., they mimic the outer shell of the virus) to trigger an immune response without causing disease.'
	},
	'live-atten': {
		name: 'Live Attenuated Virus',
		description: 'Vaccines work by introducing a foreign protein (an “antigen”) into vaccinated people to trigger an immune response to that antigen. This immune response remembers the foreign protein, and when it sees it again (when a person comes into contact with the virus), it will protect the vaccinated person from developing the disease by recognizing the virus and targeting it for destruction. One way to do this is to simply infect people with a live but weakened (“attenuated”) virus that can still reproduce (make copies of itself) and activate a strong immune response but should not make people sick.'
	},
	'other': {
		name: 'Other',
		description: 'This “other” vaccine category is a catchall for anything that doesn’t fit neatly into the other product categories, including those for which details about the vaccine are not yet publicly available.'
	}
};