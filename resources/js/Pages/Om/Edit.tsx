import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { omType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ om }: PageProps<{ om: omType }>) {
	const [description, setDescription] = useState(om.description);
	const [acronym, setAcronym] = useState(om.acronym);
	function update() {
		let payload = {
			code: om.code,
			description,
			acronym,
		};
		router.put(`/om/${payload.code}`, payload);
	}

	return (
		<div className="w-full">
			<Menu profile_description="Administrador" />
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
						<Button className="w-1/3" type="button" onClick={update}>
							Salvar
						</Button>

						<Button
							className="w-1/3"
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
