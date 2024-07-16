import Menu from "@/components/Menu";
import ChangeSVG from "@/components/svg/changeSVG";
import CheckedSVG from "@/components/svg/checkedSVG";
import DeleteSVG from "@/components/svg/deleteSVG";
import UncheckedSVG from "@/components/svg/uncheckedSVG";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { PageProps } from "@/types";
import { omType, userType, workshopType } from "@/types/custom";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
    oms,
    auth,
    workshops,
}: PageProps<{
    workshops: workshopType[];
    auth: { user: userType };
    oms: omType[];
}>) {
    const [search, setSearch] = useState("");

    return (
        <div className="w-full">
            <Menu profile_description={auth.user.profile_description} />
            <div className="mt-10 items-center justify-center w-full m-auto text-xl">
                <div className="items-center justify-center w-1/4 m-auto pb-10">
                    <Button
                        className="w-full mb-5"
                        onClick={() => router.get("/workshop/create")}
                    >
                        Nova oficina
                    </Button>
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Filtro por descrição"
                    />
                </div>
                <table className="w-3/4 m-auto">
                    <tbody>
                        <tr>
                            <th className="border-blue-950 border bg-slate-300">Descrição</th>
                            <th className="w-1/12 border-blue-950 border bg-slate-300">
                                Ativo
                            </th>
                            <th className="w-1/6 border-blue-950 border bg-slate-300">OM</th>
                            <th className="w-1/6 border-blue-950 border bg-slate-300">
                                Ações
                            </th>
                        </tr>
                        {workshops
                            ?.filter((item) => {
                                if (auth.user?.profile_description === "Administrador")
                                    return item;
                                return item.code_om === auth.user?.code_om;
                            })
                            .filter((item) => {
                                return search.toLocaleLowerCase() === ""
                                    ? item
                                    : item.description
                                        .toLocaleLowerCase()
                                        .includes(search.toLocaleLowerCase());
                            })
                            .map((item) => {
                                return (
                                    <tr className="text-center" key={item.code}>
                                        <td>{item.description}</td>
                                        <td>{item.active ? <CheckedSVG /> : <UncheckedSVG />}</td>
                                        <td>{item?.oms?.acronym}</td>
                                        <td className="flex justify-center">
                                            <div
                                                className="m-auto w-1/2 group"
                                                onClick={() => {
                                                    router.delete(`/workshop/${item.code}`);
                                                }}
                                            >
                                                <DeleteSVG />
                                            </div>
                                            <div
                                                className="m-auto w-1/2 group"
                                                onClick={() => {
                                                    router.get(`/workshop/${item.code}/edit`);
                                                }}
                                            >
                                                <ChangeSVG />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
