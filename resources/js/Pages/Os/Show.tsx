import Menu from "@/components/Menu";
import ChangeWorkshop from "@/components/os/changeWorkshop";
import Observation from "@/components/os/observation";
import OsMaterial from "@/components/os/osMaterial";
import Solved from "@/components/os/solve";
import Solver from "@/components/os/solvers";
import Status from "@/components/os/status";
import ReportSVG from "@/components/svg/reportSVG";
import type { PageProps } from "@/types";
import type {
	materialType,
	osType,
	userType,
	workshopType,
} from "@/types/custom";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function Show({
	auth,
	os,
	materials,
	solvers,
	workshops,
}: PageProps<{
	auth: { user: userType };
	os: osType;
	solvers: userType[];
	workshops: workshopType[];
	materials: materialType[];
}>) {
	const { flash } = usePage().props as PageProps<{ flash: any }> & any;

	useEffect(() => {
		toast("Atualização", {
			description: flash.success,
			action: {
				label: "Ok",
				onClick() {},
			},
		});
	}, [flash]);

	return (
		<div className="w-full">
			{flash.success && <Toaster />}
			<Menu profile_description={auth.user.profile_description} />
			<div className="flex-row w-4/5 m-auto">
				<div className="flex-row w-3/4 m-auto my-20 text-xl">
					<p className="py-2">Nº OS: {os.code}</p>
					<p className="py-2">Nº Pedido: {os.code_request}</p>
					<p className="py-2">Local: {os.requests?.location}</p>
					<p className="py-2">
						Descrição do pedido: {os.requests?.description}
					</p>
					<p className="py-2">Prioridade: {os.priority}</p>
					<p className="py-2">OM: {os.oms?.acronym}</p>
					<p className="py-2">Oficina: {os.workshops?.description}</p>
					<p className="py-2">Status: {os.status}</p>
					<p className="font-sans py-2">
						Observações do encarregado: {os.observation_in_charge}
					</p>
					<p className="font-sans py-2">
						Observações dos solucionadores: {os.observation_solver}
					</p>
				</div>
				<div className="flex justify-center items-center gap-5 h-24">
					<div
						onClick={() => {
							router.get(`/report/os/${os.code}`);
						}}
					>
						<ReportSVG />
					</div>
					<ChangeWorkshop
						code_os={os.code}
						current_workshop={os.code_workshop}
						user={auth.user}
						workshops={workshops}
					/>

					<Status
						code_os={os.code}
						nip={auth.user.nip}
						current_status={os.status}
					/>

					<Solver os={os} nip={auth.user.nip} solvers={solvers} />

					<Observation
						os={os}
						nip={auth.user.nip}
						profile={auth.user.profile_description}
					/>

					<OsMaterial os={os} materials={materials} nip={auth.user.nip} />

					<Solved os={os} nip={auth.user.nip} />
				</div>
			</div>
		</div>
	);
}
