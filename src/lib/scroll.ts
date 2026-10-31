type LenisLike = {
  actualScroll: number;
  scrollTo: (
    target: HTMLElement | number,
    options?: { offset?: number; immediate?: boolean; force?: boolean },
  ) => void;
  start: () => void;
  stop: () => void;
};
let lenis: LenisLike | null = null;
export const setLenis = (l: LenisLike | null) => {
  lenis = l;
};
export function stopSmoothScroll() {
  if (!lenis) return null;
  const position = lenis.actualScroll;
  lenis.stop();
  return position;
}
export function resumeSmoothScroll(position: number | null) {
  if (!lenis) return;
  if (position !== null) lenis.scrollTo(position, { immediate: true, force: true });
  lenis.start();
}
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
