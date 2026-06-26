import Lenis from "@studio-freight/lenis";

type LenisInstance = InstanceType<typeof Lenis>;

let lenisInstance: LenisInstance | null = null;

export const getLenis = () => lenisInstance;
export const setLenis = (instance: LenisInstance | null) => {
  lenisInstance = instance;
};
