import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type { omType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function New({
	auth,
	oms,
}: PageProps<{ auth: { user: userType }; oms: omType[] }>) {
	const [description, setDescription] = useState("");
	const [active, setActive] = useState(true);
	const [codeOm, setCodeOm] = useState(oms[0].code);

	function add() {
		const payload = {
			description,
			active,
			codeOm,
		};
		router.post("/workshop", payload);
	}

	return (
		<div className="w-full h-screen">
			<Menu profile_description={auth.user.profile_description} />
			<div className="py-5 mt-4">
				<div className="items-center justify-center w-1/2 m-auto">
					<div className="flex w-1/2 m-auto py-3">
						<Input
							type="text"
							placeholder="Descrição"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="flex items-center space-x-2 w-1/2 m-auto pb-4">
						<input
							type="checkbox"
							id="active"
							checked={active}
							onChange={() => setActive(!active)}
						/>
						<label htmlFor="active" className="text-lg">
							Ativo
						</label>
					</div>
					<div className="flex w-1/2 m-auto pb-4">
						<select
							disabled={auth.user.profile_description === "Chefe do apoio"}
							className="w-full h-10 rounded-md border border-input"
							onChange={(e) => setCodeOm(Number.parseInt(e.target.value))}
						>
							{oms?.map((item) => {
								return (
									<option value={item.code} key={item.code}>
										{item.acronym}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex w-1/2 gap-5 m-auto">
						<Button className="w-1/2" type="button" onClick={add}>
							Adicionar
						</Button>
						<Button
							className="w-1/2"
							variant={"destructive"}
							type="button"
							onClick={() => router.get("/workshop")}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
