import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { requestType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({
	auth,
	request,
}: PageProps<{ auth: { user: userType }; request: requestType }>) {
	const [description, setDescription] = useState(request.description);
	const [location, setLocation] = useState(request.location);
	const [priority, setPriority] = useState(request.priority);
	const priorities = [
		"0 - Execução imediata",
		"1 - Urgente",
		"2 - Alta",
		"3 - Média",
		"4 - Baixa",
	];

	function update() {
		let payload = {
			code: request.code,
			location,
			priority,
			description,
		};
		router.put(`/request/${request.code}`, payload);
	}

	return (
		<div>
			<Menu profile_description={auth.user.profile_description} />
			<div className="flex items-center justify-center">
				<form className="w-2/5">
					<div className="mt-4">
						Descrição
						<Input
							className="py-2"
							placeholder="Descrição"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="mt-2">
						Localização
						<Input
							className="py-2"
							placeholder="Localização"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</div>
					<div className="my-4">
						<p>Prioridade</p>
						<select
							onChange={(e) => setPriority(e.target.value)}
							defaultValue={request.priority}
						>
							{priorities.map((item) => {
								return (
									<option key={item} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex gap-10">
						<Button
							className="mt-2 mb-4 w-full text-xl"
							type="button"
							onClick={update}
						>
							Salvar
						</Button>
						<Button
							className="mt-2 mb-4 w-full text-xl"
							variant={"destructive"}
							onClick={(e) => {
								e.preventDefault();
								router.get("/");
							}}
						>
							Cancelar
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
