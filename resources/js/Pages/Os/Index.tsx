import Menu from "@/components/Menu";
import OsRow from "@/components/OsRow";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { PageProps } from "@/types";
import { osType, userType } from "@/types/custom";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Os({
	auth,
	canceledOs,
	osListToCancel,
	osList,
}: PageProps<{
	auth: { user: userType };
	osList: osType[];
	osListToCancel: osType[];
	canceledOs: osType[];
}>) {
	const [search, setSearch] = useState("");
	const { flash } = usePage().props as PageProps<{ flash: any }> & any;

	useEffect(() => {
		toast("Atualização", {
			description: flash.success,
			action: {
				label: "Ok",
				onClick() {},
			},
		});
	}, [flash]);

	return (
		<div className="w-full">
			{flash.success && <Toaster />}
			<Menu profile_description={auth.user.profile_description} />
			<Tabs defaultValue="ongoing">
				<TabsList>
					<TabsTrigger value="ongoing">Os em aberto</TabsTrigger>
					<TabsTrigger value="toCancel">Aguardando cancelamento</TabsTrigger>
					<TabsTrigger value="canceled">Cancelados</TabsTrigger>
				</TabsList>
				<TabsContent value="ongoing">
					<div className="mt-10 items-center justify-center w-full m-auto text-xl">
						<div className="items-center justify-center w-1/4 m-auto pb-10">
							<Input
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Filtros"
							/>
						</div>
						<table className="w-3/4 m-auto">
							<tbody>
								<tr className="text-center">
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nº OS
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nº Pedido
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Status
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Prioridade
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										OM
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Mais detalhes
									</th>
								</tr>
								{osList
									.filter((item) => {
										return search.toLowerCase() === ""
											? item
											: item.code === Number.parseInt(search) ||
													item.code_request === Number.parseInt(search) ||
													item.status
														.toLowerCase()
														.includes(search.toLowerCase()) ||
													item.priority
														.toLowerCase()
														.includes(search.toLowerCase()) ||
													item?.requests?.description
														.toLowerCase()
														.includes(search.toLowerCase());
									})
									.map((item) => {
										return <OsRow key={item.code} item={item} />;
									})}
							</tbody>
						</table>
					</div>
				</TabsContent>
				<TabsContent value="toCancel">
					<div className="mt-10 items-center justify-center w-full m-auto text-xl">
						<table className="w-3/4 m-auto">
							<tbody>
								<tr className="text-center">
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nº OS
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nº Pedido
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Status
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Prioridade
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										OM
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Confirmar
									</th>
								</tr>
								{osListToCancel.map((item) => {
									return (
										<tr className="text-center h-24" key={item.code}>
											<td className="border-black border-2">{item.code}</td>
											<td className="border-black border-2">
												{item.code_request}
											</td>
											<td className="border-black border-2">{item.status}</td>
											<td className="border-black border-2">{item.priority}</td>
											<td className="border-black border-2">
												{item.oms?.acronym}
											</td>
											<td className="flex justify-center items-center gap-5 h-24 border-2 border-black">
												<Button
													type="button"
													onClick={() => {
														router.put(`/os/manage/cancel/${item.code}`, {
															nip: auth.user.nip,
														});
													}}
												>
													Confirmar
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</TabsContent>
				<TabsContent value="canceled">
					<div className="mt-10 items-center justify-center w-full m-auto text-xl">
						<table className="w-3/4 m-auto">
							<tbody>
								<tr className="text-center">
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nº OS
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nº Pedido
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Status
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Prioridade
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										OM
									</th>
								</tr>
								{canceledOs.map((item) => {
									return (
										<tr className="text-center h-24" key={item.code}>
											<td className="border-black border-2">{item.code}</td>
											<td className="border-black border-2">
												{item.code_request}
											</td>
											<td className="border-black border-2">{item.status}</td>
											<td className="border-black border-2">{item.priority}</td>
											<td className="border-black border-2">
												{item.oms?.acronym}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
