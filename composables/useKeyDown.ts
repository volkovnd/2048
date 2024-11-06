// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useKeyDown = (key: string, fn: () => any) => {
  const cb = (ev: KeyboardEvent) => {
    if (ev.key === key) {
      fn();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", cb);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", cb);
  });
};
