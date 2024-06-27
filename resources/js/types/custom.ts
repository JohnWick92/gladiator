export type omType = {
	code: number;
	description: string;
	acronym: string;
};

export type sectorType = {
	code: number;
	description: string;
	acronym: string;
	code_om: number;
};

export type userType = {
	nip: string;
	code_om: number;
	name: string;
	email: string;
	password: string;
	branch: string;
	profile_description: string;
	active: boolean;
	code_sector: number;
	code_workshop?: number;
	solver: boolean;
};
