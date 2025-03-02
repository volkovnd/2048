// Очки
export const useScore = (initialScore = 0) => {
  const score = useSessionStorage<number>("2048-score", initialScore);

  const addToScore = (value: number) => {
    score.value += value;
  };

  return {
    score,
    addToScore
  };
};
