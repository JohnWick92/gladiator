import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Textarea } from "@/shadcn/ui/textarea";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

type rateProps = {
	nip: string;
	code_request: number;
};

export default function Rate(props: rateProps) {
	const [complaint, setComplaint] = useState("");
	const [satisfaction, setSatisfaction] = useState("Muito");
	const [valid, setValid] = useState(false);
	const satisfactionArray = ["Muito", "Regular", "Ruim"];

	function rate() {
		let payload = {
			complaint,
			satisfaction,
		};
		router.put(`/request/close/${props.code_request}`, payload);
	}

	useEffect(() => setValid(complaint !== ""), [complaint]);

	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Avaliar
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="w-full h-2/5">
				<DialogTitle className="text-center">Avalie a OS</DialogTitle>
				<div className="flex m-auto gap-3">
					Satisfação
					<select
						className="rounded-sm"
						onChange={(e) => setSatisfaction(e.target.value)}
					>
						{satisfactionArray?.map((item) => {
							return (
								<option key={item} value={item}>
									{item}
								</option>
							);
						})}
					</select>
				</div>
				<Textarea
					className="w-full h-full my-5"
					placeholder="Reclamações/sugestões ?"
					value={complaint}
					onChange={(e) => setComplaint(e.target.value)}
				/>
				<DialogClose
					className="mt-10 hover:bg-emerald-500 w-1/2 mx-auto bg-primary text-primary-foreground h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					type="button"
					disabled={!valid}
					onClick={rate}
				>
					Avaliar
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
