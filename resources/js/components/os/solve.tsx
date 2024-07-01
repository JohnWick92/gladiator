import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Textarea } from "@/shadcn/ui/textarea";
import { osType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

type solvedProps = {
	os: osType;
	nip: string;
};

function Solved(props: solvedProps) {
	const [resolution, setResolution] = useState("");
	const [valid, setValid] = useState(false);

	function close() {
		const payload = {
			nip: props.nip,
			resolution,
		};
		router.put(`/os/manage/solve/${props.os.code}`, payload);
	}

	useEffect(() => setValid(resolution !== ""), [resolution]);

	return (
		<Dialog>
			<DialogTrigger
				className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Fechar OS
			</DialogTrigger>
			<DialogContent aria-describedby={undefined}>
				<DialogTitle className="text-center">
					Marcar como solucionada
				</DialogTitle>
				<div className="w-full mt-10 m-auto">
					<Textarea
						placeholder="Resolução"
						className="h-36 text-xl"
						value={resolution}
						onChange={(e) => setResolution(e.target.value)}
					/>
					<div className="flex gap-5 mt-10">
						<DialogClose
							className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							type="button"
							disabled={!valid}
							onClick={close}
						>
							Concluir
						</DialogClose>
						<DialogClose
							className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>
							Cancelar
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default Solved;
