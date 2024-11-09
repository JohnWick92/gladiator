import type { ReactElement } from "react";

export default function Layout(props: { children: ReactElement }) {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="min-h-screen">{props.children}</div>
			<footer>
				<hr />
				<div className="text-center py-5">
					<h1>Gladiador versão 3.0.4</h1>
					<h2>Desenvolvido por: Elias & Josué Ferreira</h2>
				</div>
			</footer>
		</div>
	);
}
