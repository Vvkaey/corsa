import "styled-components";
import type { Theme } from "@/app/_components/theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation
  export interface DefaultTheme extends Theme {}
}
