import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shadcn/ui/dialog";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import type { requestType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { twMerge } from "tailwind-merge";
import CancelSVG from "../../svg/cancelSVG";
import ChangeSVG from "../../svg/changeSVG";
import CheckedSVG from "../../svg/checkedSVG";
import ReportSVG from "../../svg/reportSVG";
import UncheckedSVG from "../../svg/uncheckedSVG";

type props = {
	request: requestType;
};

export default function OpenRequestRow({ request }: props) {
	const date = new Date(request.request_date);
	const formateddDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	return (
		<tr className="text-center h-40 border-2 border-black" key={request.code}>
			<td className="border-2 border-black">{request.code}</td>
			<td className="border-2 border-black">{request?.users?.name}</td>
			<td className="border-2 border-black">{formateddDate}</td>
			<td className="border-2 border-black">{request.location}</td>
			<td className="border-2 border-black">
				<Dialog>
					<DialogTrigger>
						{request.description.length > 100
							? request.description.substring(0, 100) + "..."
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
			<td className="items-center justify-center mt-5">
				{request.accepted ? <CheckedSVG /> : <UncheckedSVG />}
			</td>
			<td className="border-black border-2">
				<div className="flex items-center justify-center gap-3">
					<div
						className="m-auto w-1/2 group"
						onClick={() => {
							router.get(`/request/${request.code}/edit`);
						}}
					>
						<ChangeSVG />
					</div>
					<div
						className="group items-center justify-center"
						onClick={() => {
							router.get(`/report/request/${request.code}`);
						}}
					>
						<ReportSVG />
					</div>
					<div className="group items-center justify-center">
						<button
							type="button"
							className="bg-white pt-2"
							onClick={() => {
								router.delete(`/request/${request.code}`);
							}}
						>
							<CancelSVG />
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}
