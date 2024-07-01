import Menu from "@/components/Menu";
import LogoLargeSVG from "@/components/svg/logoLargeSVG";
import { PageProps } from "@/types";
import { userType } from "@/types/custom";

export default function About({
	auth,
}: PageProps<{ auth: { user: userType } }>) {
	return (
		<div className="bg-slate-600">
			<Menu profile_description={auth.user.profile_description} />
			<div className="flex-row w-3/5 text-xl text-slate-300 m-auto items-center pt-16">
				<div className="w-1/4 pl-28 m-auto pt-5 items-center">
					<LogoLargeSVG />
				</div>
				<div className="mt-10 text-left">
					<p>
						O Sistema de Gestão de Ordens de Serviço (SGOS) teve sua primeira
						versão disponibilizada em 2006 com o objetivo de atender as demandas
						do Esquadrão de Infraestrutura da Base Aérea do Galeão. Essa versão
						limitava-se ao público interno daquele Esquadrão que pode evoluir de
						controles físicos para um processo parcialmente informatizado.
					</p>
					<br />
					<p>
						Meses depois, por determinação do Comando na época, um novo nome
						deveria ser dado ao Sistema, algo que conectasse com o proceder
						aguerrido da equipe que atendia a um volume acentuado de pedidos dos
						diversos Esquadrões ali sediados. Optou-se, então, pelo nome
						Gladiador e, nessa ocasião, o Sistema ganhou nova interface em uma
						versão que agora estava disponível para toda a Base e OM sediadas.
					</p>
					<br />
					<p>
						A adaptação do Gladiador para a Divisão de Manutenção do CTMRJ
						ocorreu por solicitação daquela Divisão à Assessoria de TI em 2019.
						O mapeamento dos processos foi realizado e as funcionalidades do
						Sistema foram ajustadas às especificidades advindas das regras de
						negócio atuais. Encerrados os ajustes, o Gladiador passou pelo mesmo
						processo de implantação empregado pela FAB, no qual inicialmente
						apenas a Divisão de Manutenção possuía o acesso.
					</p>
					<br />
					<p>
						Encerrada a fase inicial, o Sistema foi disponibilizado amplamente e
						a gestão administrativa da OM passou a contar com uma ferramenta
						valiosa capaz de apoiar a tomada de decisão sobre pessoal e material
						das diversas oficinas da Divisão A essa altura, os dashboards
						gerados a partir da base de dados do Sistema, passaram a ser usados
						no Conselho de Gestão e facilitaram o acesso a informações
						atualizadas pelos gestores.
					</p>
					<br />
					<p>
						A rápida evolução tecnológica associada às normas de gestão da TIC
						da Força, tornam mister uma nova versão do software, ajustada ao
						atendimento dos mais modernos requisitos tecnológicos e normativos.
						Dessa forma, em 2022 após necessidade de desativação do Gladiador em
						decorrência das normas em vigor na MB, foi realizado tentativa de
						portabilidade das versões dos softwares que o integravam não
						logrando êxito, foi executada uma adptação pelos membros do CLTI
						Ribeira para que o mesmo volta-se a operar deixando sua interface
						WEB e se tornando-o um aplicativo desktop e adição de
						funcionalidades para melhor tramite dos pedidos por parte dos
						solicitantes.
					</p>
					<br />
					<p>
						Com o uso do aplicativo desktop tornando sobremodo trabalhosa a
						manutenção das versões do sistema foi retomada sua migração para um
						serviço disponibilizado via WEB fazendo uso de novas tecnologias
						para sua portabilidade e realizando incrementos para amplificar a
						abrangência do uso do sistema não apenas a divisão de manutenção do
						CTMRJ, mas de forma a atender as divisões de manutenção das OMs do
						CNR, oferecendo um software consolidado para a gestão de
						solicitações e execuções de serviços.
					</p>
					<br />
					<p>
						Dessa forma, em 2024 é disponibilizada a versão 3.0 que torna ainda
						mais eficiente e seguro o emprego do Sistema em meio a uma
						infraestrutura física hiperconvergente também modernizada
						recentemente.
					</p>
					<br />
					<p className="mt-5 text-2xl text-center">Créditos</p>
					<br />
					<p>
						Ao CC (T) Everaldo Antonio Moreira Alves, Desenvolvedor do Gladiador
						original tendo criado a 1º versão do software empregada na FAB e
						posteriormente sua 1º adaptação para emprego no CTMRJ.
					</p>
					<br />
					<p>
						A CB-PD Danusia Monteiro de Moraes e ao MN-RM2 Elias de Oliveira
						Ferreira, responsavéis pela adaptação do software as normas em vigor
						na MB gerando sua versão 2.0 tornando o sistema um aplicativo
						desktop.
					</p>
					<br />
					<p>
						Ao MN-RM2 Elias de Oliveira Ferreira e ao Sr Josué de Oliveira
						Ferreira, responsavéis por migrarem o sistema para operar novamente
						via WEB e atualizar as tecnologias nele empregadas além de
						amplificação de sua abrangência.
					</p>
					<br />
					<hr />
					<div className="text-center py-5">
						<h1>Gladiador versão 3.0.0</h1>
						<h2>Desenvolvido por: Elias & Josué Ferreira</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
