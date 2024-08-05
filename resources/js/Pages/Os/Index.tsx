import Menu from "@/components/Menu";
import CanceledOsRow from "@/components/table/os/CanceledOsRow";
import OpenOsRow from "@/components/table/os/OpenOsRow";
import ToCancelOsRow from "@/components/table/os/ToCancelOsRow";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { PageProps } from "@/types";
import { osType, userType } from "@/types/custom";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Os({
  auth,
  canceledOs,
  osListToCancel,
  osList,
}: PageProps<{
  auth: { user: userType };
  osList: osType[];
  osListToCancel: osType[];
  canceledOs: osType[];
}>) {
  const [search, setSearch] = useState("");
  const { flash } = usePage().props as PageProps<{ flash: any }> & any;

  useEffect(() => {
    toast("Atualização", {
      description: flash.success,
      action: {
        label: "Ok",
        onClick() {},
      },
    });
  }, [flash]);

  return (
    <div className="w-full">
      {flash.success && <Toaster />}
      <Menu profile_description={auth.user.profile_description} />
      <Tabs defaultValue="ongoing">
        <TabsList>
          <TabsTrigger value="ongoing">Os em aberto</TabsTrigger>
          <TabsTrigger value="toCancel">Aguardando cancelamento</TabsTrigger>
          <TabsTrigger value="canceled">Cancelados</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <div className="mt-10 items-center justify-center w-full m-auto text-xl">
            <div className="items-center justify-center w-1/4 m-auto pb-10">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filtros"
              />
            </div>
            <table className="w-3/4 m-auto">
              <tbody>
                <tr className="text-center">
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Nº OS
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Nº Pedido
                  </th>
                  <th className="border-blue-950 border bg-slate-300">
                    Status
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Prioridade
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    OM
                  </th>
                  <th className="border-blue-950 border bg-slate-300">
                    Mais detalhes
                  </th>
                </tr>
                {osList
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.code === Number.parseInt(search) ||
                          item.code_request === Number.parseInt(search) ||
                          item.status
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          item.priority
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          item?.requests?.description
                            .toLowerCase()
                            .includes(search.toLowerCase());
                  })
                  .map((item) => {
                    return <OpenOsRow key={item.code} item={item} />;
                  })}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="toCancel">
          <div className="mt-10 items-center justify-center w-full m-auto text-xl">
            <table className="w-3/4 m-auto">
              <tbody>
                <tr className="text-center">
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Nº OS
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Nº Pedido
                  </th>
                  <th className="border-blue-950 border bg-slate-300">
                    Status
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Prioridade
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    OM
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Confirmar
                  </th>
                </tr>
                {osListToCancel.map((item) => {
                  return <ToCancelOsRow os={item} user={auth.user} />;
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="canceled">
          <div className="mt-10 items-center justify-center w-full m-auto text-xl">
            <table className="w-3/4 m-auto">
              <tbody>
                <tr className="text-center">
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Nº OS
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Nº Pedido
                  </th>
                  <th className="border-blue-950 border bg-slate-300">
                    Status
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    Prioridade
                  </th>
                  <th className="w-1/12 border-blue-950 border bg-slate-300">
                    OM
                  </th>
                </tr>
                {canceledOs.map((item) => {
                  return <CanceledOsRow os={item} />;
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
