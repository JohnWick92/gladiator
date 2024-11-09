import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type { userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function New({ auth }: PageProps<{ auth: { user: userType } }>) {
	const [description, setDescription] = useState("");
	const [acronym, setAcronym] = useState("");
	function add() {
		const payload = {
			description,
			acronym,
		};
		router.post("/om", payload);
	}

	return (
		<div >
			<Menu profile_description={auth.user.profile_description} />
			<div className="py-5 mt-4">
				<div className="items-center justify-center w-1/2 m-auto">
					<div className="flex w-1/2 m-auto py-3">
						<Input
							placeholder="Descrição"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="flex w-1/2 m-auto pb-4">
						<Input
							placeholder="Acrônimo"
							type="text"
							value={acronym}
							onChange={(e) => setAcronym(e.target.value)}
						/>
					</div>
					<div className="flex w-1/2 gap-5 m-auto">
						<Button className="w-1/2" type="button" onClick={add}>
							Adicionar
						</Button>

						<Button
							className="w-1/2"
							variant="destructive"
							type="button"
							onClick={() => router.get("/om")}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
