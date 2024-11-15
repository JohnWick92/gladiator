import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import type { PageProps } from "@/types";
import type { userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Password({
	auth,
	users,
}: PageProps<{ auth: { user: userType }; users: userType[] }>) {
	const [resetPasswd, setResetPasswd] = useState("");
	const [nipToReset, setNipToReset] = useState("");
	const [newPasswd, setNewPasswd] = useState("");
	const [confPasswd, setConfPasswd] = useState("");

	function reset() {
		const payload = {
			new_password: resetPasswd,
			nip: nipToReset,
		};
		router.put("/password", payload);
		setNipToReset("");
		setResetPasswd("");
	}

	function change() {
		if (confPasswd === newPasswd && newPasswd !== "") {
			const payload = {
				new_password: newPasswd,
				nip: auth.user.nip,
			};
			router.put("/password", payload);
		}
	}

	return (
		<div>
			<Menu profile_description={auth.user.profile_description} />
			{auth.user.profile_description === "Administrador" ||
			auth.user.profile_description === "Chefe do apoio" ? (
				<div className="py-5 mt-4">
					<div className="text-center items-center justify-center w-1/2 m-auto border p-4 bg-slate-300">
						<p className="mb-5">Alterar sua senha</p>
						<div className="flex w-1/2 m-auto py-3">
							<Input
								placeholder="Nova senha"
								type="password"
								onChange={(e) => setNewPasswd(e.target.value)}
								value={newPasswd}
							/>
						</div>
						<div className="flex w-1/2 m-auto py-3">
							<Input
								placeholder="Confirme"
								type="password"
								value={confPasswd}
								onChange={(e) => setConfPasswd(e.target.value)}
							/>
						</div>
						<Button
							className="flex w-1/2 m-auto mt-3"
							type="button"
							onClick={change}
						>
							Alterar
						</Button>
					</div>
					<div className="text-center items-center justify-center w-1/2 m-auto border mt-10 p-4 bg-slate-300">
						<p className="mb-5">Resetar a senha de um usuário</p>
						<div className="flex w-1/2 m-auto py-3">
							<select
								className="w-full h-10 rounded-md border border-input"
								defaultValue={auth.user.nip}
								onChange={(e) => setNipToReset(e.target.value)}
							>
								{users.map((item) => {
									return (
										<option value={item.nip} key={item.nip}>
											{item.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="flex w-1/2 m-auto py-3">
							<Input
								placeholder="Nova senha"
								type="password"
								value={resetPasswd}
								onChange={(e) => setResetPasswd(e.target.value)}
							/>
						</div>
						<Button
							className="flex w-1/2 m-auto mt-3"
							type="button"
							onClick={reset}
						>
							Resetar
						</Button>
					</div>
				</div>
			) : (
				<div className="text-center items-center justify-center w-1/2 m-auto border p-4 bg-slate-300">
					<p className="mb-5">Alterar sua senha</p>
					<div className="flex w-1/2 m-auto py-3">
						<Input
							placeholder="Nova Senha"
							type="password"
							onChange={(e) => setNewPasswd(e.target.value)}
							value={newPasswd}
						/>
					</div>
					<div className="flex w-1/2 m-auto py-3">
						<Input
							placeholder="Confirme"
							type="password"
							value={confPasswd}
							onChange={(e) => setConfPasswd(e.target.value)}
						/>
					</div>
					<Button
						className="flex w-1/2 m-auto mt-3"
						type="button"
						onClick={change}
					>
						Alterar
					</Button>
				</div>
			)}
		</div>
	);
}
