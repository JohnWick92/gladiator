import Menu from "@/components/Menu";
import ChangeSVG from "@/components/svg/changeSVG";
import CheckedSVG from "@/components/svg/checkedSVG";
import DeleteSVG from "@/components/svg/deleteSVG";
import UncheckedSVG from "@/components/svg/uncheckedSVG";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type { materialType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
	materials,
	auth,
}: PageProps<{ materials: materialType[]; auth: { user: userType } }>) {
	const [search, setSearch] = useState("");
	return (
		<div className="w-full h-screen">
			<Menu profile_description={auth.user.profile_description} />
			<div className="mt-10 items-center justify-center w-full m-auto text-xl">
				<div className="items-center justify-center w-1/4 m-auto pb-10">
					<Button
						className="w-full mb-5"
						onClick={() => router.get("/material/create")}
					>
						Novo material
					</Button>
					<Input
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filtro por descrição"
					/>
				</div>
				<table className="w-3/4 m-auto">
					<tbody>
						<tr>
							<th className="border-blue-950 border bg-slate-300">Código</th>
							<th className="border-blue-950 border bg-slate-300">Descrição</th>
							<th className="border-blue-950 border bg-slate-300">Valor</th>
							<th className="border-blue-950 border bg-slate-300">Unidade</th>
							<th className="border-blue-950 border bg-slate-300">Ativo</th>
							<th className="border-blue-950 border bg-slate-300">Ações</th>
						</tr>
						{materials
							?.filter((item) => {
								return search.toLocaleLowerCase() === ""
									? item
									: item.description
											.toLocaleLowerCase()
											.includes(search.toLocaleLowerCase());
							})
							.map((item) => {
								return (
									<tr className="text-center" key={item.code}>
										<td>{item.code}</td>
										<td>{item.description}</td>
										<td>R$ {item.value}</td>
										<td>{item.unit}</td>
										<td>{item.active ? <CheckedSVG /> : <UncheckedSVG />}</td>
										<td className="flex justify-center">
											<div
												className="m-auto w-1/2 group"
												onClick={() => {
													router.delete(`/material/${item.code}`);
												}}
											>
												<DeleteSVG />
											</div>
											<div
												className="m-auto w-1/2 group"
												onClick={() => {
													router.get(`/material/${item.code}/edit`);
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
