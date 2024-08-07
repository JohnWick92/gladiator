import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type {
	omType,
	sectorType,
	userType,
	workshopType,
} from "@/types/custom";
import { router } from "@inertiajs/react";
import { InputMask } from "@react-input/mask";
import { useRef, useState } from "react";

export default function New({
	oms,
	sectors,
	workshops,
	auth,
}: PageProps<{
	oms: omType[];
	sectors: sectorType[];
	workshops: workshopType[];
	auth: { user: userType };
}>) {
	const [nip, setNip] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [active, setActive] = useState(true);
	const [profile, setProfile] = useState("Usuário");
	const [codeOm, setCodeOm] = useState(oms[0].code);
	const [solver, setSolver] = useState(false);
	const [codeSector, setCodeSector] = useState(sectors[0].code);
	const [codeWorkshop, setCodeWorkshop] = useState<number | undefined>(
		undefined,
	);
	const [branch, setBranch] = useState("");
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
			setCodeWorkshop(workshops[0].code);
		} else {
			workshopRef.current!.disabled = true;
			setCodeWorkshop(undefined);
		}
	}

	function add() {
		if (password === confirmPassword) {
			const payload = {
				nip,
				name,
				email,
				profile,
				codeOm,
				password,
				codeSector,
				codeWorkshop,
				branch,
				active,
				solver,
			};
			router.post("/user", payload);
		}
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
						<Input
							placeholder="Senha"
							value={password}
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="items-center justify-center w-1/2 m-auto pb-3">
						<Input
							placeholder="Confirme a senha"
							value={confirmPassword}
							type="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
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
							ref={workshopRef}
						>
							{workshops
								?.filter((item) => item.code_om === codeOm)
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
						>
							{sectors
								?.filter((item) => item.code_om === codeOm)
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
						<Button className="w-1/2" type="button" onClick={add}>
							Adicionar
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
