import { Button } from "@/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Textarea } from "@/shadcn/ui/textarea";
import type { osType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

type observationProps = {
	os: osType;
	nip: string;
	profile: string;
};

function Observation(props: observationProps) {
	const [observationAux, setObservationAux] = useState(
		props.os.observation_solver,
	);
	const [observation, setObservation] = useState(
		props.os.observation_in_charge,
	);

	function save() {
		let observationToSave;
		if (props.profile === "Aux. Oficina") {
			observationToSave = observationAux;
		} else {
			observationToSave = observation;
		}
		const payload = {
			nip: props.nip,
			message: observationToSave,
		};
		router.put(`/os/manage/msg/${props.os.code}`, payload);
	}

	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Observações
			</DialogTrigger>
			<DialogContent aria-describedby={undefined}>
				<DialogTitle className="text-center">Observações da OS</DialogTitle>
				<ScrollArea className="h-full">
					<div className="w-full m-auto">
						<div className="w-full">
							<p>Observações encarregado</p>
							<Textarea
								disabled={props.profile === "Aux. Oficina"}
								className="border-2 border-slate-500 h-40 my-5 text-xl"
								value={observation}
								onChange={(e) => setObservation(e.target.value)}
							/>
						</div>
					</div>
					<div className="w-full m-auto">
						<div className="w-full">
							<p>Observações solucionadores</p>
							<Textarea
								disabled={props.profile !== "Aux. Oficina"}
								className="border-2 border-slate-500 h-40 my-5 text-xl"
								value={observationAux}
								onChange={(e) => setObservationAux(e.target.value)}
							/>
						</div>
						<div className="flex m-auto">
							<DialogClose
								className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex
                                items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background
                                transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-1/2 m-auto"
								type="button"
								onClick={save}
							>
								Salvar
							</DialogClose>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

export default Observation;
