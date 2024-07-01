import Menu from "@/components/Menu";
import Rate from "@/components/Rate";
import CancelSVG from "@/components/svg/cancelSVG";
import ChangeSVG from "@/components/svg/changeSVG";
import CheckedSVG from "@/components/svg/checkedSVG";
import ReportSVG from "@/components/svg/reportSVG";
import UncheckedSVG from "@/components/svg/uncheckedSVG";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { requestType, userType } from "@/types/custom";
import { router, usePage } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home({
	auth,
	solvedRequests,
	openRequests,
}: PageProps<{
	auth: { user: userType };
	openRequests: requestType[];
	solvedRequests: requestType[];
}>) {
	const { flash } = usePage().props as PageProps<{ flash: any }> & any;
	const [searchOpen, setSearchOpen] = useState("");
	const [searchSolved, setSearchSolved] = useState("");

	useEffect(() => {
		if (flash.unathorized !== null) {
			toast("Acesso negado", {
				description: flash.unauthorized,
				action: {
					label: "Ok",
					onClick() {},
				},
			});
		}
	}, [flash]);

	return (
		<div className="w-full">
			{flash.unauthorized && <Toaster />}
			<Menu profile_description={auth.user.profile_description} />
			<Tabs defaultValue="open">
				<TabsList>
					<TabsTrigger value="open">Pedidos abertos</TabsTrigger>
					<TabsTrigger value="solved">Pedidos resolvidos</TabsTrigger>
				</TabsList>
				<TabsContent value="open">
					<div>
						<div className="items-center justify-center w-1/4 m-auto pb-10">
							<Button
								className="w-full mb-5"
								onClick={() => router.get("/request/create")}
							>
								Fazer pedido
							</Button>
							<Input
								onChange={(e) => setSearchOpen(e.target.value)}
								placeholder="Filtros"
							/>
						</div>
						<table className="w-3/4 m-auto">
							<tbody>
								<tr>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Código
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nome
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Data
									</th>
									<th className="w-1/4 border-blue-950 border bg-slate-300">
										Local
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Descrição
									</th>
									<th className="w-20 border-blue-950 border bg-slate-300">
										Aceito
									</th>
									<th className="w-20 border-blue-950 border bg-slate-300">
										Ações
									</th>
								</tr>
								{openRequests
									?.filter((item) => {
										return searchOpen.toLowerCase() === ""
											? item
											: item.description
													.toLowerCase()
													.includes(searchOpen.toLowerCase()) ||
													item.location
														.toLowerCase()
														.includes(searchOpen.toLowerCase()) ||
													item.code === Number.parseFloat(searchOpen);
									})
									.filter((item) => {
										return !item.canceled;
									})
									.map((item) => {
										const date = new Date(item.request_date);
										const formateddDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
										return (
											<tr
												className="text-center h-40 border-2 border-black"
												key={item.code}
											>
												<td className="border-2 border-black">{item.code}</td>
												<td className="border-2 border-black">
													{item?.users?.name}
												</td>
												<td className="border-2 border-black">
													{formateddDate}
												</td>
												<td className="border-2 border-black">
													{item.location}
												</td>
												<td className="border-2 border-black">
													{item.description}
												</td>
												<td className="items-center justify-center mt-5">
													{item.accepted ? <CheckedSVG /> : <UncheckedSVG />}
												</td>
												<td className="border-black border-2">
													<div className="flex items-center justify-center gap-3">
														<div
															className="m-auto w-1/2 group"
															onClick={() => {
																router.get(`/request/${item.code}/edit`);
															}}
														>
															<ChangeSVG />
														</div>
														<div
															className="group items-center justify-center"
															onClick={() => {
																router.get(`/report/request/${item.code}`);
															}}
														>
															<ReportSVG />
														</div>
														<div className="group items-center justify-center">
															<button
																type="button"
																className="bg-white pt-2"
																onClick={() => {
																	router.delete(`/request/${item.code}`);
																}}
															>
																<CancelSVG />
															</button>
														</div>
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</TabsContent>
				<TabsContent value="solved">
					<div className="w-full">
						<div className="items-center justify-center w-1/4 m-auto pb-10">
							<Input
								onChange={(e) => setSearchSolved(e.target.value)}
								placeholder="Filtros"
							/>
						</div>
						<table className="w-3/4 m-auto">
							<tbody>
								<tr>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Código
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Nome
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Data
									</th>
									<th className="w-1/4 border-blue-950 border bg-slate-300">
										Local
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Descrição
									</th>
									<th className="border-blue-950 border bg-slate-300">
										Resolução
									</th>
									<th className="w-1/12 border-blue-950 border bg-slate-300">
										Ações
									</th>
								</tr>
								{solvedRequests
									?.filter((item) => {
										return searchSolved.toLowerCase() === ""
											? item
											: item.description
													.toLowerCase()
													.includes(searchSolved.toLowerCase()) ||
													item.location
														.toLowerCase()
														.includes(searchSolved.toLowerCase()) ||
													item.code === Number.parseInt(searchSolved);
									})
									.map((request) => {
										const date = new Date(request.request_date);
										const formateddDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
										return (
											<tr
												className="text-center border-2 border-black"
												key={request.code}
											>
												<td className="border-2 border-black">
													{request.code}
												</td>
												<td className="border-2 border-black">
													{request?.users?.name}
												</td>
												<td className="border-2 border-black">
													{formateddDate}
												</td>
												<td className="border-2 border-black">
													{request.location}
												</td>
												<td className="h-40 border-2 border-black">
													{request.description}
												</td>
												<td className="border-2 border-black">
													{request.resolution}
												</td>
												<td className="border-2 border-black">
													<Rate code_request={request.code} nip={request.nip} />
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
