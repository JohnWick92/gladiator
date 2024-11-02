import Menu from "@/components/Menu";
import CancelSVG from "@/components/svg/cancelSVG";
import ChangeSVG from "@/components/svg/changeSVG";
import CheckedSVG from "@/components/svg/checkedSVG";
import UncheckedSVG from "@/components/svg/uncheckedSVG";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type {
	omType,
	sectorType,
	userType,
	workshopType,
} from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
	oms,
	sectors,
	workshops,
	users,
	auth,
}: PageProps<{
	oms: omType[];
	sectors: sectorType[];
	workshops: workshopType[];
	users: userType[];
	auth: { user: userType };
}>) {
	const [search, setSearch] = useState("");

	return (
		<div className="w-full h-screen">
			<Menu profile_description={auth.user.profile_description} />
			<div className="mt-10 items-center justify-center w-full m-auto text-xl">
				<div className="items-center justify-center w-1/4 m-auto pb-10">
					<Button
						className="w-full mb-5"
						onClick={() => router.get("/user/create")}
					>
						Adicionar novo usuário
					</Button>
					<Input
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filtro por nome"
					/>
				</div>
				<table className="w-full m-auto">
					<tbody>
						<tr>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Nip
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Nome
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Email
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Ramal
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Ativo
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">Om</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Setor
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Solucionador
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Oficina
							</th>
							<th className="w-1/12 border-blue-950 border bg-slate-300">
								Ações
							</th>
						</tr>
						{users
							?.filter((item) => {
								return search.toLocaleLowerCase() === ""
									? item
									: item.name
											.toLocaleLowerCase()
											.includes(search.toLocaleLowerCase());
							})
							.map((item) => {
								return (
									<tr className="text-center" key={item.nip}>
										<td>{item.nip}</td>
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>{item.branch}</td>
										<td>{item.active ? <CheckedSVG /> : <UncheckedSVG />}</td>
										<td>
											{
												oms.find((element) => element.code === item.code_om)
													?.acronym
											}
										</td>
										<td>
											{
												sectors.find(
													(element) => element.code === item.code_sector,
												)?.description
											}
										</td>
										<td>{item.solver ? <CheckedSVG /> : <UncheckedSVG />}</td>
										<td>
											{item.solver
												? workshops.find(
														(element) => element.code === item.code_workshop,
													)?.description
												: "Não possui"}
										</td>
										<td className="flex justify-center">
											<div
												className="group"
												onClick={() => router.delete(`/user/${item.nip}`)}
											>
												<CancelSVG />
											</div>
											<div
												className="group"
												onClick={() => {
													router.get(`/user/${item.nip}/edit`);
												}}
											>
												<ChangeSVG />
											</div>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
