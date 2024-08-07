import { Button } from "@/shadcn/ui/button";
import type { PageProps } from "@/types";
import type { requestType, userType } from "@/types/custom";
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
		marginBottom: 50,
	},
	page: {
		flex: 1,
		paddingHorizontal: 40,
	},
	body: {
		fontSize: 12,
	},
	line: {
		marginVertical: 8,
	},
});

export default function Request({
	auth,
	request,
}: PageProps<{ auth: { user: userType }; request: requestType }>) {
	return (
		<div className="flex-row justify-center items-center">
			<PDFViewer
				className="mx-auto mt-5"
				style={{ height: "90vh", minWidth: "80vw" }}
			>
				<Document>
					<Page size={"A4"} style={styles.page}>
						<View style={styles.title}>
							<Text style={{ fontSize: 17 }}>MARINHA DO BRASIL</Text>
							<Text style={{ fontSize: 15 }}>
								{auth.user.oms?.description.toUpperCase()}
							</Text>
							<Text style={{ top: 15, fontSize: 15 }}>
								Departamento de Manutenção
							</Text>
						</View>
						<View style={styles.body}>
							<Text
								style={{
									top: -10,
									fontSize: 15,
									marginBottom: 15,
									marginVertical: 8,
								}}
							>
								Nº Pedido: {request?.code}
							</Text>
							<Text style={styles.line}>
								Descrição do pedido: {request?.description}
							</Text>
							<Text style={styles.line}>Solicitante: {auth.user.name}</Text>
							<Text style={styles.line}>
								Setor solicitante: {auth.user.sectors?.description}
							</Text>
							<Text style={styles.line}>
								Local de realização da faína: {request?.location}
							</Text>
							<Text style={styles.line}>
								Status do pedido: {request?.accepted ? "aceito" : "aguardando"}
							</Text>
						</View>
					</Page>
				</Document>
			</PDFViewer>
			<Button
				className="flex w-1/6 my-5 mx-auto"
				onClick={() => {
					router.get("/");
				}}
			>
				Voltar
			</Button>
		</div>
	);
}
