// Очки
export const useScore = (initialScore = 0) => {
  const score = ref(initialScore);

  const addToScore = (value: number) => {
    score.value += value;
  };

  return {
    score,
    addToScore
  };
};
