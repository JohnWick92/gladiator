import Menu from "@/components/Menu";
import OpenOs from "@/components/OpenOs";
import { Button } from "@/shadcn/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import type { PageProps } from "@/types";
import type {
	omType,
	requestType,
	userType,
	workshopType,
} from "@/types/custom";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { twMerge } from "tailwind-merge";

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
	const { flash } = usePage().props as PageProps<{ flash: any }> & any;
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (flash.success) {
			toast("Sucesso", {
				description: flash.success,
				action: {
					label: "Ok",
					onClick() {},
				},
			});
		}
	}, [flash]);

	return (
		<div className="w-full">
			<Toaster />
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
												<Dialog>
													<DialogTrigger>
														{request.description.length > 100
															? request.description.substring(0, 100) + "..."
															: request.description}
													</DialogTrigger>
													<DialogContent
														className={twMerge(
															"py-16 text-xl",
															request.description.length > 300 && "h-3/4",
														)}
													>
														<ScrollArea>
															<DialogTitle className="my-5 text-center">
																Descrição do pedido
															</DialogTitle>
															<div className="pr-5">{request.description}</div>
														</ScrollArea>
													</DialogContent>
												</Dialog>
											</td>
											<td className="px-5 border-black border-2">
												<OpenOs
													workshops={workshops}
													oms={oms}
													request={request}
													user={auth.user}
												/>
												<Button
													className="mt-5"
													type="button"
													onClick={() => {
														router.put(`/request/reject/${request.code}`);
													}}
												>
													Rejeitar pedido
												</Button>
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
