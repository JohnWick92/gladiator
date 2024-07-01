import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { materialType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({
	auth,
	material,
}: PageProps<{ auth: { user: userType }; material: materialType }>) {
	const [code, setCode] = useState(material.code);
	const [unit, setUnit] = useState(material.unit);
	const [description, setDescription] = useState(material.description);
	const [value, setValue] = useState(material.value);
	const [active, setActive] = useState(material.active);
	const unitArray = ["Rolo", "Litro", "Serviço", "Pacote"];

	function update() {
		let payload = {
			code,
			unit,
			description,
			value,
			active,
		};
		router.put(`/material/${payload.code}`, payload);
	}

	return (
		<div className="w-full">
			<Menu profile_description={auth.user.profile_description} />
			<div className="py-5 mt-4">
				<div className="items-center justify-center w-1/2 m-auto">
					<div className="flex w-1/2 m-auto py-3">
						<Input
							placeholder="Código"
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input
							placeholder="Descrição"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input
							placeholder="Valor R$"
							value={value}
							type="number"
							onChange={(e) => setValue(Number.parseInt(e.target.value))}
						/>
					</div>
					<div className="flex w-1/2 m-auto pb-4">
						<select
							className="w-full h-10 rounded-md border border-input"
							onChange={(e) => setUnit(e.target.value)}
						>
							{unitArray?.map((item) => {
								return (
									<option
										value={item}
										key={item}
										selected={item === material.unit}
									>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex items-center space-x-2 w-1/2 m-auto pb-4">
						<input
							type="checkbox"
							id="active"
							onChange={() => setActive(!active)}
							checked={active}
						/>
						<label htmlFor="active" className="text-lg">
							Ativo
						</label>
					</div>
					<div className="flex w-1/2 gap-5 m-auto">
						<Button className="w-1/2" type="button" onClick={update}>
							Alterar
						</Button>
						<Button
							className="w-1/2"
							variant={"destructive"}
							type="button"
							onClick={() => router.get("/material")}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
