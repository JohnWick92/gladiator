import { Button } from "@/shadcn/ui/button";
import { osType } from "@/types/custom";
import { router } from "@inertiajs/react";

type props = {
	item: osType;
};

function OsRow({ item }: props) {
	return (
		<tr className="text-center h-24" key={item.code}>
			<td className="border-black border-2">{item.code}</td>
			<td className="border-black border-2">{item.code_request}</td>
			<td className="border-black border-2">{item.status}</td>
			<td className="border-black border-2">{item.priority}</td>
			<td className="border-black border-2">{item.oms?.acronym}</td>
			<td className="border-black border-2">
				<Button
					onClick={() => {
						router.get(`/os/${item.code}`);
					}}
				>
					Ver em detalhes
				</Button>
			</td>
		</tr>
	);
}

export default OsRow;
