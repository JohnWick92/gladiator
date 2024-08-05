import { Button } from "@/shadcn/ui/button";
import { PageProps } from "@/types";
import { osType, userType } from "@/types/custom";
import { router } from "@inertiajs/react";

type props = {
  os: osType;
  user: userType;
};
export default function ToCancelOsRow({ os, user }: props) {
  return (
    <tr className="text-center h-24" key={os.code}>
      <td className="border-black border-2">{os.code}</td>
      <td className="border-black border-2">{os.code_request}</td>
      <td className="border-black border-2">{os.status}</td>
      <td className="border-black border-2">{os.priority}</td>
      <td className="border-black border-2">{os.oms?.acronym}</td>
      <td className="flex justify-center items-center gap-5 h-24 border-2 border-black">
        <Button
          type="button"
          onClick={() => {
            router.put(`/os/manage/cancel/${os.code}`, {
              nip: user.nip,
            });
          }}
        >
          Confirmar
        </Button>
      </td>
    </tr>
  );
}
