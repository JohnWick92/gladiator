import { Button } from "@/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import type { materialType, osType } from "@/types/custom";
import { router } from "@inertiajs/react";

type materialTable = {
	code: string;
	amount: number;
};

type materialUsedTable = {
	code: number;
	amount: number;
};

type props = {
	nip: string;
	os: osType;
	materials: materialType[];
};

function OsMaterial({ os, nip, materials }: props) {
	const materialUsedTable: materialUsedTable[] = [];
	const materialTable: materialTable[] = [];

	for (const item of materials) {
		materialTable.push({
			amount: 0,
			code: item.code,
		});
	}

	for (const item of os.materials_os!) {
		materialUsedTable.push({
			amount: item.amount,
			code: item.code,
		});
	}

	return (
		<Dialog>
			<DialogTrigger
				className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Materiais
			</DialogTrigger>
			<DialogContent className="" aria-describedby={undefined}>
				<DialogTitle className="text-center">Gerenciar materiais</DialogTitle>
				<div className="w-full">
					<div className="w-full my-20 m-auto">
						<ScrollArea className="h-full">
							<table className="w-full m-auto">
								<tbody>
									{materials?.map((material) => {
										return (
											<tr
												key={material.code}
												className="flex items-center justify-center m-5"
											>
												<td className="w-1/3 text-center">{material.code}</td>
												<td>
													<Input
														className="w-3/4"
														placeholder="Quantidade"
														onChange={(e) => {
															const index = materialTable.findIndex(
																(element) => element.code === material.code,
															);
															materialTable[index].amount = Number.parseInt(
																e.target.value,
															);
														}}
														type="number"
													/>
												</td>
												<td>
													<Button
														type="button"
														onClick={() => {
															const item =
																materialTable[
																	materialTable.findIndex(
																		(element) => element.code === material.code,
																	)
																];
															if (item.amount > 0) {
																const payload = {
																	nip,
																	amount: item.amount,
																	code_material: item.code,
																};
																router.post(
																	`/os/manage/material/add/${os.code}`,
																	payload,
																);
															}
														}}
													>
														Adicionar
													</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</ScrollArea>
					</div>
					<div className="w-full my-20 m-auto">
						<table className="w-full m-auto">
							<tbody>
								<tr>
									<th className="w-1/5 border-blue-950 border bg-slate-300">
										Código
									</th>
									<th className="w-1/5 border-blue-950 border bg-slate-300">
										Qtde
									</th>
									<th className="w-1/5 border-blue-950 border bg-slate-300">
										Disponível
									</th>
									<th className="w-1/5 border-blue-950 border bg-slate-300">
										Uso
									</th>
									<th className="w-1/5 border-blue-950 border bg-slate-300">
										Ações
									</th>
								</tr>
								{os.materials_os?.map((osMat) => {
									return (
										<tr className="text-center" key={osMat.code}>
											<td>{osMat.code_material}</td>
											<td>{osMat.amount}</td>
											<td>{osMat.amount - osMat.quantity_used}</td>
											<td>
												<Input
													disabled={osMat.amount - osMat.quantity_used === 0}
													type="number"
													onChange={(e) => {
														const index = materialUsedTable.findIndex(
															(element) => element.code === osMat.code,
														);
														materialUsedTable[index].amount = Number.parseInt(
															e.target.value,
														);
													}}
												/>
											</td>
											<td>
												<Button
													disabled={osMat.amount - osMat.quantity_used === 0}
													type="button"
													onClick={() => {
														const item =
															materialUsedTable[
																materialUsedTable.findIndex(
																	(element) => element.code === osMat.code,
																)
															];
														if (item.amount > osMat.amount && item.amount > 0) {
															alert("Não há material suficiente");
														} else if (item.amount > 0) {
															const payload = {
																nip,
																code: osMat.code,
																quantity_used: item.amount,
															};
															router.put(
																`/os/manage/material/use/${os.code}`,
																payload,
															);
														}
													}}
												>
													Registrar uso
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<DialogClose
						className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full"
						type="button"
						onClick={() => {}}
					>
						Concluir
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default OsMaterial;
