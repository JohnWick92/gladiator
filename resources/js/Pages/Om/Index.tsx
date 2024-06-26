import ChangeSVG from "@/components/svg/changeSVG";
import DeleteSVG from "@/components/svg/deleteSVG";
import { Input } from "@/components/ui/input";
import { PageProps } from "@/types";
import { omType } from "@/types/custom";
import { useState } from "react";

export default function Index({ oms }: PageProps<{ oms: omType[] }>) {

    const [search, setSearch] = useState("");

    return (
        <div className="w-full">
            <h1 className="bg-red-700">Hello!</h1>
            <div className="mt-10 items-center justify-center w-full text-xl">
                <div className="items-center justify-center w-1/4 m-auto pb-10">
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Filtro por descrição"
                    />
                </div>
                <table className="w-3/4 m-auto">
                    <tbody>
                        <tr>
                            <th className="w-1/4 border-blue-950 border bg-slate-300">
                                Sigla
                            </th>
                            <th className="w-1/4 border-blue-950 border bg-slate-300">
                                Descrição
                            </th>
                            <th className="w-1/6 border-blue-950 border bg-slate-300">
                                Ações
                            </th>
                        </tr>
                        {oms
                            ?.filter((item) => {
                                return search.toLocaleLowerCase() === ""
                                    ? item
                                    : item.description
                                        .toLocaleLowerCase()
                                        .includes(search.toLocaleLowerCase());
                            })
                            .map((item) => {
                                return (
                                    <tr className="text-center" key={item.code}>
                                        <td>{item.acronym}</td>
                                        <td>{item.description}</td>
                                        <td className="flex justify-center">
                                            <div
                                                className="m-auto w-1/2 group"
                                            // onClick={() => del({ code: item.code })}
                                            >
                                                <DeleteSVG />
                                            </div>
                                            <div
                                                className="m-auto w-1/2 group"
                                            // onClick={() => toUpdate(item)}
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
