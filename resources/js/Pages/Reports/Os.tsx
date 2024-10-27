import Menu from "@/components/Menu";
import { Button } from "@/shadcn/ui/button";
import type { PageProps } from "@/types";
import type { osType, solversType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";
import {
	Document,
	PDFViewer,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	title: {
		paddingTop: 30,
		textAlign: "center",
	},
	page: {
		flex: 1,
		fontSize: 10,
	},
	number: {
		marginTop: 40,
		marginBottom: 20,
		lineHeight: 2,
		fontSize: 13,
	},
	description: {
		lineHeight: 2,
		marginBottom: 15,
	},
	observations: {
		marginBottom: 20,
	},
});

export default function OsReport({
	owner,
	auth,
	os,
	solvers,
}: PageProps<{
	auth: { user: userType };
	os: osType;
	owner: userType;
	solvers: solversType[];
}>) {
	return (
		<div className="flex-row justify-center items-center">
			<Menu profile_description={auth.user.profile_description} />
			<PDFViewer
				className="mx-auto mt-5"
				style={{ height: "90vh", minWidth: "80vw" }}
			>
				<Document>
					<Page size="A4" style={styles.page}>
						<View style={styles.title}>
							<Text style={{ fontSize: 17 }}>MARINHA DO BRASIL</Text>
							<Text style={{ fontSize: 15 }}>
								{os.oms?.description.toUpperCase()}
							</Text>
							<Text style={{ top: 15, fontSize: 15 }}>
								Departamento de Manutenção
							</Text>
						</View>
						<View style={{ paddingHorizontal: 40 }}>
							<View style={styles.number}>
								<Text>Nº OS: {os?.code}</Text>
								<Text>Nº pedido: {os?.code_request}</Text>
							</View>
							<View style={styles.description}>
								<Text>Descrição do pedido: {os.requests?.description}</Text>
								<Text>
									Setor solicitante: {owner.sectors?.acronym}, solicitante:
									{owner.name}
								</Text>
								<Text>
									Local de realização da faína: {os.requests?.location}
								</Text>
								<Text>Oficina responsável: {os.workshops?.description}</Text>
								<Text>Situação: {os?.status}</Text>
								<Text>Prioridade: {os?.priority}</Text>
							</View>
						</View>
						<View style={{ paddingHorizontal: 40 }}>
							<View style={styles.observations}>
								<View style={{ marginBottom: 20 }}>
									<Text>Solucionadores:</Text>
									{solvers?.map((solver) => {
										return <Text key={solver.code}>{solver.name}</Text>;
									})}
								</View>
								<Text>Observações Enc. Oficina:</Text>
								<Text>{os?.observation_in_charge}</Text>
							</View>
							<View style={styles.observations}>
								<Text>Relatório dos solucionadores:</Text>
								<Text>{os?.observation_solver}</Text>
							</View>
							<View>
								<Text>Materiais:</Text>
								{os.materials_os?.map((mat) => {
									return (
										<Text key={mat.code} style={{ top: 10, lineHeight: 2 }}>
											Material: {mat.code_material}, usado: {mat.quantity_used}
										</Text>
									);
								})}
							</View>
						</View>
					</Page>
				</Document>
			</PDFViewer>
			<Button
				className="flex w-1/6 my-5 mx-auto"
				onClick={() => {
					if (!os.closed || !os.solved) {
						router.get(`/os/${os.code}`);
					}
					router.get("/os");
				}}
			>
				Voltar
			</Button>
		</div>
	);
}
