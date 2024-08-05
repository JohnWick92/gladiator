import { osType } from "@/types/custom";

type props = {
  os: osType;
};
export default function CanceledOsRow({ os }: props) {
  return (
    <tr className="text-center h-24" key={os.code}>
      <td className="border-black border-2">{os.code}</td>
      <td className="border-black border-2">{os.code_request}</td>
      <td className="border-black border-2">{os.status}</td>
      <td className="border-black border-2">{os.priority}</td>
      <td className="border-black border-2">{os.oms?.acronym}</td>
    </tr>
  );
}
