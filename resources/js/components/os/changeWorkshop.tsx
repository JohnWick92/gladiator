import { Button } from "@/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { userType, workshopType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

type props = {
	code_os: number;
	workshops: workshopType[];
	current_workshop: number;
	user: userType;
};

function ChangeWorkshop({ code_os, current_workshop, workshops, user }: props) {
	const [codeWorkshop, setCodeWorkshop] = useState(current_workshop);

	function update() {
		const payload = {
			nip: user.nip,
			code_workshop: codeWorkshop,
		};
		router.put(`/os/manage/workshop/${code_os}`, payload);
	}

	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				disabled={user.profile_description === "Aux. Oficina"}
			>
				Oficina
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="flex-col p-20">
				<DialogTitle className="text-center">Alterar oficina da OS</DialogTitle>
				<select
					onChange={(e) => setCodeWorkshop(Number.parseInt(e.target.value))}
					defaultValue={
						workshops.find((item) => item.code === current_workshop)?.code
					}
				>
					{workshops.map((workshop) => {
						return (
							<option key={workshop.code} value={workshop.code}>
								{workshop.description}
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

export default ChangeWorkshop;
