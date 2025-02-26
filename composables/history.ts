import type { HistoryItem, ItemDashboard } from "~/types";

export const useHistory = (items: Ref<ItemDashboard>, score: Ref<number>) => {
  const history = useSessionStorage<HistoryItem[]>("2048-history", () => []);

  const prevStep = () => {
    if (history.value.length > 1) {
      const [prevStep] = history.value.splice(history.value.length - 2, 2);

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
