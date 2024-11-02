import Menu from "@/components/Menu";
import OpenRequestRow from "@/components/table/request/OpenRequestRow";
import SolvedRequestRow from "@/components/table/request/SolvedRequestRow";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import type { PageProps } from "@/types";
import type { requestType, userType } from "@/types/custom";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

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
		if (flash.unathorized !== undefined) {
			toast("Acesso negado", {
				description: flash.unauthorized,
				action: {
					label: "Ok",
					onClick() {},
				},
			});
		}
		if (flash.success !== null) {
			toast("Cancelamento solicitado", {
				description: flash.success,
				action: {
					label: "Ok",
					onClick() {},
				},
			});
		}
	}, [flash]);

	return (
		<div className="w-full h-screen">
			<Toaster />
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
										return <OpenRequestRow request={item} key={item.code} />;
									})}
							</tbody>
						</table>
					</div>
				</TabsContent>
				<TabsContent value="solved">
					<div className="w-full h-screen">
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
									.map((item) => {
										return <SolvedRequestRow request={item} key={item.code} />;
									})}
							</tbody>
						</table>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
