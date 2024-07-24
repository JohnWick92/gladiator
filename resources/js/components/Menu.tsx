import { Link } from "@inertiajs/react";

type props = {
	profile_description: string;
};

export default function Menu({ profile_description }: props) {
	return (
		<div className="flex w-screen">
			<ul className="flex w-full justify-center text-center bg-slate-600 gap-5 text-white text-xl">
				<li className="p-2 hover:underline">
					<Link href="/">Home</Link>
				</li>
				{(profile_description === "Administrador" ||
					profile_description === "Chefe do apoio") && (
					<>
						<li className="p-2 hover:underline">
							<Link href="/sector">Setores</Link>
						</li>
						<li className="p-2 hover:underline">
							<Link href="/workshop">Oficinas</Link>
						</li>
					</>
				)}
				{profile_description === "Administrador" && (
					<li className="p-2 hover:underline">
						<Link href="/om">OMs</Link>
					</li>
				)}
				{(profile_description === "Administrador" ||
					profile_description === "Chefe do apoio" ||
					profile_description === "Enc. Oficina") && (
					<li className="p-2 hover:underline">
						<Link href="/request">Pedidos</Link>
					</li>
				)}
				{(profile_description === "Administrador" ||
					profile_description === "Chefe do apoio" ||
					profile_description === "Enc. Oficina" ||
					profile_description === "Aux. Oficina") && (
					<li className="p-2 hover:underline">
						<Link href="/os">OS</Link>
					</li>
				)}
				{(profile_description === "Administrador" ||
					profile_description === "Chefe do apoio" ||
					profile_description === "Enc. Oficina") && (
					<li className="p-2 hover:underline">
						<Link href="/material">Materiais</Link>
					</li>
				)}
				{(profile_description === "Administrador" ||
					profile_description === "Chefe do apoio") && (
					<li className="p-2 hover:underline">
						<Link href="/user">Usuários</Link>
					</li>
				)}
				<li className="p-2 hover:underline">
					<Link href="/password">Senha</Link>
				</li>
				<li className="p-2 hover:underline">
					<Link href="/about">Sobre</Link>
				</li>
				<li className="p-2 hover:underline">
					<Link href="/change">Mudanças</Link>
				</li>
				<li className="p-2 rounded-sm hover:bg-red-600">
					<Link href="/logout">Sair</Link>
				</li>
			</ul>
		</div>
	);
}
