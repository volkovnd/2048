import type { HistoryItem, ItemDashboard } from "~/types";

export const useHistory = (items: Ref<ItemDashboard>, score: Ref<number>) => {
  const history = useSessionStorage<HistoryItem[]>("2048-history", () => []);

  onBeforeMount(() => {
    if (history.value.length > 0) {
      const currentMaxId = Math.max(
        ...history.value[history.value.length - 1].items.map((item) => item.id)
      );

      setCreateItemId(currentMaxId + 1);
    }
  });

  const prevStep = () => {
    if (history.value.length >= 1) {
      const [prevStep] = history.value.splice(history.value.length - 2, 1);

      items.value = prevStep.items;
      score.value = prevStep.score;
    }
  };

  const addToHistory = () => {
    history.value.push({
      items: clone(items.value),
      score: score.value
    });
  };

  return {
    history,
    prevStep,
    addToHistory
  };
};
