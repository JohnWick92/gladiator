import Menu from "@/components/Menu";
import ChangeSVG from "@/components/svg/changeSVG";
import DeleteSVG from "@/components/svg/deleteSVG";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type { sectorType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
	sectors,
	auth,
}: PageProps<{
	auth: { user: userType };
	sectors: sectorType[];
}>) {
	const [search, setSearch] = useState("");

	return (
		<div className="w-full h-screen">
			<Menu profile_description={auth.user.profile_description} />
			<div className="mt-10 items-center justify-center w-full m-auto text-xl">
				<div className="items-center justify-center w-1/4 m-auto pb-10">
					<Button
						className="w-full mb-5"
						onClick={() => router.get("/sector/create")}
					>
						Novo setor
					</Button>
					<Input
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filtro por descrição"
					/>
				</div>
				<table className="w-3/4 m-auto">
					<tbody>
						<tr>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Sigla
							</th>
							<th className="border-blue-950 border bg-slate-300">Descrição</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">OM</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Ações
							</th>
						</tr>
						{sectors
							?.filter((item) => {
								if (auth.user?.profile_description === "Administrador")
									return item;
								return item.code_om === auth.user?.code_om;
							})
							.filter((item) => {
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
										<td>{item.oms?.acronym}</td>
										<td className="flex justify-center">
											<div
												className="m-auto w-1/2 group"
												onClick={() => {
													router.delete(`/sector/${item.code}`);
												}}
											>
												<DeleteSVG />
											</div>
											<div
												className="m-auto w-1/2 group"
												onClick={() => {
													router.get(`/sector/${item.code}/edit`);
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
