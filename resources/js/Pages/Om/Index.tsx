import Menu from "@/components/Menu";
import ChangeSVG from "@/components/svg/changeSVG";
import DeleteSVG from "@/components/svg/deleteSVG";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { omType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
	oms,
	user,
}: PageProps<{ oms: omType[]; user: userType }>) {
	const [search, setSearch] = useState("");

	return (
		<div className="w-full">
			<Menu profile_description="Administrador" />
			<div className="mt-10 items-center justify-center w-full text-xl">
				<Button onClick={() => router.get("/om/create")}>Novo</Button>
				<div className="items-center justify-center w-1/4 m-auto pb-10">
					<Input
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filtro por descrição"
					/>
				</div>
				<table className="w-3/4 m-auto">
					<tbody>
						<tr>
							<th className="w-1/4 border-blue-950 border bg-slate-300">
								Sigla
							</th>
							<th className="w-1/4 border-blue-950 border bg-slate-300">
								Descrição
							</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Ações
							</th>
						</tr>
						{oms
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
										<td>{item.acronym}</td>
										<td>{item.description}</td>
										<td className="flex justify-center">
											<div
												className="m-auto w-1/2 group"
												onClick={() => {
													router.delete(`/om/${item.code}`);
												}}
											>
												<DeleteSVG />
											</div>
											<div
												className="m-auto w-1/2 group"
												onClick={() => router.get(`/om/${item.code}/edit`)}
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
