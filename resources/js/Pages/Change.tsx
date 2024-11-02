import Menu from "@/components/Menu";
import LogoLargeSVG from "@/components/svg/logoLargeSVG";
import type { PageProps } from "@/types";
import type { userType } from "@/types/custom";

export default function Change({
	auth,
}: PageProps<{ auth: { user: userType } }>) {
	return (
		<div className="h-screen bg-slate-600">
			<Menu profile_description={auth.user.profile_description} />
			<div className="flex-row w-3/5 text-xl text-slate-300 m-auto items-center pt-16">
				<div className="w-1/4 pl-28 m-auto pt-5 items-center">
					<LogoLargeSVG />
				</div>
				<div className="mt-20">
					<p>
						<p className="text-center py-10">Versão 3.0.3</p>
						<h1>
							Agora a descrição dos pedidos é compactada caso tenha tamanho
							maior que 100 caracters, ... indica que ela foi compactada. Para
							abrir basta clicar sobre
						</h1>
					</p>
					<p>
						<p className="text-center py-10">Versão 3.0.4</p>
						<h1>Agora OS que foram fechadas podem ser visualizadas</h1>
					</p>
				</div>
			</div>
		</div>
	);
}
