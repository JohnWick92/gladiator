import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { router } from "@inertiajs/react";
import { useState } from "react";

type props = {
	code_os: number;
	current_status: string;
	nip: string;
};

function Status({ code_os, current_status, nip }: props) {
	const status = [
		"Em andamento",
		"Aberta",
		"Aguardando confecção de processo",
		"Aguardando atendimento de processo",
	];
	const [osStatus, setOsStatus] = useState("Aberta");

	async function update() {
		const payload = {
			status: osStatus,
			nip,
		};
		router.put(`/os/manage/status/${code_os}`, payload);
	}

	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Status
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="flex-col p-20">
				<DialogTitle className="text-center">Alterar status da OS</DialogTitle>
				<select
					onChange={(e) => setOsStatus(e.target.value)}
					defaultValue={status.find(
						(item) => item.toString() === current_status.toString(),
					)}
				>
					{status.map((item) => {
						return (
							<option key={item} value={item}>
								{item}
							</option>
						);
					})}
				</select>
				<DialogClose
					className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					onClick={update}
				>
					Alterar
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}

export default Status;
