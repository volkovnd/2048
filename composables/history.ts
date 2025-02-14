import type { HistoryItem, ItemDashboard } from "~/types";

export const useHistory = (items: Ref<ItemDashboard>, score: Ref<number>) => {
  const history = ref<HistoryItem[]>([]);

  const prevStep = () => {
    if (history.value.length > 1) {
      const [prevStep] = history.value.splice(history.value.length - 1, 1);

      items.value = prevStep.items;
      score.value = prevStep.score;
    }
  };

  watch(
    items,
    () => {
      history.value.push({
        items: clone(items.value),
        score: score.value
      });
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    history,
    prevStep
  };
};
