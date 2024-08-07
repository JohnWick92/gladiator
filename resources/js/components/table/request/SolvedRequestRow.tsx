import Rate from "@/components/Rate";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import type { requestType } from "@/types/custom";
import { twMerge } from "tailwind-merge";

type props = {
	request: requestType;
};

export default function SolvedRequesRow({ request }: props) {
	const date = new Date(request.request_date);
	const formateddDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	return (
		<tr className="text-center border-2 border-black" key={request.code}>
			<td className="border-2 border-black">{request.code}</td>
			<td className="border-2 border-black">{request?.users?.name}</td>
			<td className="border-2 border-black">{formateddDate}</td>
			<td className="border-2 border-black">{request.location}</td>
			<td className="h-40 border-2 border-black">
				<Dialog>
					<DialogTrigger>
						{request.description.length > 100
							? `${request.description.substring(0, 100)}...`
							: request.description}
					</DialogTrigger>
					<DialogContent
						className={twMerge(
							"py-16 text-xl",
							request.description.length > 300 && "h-3/4",
						)}
					>
						<ScrollArea>
							<DialogTitle className="my-5 text-center">
								Descrição do pedido
							</DialogTitle>
							<div className="pr-5">{request.description}</div>
						</ScrollArea>
					</DialogContent>
				</Dialog>
			</td>
			<td className="border-2 border-black">
				<Dialog>
					<DialogTrigger>
						{request.resolution.length > 100
							? `${request.resolution.substring(0, 100)}...`
							: request.resolution}
					</DialogTrigger>
					<DialogContent
						className={twMerge(
							"py-16 text-xl",
							request.resolution.length > 300 && "h-3/4",
						)}
					>
						<ScrollArea>
							<DialogTitle className="my-5 text-center">
								Resolução do pedido
							</DialogTitle>
							<div className="pr-5">{request.resolution}</div>
						</ScrollArea>
					</DialogContent>
				</Dialog>
			</td>
			<td className="border-2 border-black">
				<Rate code_request={request.code} nip={request.nip} />
			</td>
		</tr>
	);
}
