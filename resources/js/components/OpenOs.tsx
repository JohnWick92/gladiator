import { Button } from "@/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import type {
	omType,
	requestType,
	userType,
	workshopType,
} from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

type openProps = {
	request: requestType;
	user: userType;
	workshops: workshopType[];
	oms: omType[];
};

export default function OpenOs({ oms, workshops, user, request }: openProps) {
	const [priority, setPriority] = useState("4 - Baixa");
	const [workshopCode, setWorkshopCode] = useState(workshops[0]?.code);
	const [omCode, setOmCode] = useState(user.code_om);
	const priorityArr = [
		"0 - Execução imediata",
		"1 - Urgente",
		"2 - Alta",
		"3 - Média",
		"4 - Baixa",
	];

	function open() {
		const payload = {
			priority,
			nip: user.nip,
			code_om: omCode,
			code_workshop: workshopCode,
			code_request: request.code,
		};
		router.post("/os", payload);
	}

	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Abrir OS
			</DialogTrigger>
			<DialogContent aria-describedby={undefined}>
				<DialogTitle className="text-center">Abrir OS</DialogTitle>
				<div className="w-full m-auto p-5 mt-10">
					<div className="flex w-full justify-center mb-5">
						<div className="text-left w-1/4">Prioridade</div>
						<select
							className="w-full ml-5 h-6 rounded-md border border-input text-center"
							onChange={(e) => setPriority(e.target.value)}
						>
							{priorityArr?.map((item) => {
								return (
									<option key={item} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex justify-center mb-5 gap-5">
						<div className="text-left w-1/4">Oficina</div>
						<select
							className="w-full h-6 rounded-md border border-input text-center "
							onChange={(e) => setWorkshopCode(Number.parseInt(e.target.value))}
						>
							{workshops
								?.filter((item) => {
									return item.code_om === omCode;
								})
								.map((workshop) => {
									return (
										<option key={workshop.code} value={workshop.code}>
											{workshop.description}
										</option>
									);
								})}
						</select>
					</div>
					<div className="flex justify-center mb-5">
						<div className="text-left w-1/4">OM</div>
						<select
							disabled={!(user.profile_description === "Administrador")}
							className="w-full ml-5 h-6 rounded-md border border-input text-center"
							onChange={(e) => setOmCode(Number.parseInt(e.target.value))}
							defaultValue={user.code_om}
						>
							{oms?.map((om) => {
								return (
									<option key={om.code} value={om.code}>
										{om.acronym}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex mt-10">
						<Button className="w-full mr-5" type="button" onClick={open}>
							Abrir
						</Button>
						<DialogClose
							className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
                            font-medium ring-offset-background transition-colors focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
                            disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Cancelar
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
