import { Button } from "@/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { osType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";

type solverProps = {
	os: osType;
	solvers: userType[];
	nip: string;
};

export type solversType = {
	code: number;
	nip: string;
	code_os: number;
};

function Solver({ os, solvers, nip }: solverProps) {
	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Solucionadores
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="">
				<DialogTitle className="text-center">
					Gerenciar solucionadores
				</DialogTitle>
				<ScrollArea className="flex my-auto h-full">
					<div className="w-full m-auto mt-28">
						<table className="w-3/4 m-auto">
							<tbody>
								<tr className="text-center">
									<th className="w-1/2 border-blue-950 border bg-slate-300">
										Nome
									</th>
									<th className="w-1/2 border-blue-950 border bg-slate-300">
										Ações
									</th>
								</tr>
								{solvers
									?.filter((item) => {
										if (item.code_workshop === os.code_workshop) return item;
									})
									.map((solverItem) => {
										return (
											<tr className="text-center" key={solverItem.nip}>
												<td className="flex-row border-2 border-black w-1/2">
													{solverItem.name}
												</td>
												<td className="flex border-black border-2 h-20">
													<Button
														className="w-1/2 mr-5 mt-5"
														type="button"
														disabled={os.solver_os?.some(
															(solver) => solver.nip === solverItem.nip,
														)}
														onClick={() => {
															router.post(`/os/manage/solvers/add/${os.code}`, {
																solver_nip: solverItem.nip,
																nip,
															});
														}}
													>
														Adicionar
													</Button>
													<Button
														className="w-1/2 mt-5"
														type="button"
														variant={"destructive"}
														disabled={
															!os.solver_os?.some(
																(solver) => solver.nip === solverItem.nip,
															)
														}
														onClick={() => {
															const code_solver = os.solver_os?.find(
																(item) => item.nip === solverItem.nip,
															)?.code;
															router.put(
																`/os/manage/solvers/remove/${code_solver}`,
																{ nip },
															);
														}}
													>
														Remover
													</Button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
						<div className="w-1/2 m-auto">
							<DialogClose
								className="w-full mt-20 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							>
								Concluir
							</DialogClose>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

export default Solver;
