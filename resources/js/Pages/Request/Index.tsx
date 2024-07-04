import Menu from "@/components/Menu";
import OpenOs from "@/components/OpenOs";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { omType, requestType, userType, workshopType } from "@/types/custom";
import { useState } from "react";

export default function Index({
	auth,
	requests,
	oms,
	workshops,
}: PageProps<{
	auth: { user: userType };
	requests: requestType[];
	workshops: workshopType[];
	oms: omType[];
}>) {
	const [search, setSearch] = useState("");

	return (
		<div className="w-full">
			<Menu profile_description={auth.user.profile_description} />
			<div className="mt-10 items-center justify-center w-full m-auto text-xl">
				<div className="items-center justify-center w-1/4 m-auto pb-10">
					<Input
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filtro por descrição"
					/>
				</div>
				<table className="w-3/4 m-auto">
					<tbody>
						<tr>
							<th className="border-blue-950 border bg-slate-300">Nº Pedido</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Nome
							</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Data
							</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Local
							</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Descrição
							</th>
							<th className="w-1/6 border-blue-950 border bg-slate-300">
								Ações
							</th>
						</tr>
						{requests
							?.filter((item) => {
								return search.toLowerCase() === ""
									? item
									: item.description
											.toLowerCase()
											.includes(search.toLowerCase()) ||
											item.code === Number.parseInt(search) ||
											item.location.toLowerCase().includes(search);
							})
							.map((request) => {
								const date = new Date(request.request_date);
								const formateddDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
								if (!request.accepted) {
									return (
										<tr
											className="text-center h-20 border-2 border-black"
											key={request.code}
										>
											<td className="border-black border-2">{request.code}</td>
											<td className="border-black border-2">
												{request?.users?.name}
											</td>
											<td className="border-black border-2">{formateddDate}</td>
											<td className="border-black border-2">
												{request.location}
											</td>
											<td className="border-black border-2">
												{request.description}
											</td>
											<td className="border-black border-2">
												<OpenOs
													workshops={workshops}
													oms={oms}
													request={request}
													user={auth.user}
												/>
											</td>
										</tr>
									);
								}
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
