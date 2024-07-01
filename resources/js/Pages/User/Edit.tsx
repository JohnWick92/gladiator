import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { omType, sectorType, userType, workshopType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { InputMask } from "@react-input/mask";
import { useRef, useState } from "react";

export default function Edit({
	oms,
	sectors,
	workshops,
	user,
	auth,
}: PageProps<{
	oms: omType[];
	sectors: sectorType[];
	workshops: workshopType[];
	auth: { user: userType };
	user: userType;
}>) {
	const [nip, setNip] = useState(user.nip);
	const [email, setEmail] = useState(user.email);
	const [name, setName] = useState(user.name);
	const [active, setActive] = useState(true);
	const [profile, setProfile] = useState(user.profile_description);
	const [codeOm, setCodeOm] = useState(user.code_om);
	const [solver, setSolver] = useState(user.solver);
	const [codeSector, setCodeSector] = useState(user.code_sector);
	const [codeWorkshop, setCodeWorkshop] = useState(user.code_workshop);
	const [branch, setBranch] = useState(user.branch);
	const workshopRef = useRef<HTMLSelectElement>(null);
	const profileArray = [
		"Usuário",
		"Administrador",
		"Chefe do apoio",
		"Aux. Oficina",
		"Enc. Oficina",
	];

	function isSolver() {
		setSolver(!solver);
		if (!solver) {
			workshopRef.current!.disabled = false;
			workshopRef.current!.selectedIndex = 0;
			setCodeWorkshop(Number.parseInt(workshopRef.current!.value));
		} else {
			workshopRef.current!.disabled = true;
			setCodeWorkshop(undefined);
		}
	}

	function update() {
		let payload = {
			nip,
			name,
			email,
			profile,
			codeOm,
			codeSector,
			codeWorkshop,
			branch,
			active,
			solver,
		};
		router.put(`/user/${payload.nip}`, payload);
	}

	return (
		<div className="w-full">
			<Menu profile_description={auth.user.profile_description} />
			<div className="py-5 mt-4">
				<div className="items-center justify-center w-1/2 m-auto">
					<div className="flex w-1/2 m-auto py-3">
						<InputMask
							placeholder="Nip"
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							mask="__.____.__"
							replacement={{ _: /\d/ }}
							value={nip}
							onChange={(e) => setNip(e.target.value)}
						/>
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input
							placeholder="Nome"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input disabled placeholder="Senha" type="password" />
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input disabled placeholder="Confirme a senha" type="password" />
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input
							placeholder="Ramal"
							value={branch}
							onChange={(e) => setBranch(e.target.value)}
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
							disabled={auth.user?.profile_description === "Chefe do apoio"}
							className="w-full h-10 rounded-md border border-input"
							onChange={(e) => setCodeOm(Number.parseInt(e.target.value))}
							defaultValue={user.code_om}
						>
							{oms?.map((item) => {
								return (
									<option key={item.code} value={item.code}>
										{item.acronym}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex w-1/2 m-auto pb-4">
						<select
							className="w-full h-10 rounded-md border border-input"
							onChange={(e) => setProfile(e.target.value)}
							defaultValue={user.profile_description}
						>
							{profileArray?.map((item) => {
								return (
									<option key={item} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex items-center space-x-2 w-1/2 m-auto pb-4">
						<input
							type="checkbox"
							id="solver"
							checked={solver}
							onChange={isSolver}
						/>
						<label htmlFor="solver" className="text-lg">
							Solucionador
						</label>
					</div>
					<div className="flex items-center space-x-2 w-1/2 m-auto pb-4">
						<select
							disabled
							className="w-full h-10 rounded-md border border-input"
							onChange={(e) => setCodeWorkshop(Number.parseInt(e.target.value))}
							defaultValue={user.code_workshop}
							ref={workshopRef}
						>
							{workshops
								?.filter((item) => item.code_om == codeOm)
								.map((item) => {
									return (
										<option key={item.code} value={item.code}>
											{item.description}
										</option>
									);
								})}
						</select>
					</div>
					<div className="flex items-center space-x-2 w-1/2 m-auto pb-4">
						<select
							className="w-full h-10 rounded-md border border-input"
							onChange={(e) => setCodeSector(Number.parseInt(e.target.value))}
							defaultValue={user.code_sector}
						>
							{sectors
								?.filter((item) => item.code_om == codeOm)
								.map((item) => {
									return (
										<option key={item.code} value={item.code}>
											{item.description}
										</option>
									);
								})}
						</select>
					</div>
					<div className="flex w-1/2 gap-5 m-auto">
						<Button className="w-1/2" type="button" onClick={update}>
							Alterar
						</Button>
						<Button
							className="w-1/2"
							variant={"destructive"}
							type="button"
							onClick={() => router.get("/user")}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
