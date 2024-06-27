import { Link } from "@inertiajs/react";

type props = {
	profile_description: string;
};

export default function Menu({ profile_description }: props) {
	return (
		<div className="flex w-screen">
			{profile_description === "Administrador" && (
				<ul className="flex w-full justify-center text-center bg-slate-600 gap-5 text-white text-xl">
					<li className="p-2 hover:underline">
						<Link href="/">Home</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/sector">Setores</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/workshop">Oficinas</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/om">OMs</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/request">Pedidos</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/os">OS</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/material">Materiais</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/user">Usuários</Link>
					</li>
					<li className="p-2 hover:underline">
						<Link href="/password">Senha</Link>
					</li>
					<li
						className="p-2 rounded-sm hover:bg-red-600"
						onClick={() => {
							sessionStorage.clear();
							window.location.reload();
						}}
					>
						Sair
					</li>
				</ul>
			)}
			{/* {user !== undefined && user!.profile_description === "Chefe do apoio" && ( */}
			{/* 	<ul className="flex w-full justify-center text-center bg-slate-600 gap-5 text-white text-xl"> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/">Home</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/sector">Setores</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/workshop">Oficinas</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/request">Pedidos</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/os">OS</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/material">Materiais</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/user">Usuários</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/password">Senha</Link> */}
			{/* 		</li> */}
			{/* 		<li */}
			{/* 			className="p-2 rounded-sm hover:bg-red-600" */}
			{/* 			onClick={() => { */}
			{/* 				sessionStorage.clear(); */}
			{/* 				window.location.reload(); */}
			{/* 			}} */}
			{/* 		> */}
			{/* 			Sair */}
			{/* 		</li> */}
			{/* 	</ul> */}
			{/* )} */}
			{/**/}
			{/* {user !== undefined && */}
			{/* 	(user!.profile_description === "Enc. Div" || */}
			{/* 		user!.profile_description === "Enc. Oficina") && ( */}
			{/* 		<ul className="flex w-full justify-center text-center bg-slate-600 gap-5 text-white text-xl"> */}
			{/* 			<li className="p-2 hover:underline"> */}
			{/* 				<Link to="/">Home</Link> */}
			{/* 			</li> */}
			{/* 			<li className="p-2 hover:underline"> */}
			{/* 				<Link to="/os">OS</Link> */}
			{/* 			</li> */}
			{/* 			<li className="p-2 hover:underline"> */}
			{/* 				<Link to="/material">Materiais</Link> */}
			{/* 			</li> */}
			{/* 			<li className="p-2 hover:underline"> */}
			{/* 				<Link to="/request">Pedidos</Link> */}
			{/* 			</li> */}
			{/* 			<li className="p-2 hover:underline"> */}
			{/* 				<Link to="/password">Senha</Link> */}
			{/* 			</li> */}
			{/* 			<li */}
			{/* 				className="hover:bg-red-600" */}
			{/* 				onClick={() => { */}
			{/* 					sessionStorage.clear(); */}
			{/* 					window.location.reload(); */}
			{/* 				}} */}
			{/* 			> */}
			{/* 				Sair */}
			{/* 			</li> */}
			{/* 		</ul> */}
			{/* 	)} */}
			{/* {user !== undefined && user!.profile_description === "Aux. Oficina" && ( */}
			{/* 	<ul className="flex w-full justify-center text-center bg-slate-600 gap-5 text-white text-xl"> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/">Home</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/os">OS</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/material">Materiais</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/password">Senha</Link> */}
			{/* 		</li> */}
			{/* 		<li */}
			{/* 			className="p-2 rounded-sm hover:bg-red-600" */}
			{/* 			onClick={() => { */}
			{/* 				sessionStorage.clear(); */}
			{/* 				window.location.reload(); */}
			{/* 			}} */}
			{/* 		> */}
			{/* 			Sair */}
			{/* 		</li> */}
			{/* 	</ul> */}
			{/* )} */}
			{/* {user !== undefined && user!.profile_description === "Usuário" && ( */}
			{/* 	<ul className="flex w-full justify-center text-center bg-slate-600 gap-5 text-white text-xl"> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/">Home</Link> */}
			{/* 		</li> */}
			{/* 		<li className="p-2 hover:underline"> */}
			{/* 			<Link to="/password">Senha</Link> */}
			{/* 		</li> */}
			{/* 		<li */}
			{/* 			className="p-2 rounded-sm hover:bg-red-600" */}
			{/* 			onClick={() => { */}
			{/* 				sessionStorage.clear(); */}
			{/* 				window.location.reload(); */}
			{/* 			}} */}
			{/* 		> */}
			{/* 			Sair */}
			{/* 		</li> */}
			{/* 	</ul> */}
			{/* )} */}
		</div>
	);
}
