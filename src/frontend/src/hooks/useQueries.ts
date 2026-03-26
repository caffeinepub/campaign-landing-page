import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetSupporterCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["supporterCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getSupporterCount();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useAddSupporter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSupporter(name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supporterCount"] });
    },
  });
}
