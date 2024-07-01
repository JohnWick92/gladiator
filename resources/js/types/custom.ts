export type omType = {
	code: number;
	description: string;
	acronym: string;
};

export type sectorType = {
	code: number;
	description: string;
	acronym: string;
	oms?: omType;
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
	oms?: omType;
	sectors?: sectorType;
	workshops?: workshopType;
};

export type workshopType = {
	code: number;
	description: string;
	active: boolean;
	code_om: number;
	oms?: omType;
};

export type materialType = {
	code: string;
	unit: string;
	value: number;
	description: string;
	active: boolean;
};

export type requestType = {
	location: string;
	request_date: Date;
	nip: string;
	description: string;
	accepted: boolean;
	resolution: string;
	canceled: boolean;
	code: number;
	priority: string;
	closed: boolean;
	users?: userType;
};

export type solversType = {
	code: number;
	nip: string;
	users?: userType;
	name: string;
	code_os: number;
};

export type osType = {
	code: number;
	code_request: number;
	code_workshop: number;
	status: string;
	completion_date: Date;
	observation_solver: string;
	observation_in_charge: string;
	priority: string;
	satisfaction: string;
	complaint: string;
	closed: boolean;
	solved: boolean;
	code_om: number;
	canceled: boolean;
	req_canceled: boolean;
	oms?: omType;
	workshops?: workshopType;
	requests?: requestType;
	materials_os?: materialOsType[];
	solver_os?: solversType[];
};

export type materialOsType = {
	code: number;
	code_os: number;
	code_material: string;
	amount: number;
	quantity_used: number;
	used: boolean;
	order_date: Date;
};
