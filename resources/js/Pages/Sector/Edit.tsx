import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { omType, sectorType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({
	oms,
	user,
	sector,
}: PageProps<{ oms: omType[]; user: userType; sector: sectorType }>) {
	const [codeOm, setCodeOm] = useState(sector.code_om);
	const [code, _] = useState(sector.code);
	const [description, setDescription] = useState(sector.description);
	const [acronym, setAcronym] = useState(sector.acronym);

	function update() {
		let payload = {
			code,
			codeOm,
			acronym,
			description,
		};
		router.put(`/sector/${payload.code}`, payload);
	}

	return (
		<div>
			<Menu profile_description="Administrador" />
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
					<div className="flex w-1/2 m-auto pb-4">
						<Input
							type="text"
							placeholder="Sigla"
							value={acronym}
							onChange={(e) => setAcronym(e.target.value)}
						/>
					</div>
					<div className="flex w-1/2 m-auto pb-4">
						<select
							disabled={user?.profile_description === "Chefe do apoio"}
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
						<Button className="w-1/3" type="button" onClick={update}>
							Alterar
						</Button>
						<Button
							className="w-1/3"
							variant="destructive"
							type="button"
							onClick={() => {
								router.get("/sector");
							}}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
