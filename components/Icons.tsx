// Icons: Phosphor (one family, site-wide). The SSR build works in both
// Server and Client Components.
import {
  ArrowRight,
  ArrowUpRight,
  ArrowsLeftRight,
  BookOpen,
  CaretDown,
  Check,
  CurrencyGbp,
  Info,
  Leaf,
  List,
  Path,
  Question,
  ShieldCheck,
  Truck,
  Warning,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";

type P = { className?: string };
const make = (Icon: React.ComponentType<IconProps>, weight: IconProps["weight"] = "regular", fallback = "h-4 w-4") => {
  function Wrapped({ className = fallback }: P) {
    return <Icon className={className} weight={weight} aria-hidden="true" />;
  }
  return Wrapped;
};

export const IconArrow = make(ArrowRight, "bold");
export const IconArrowUpRight = make(ArrowUpRight, "bold");
export const IconCheck = make(Check, "bold");
export const IconX = make(X, "bold");
export const IconChevron = make(CaretDown, "bold");
export const IconMenu = make(List, "regular", "h-5 w-5");
export const IconInfo = make(Info);
export const IconAlert = make(Warning);
export const IconCompare = make(ArrowsLeftRight, "regular", "h-5 w-5");
export const IconPound = make(CurrencyGbp, "regular", "h-5 w-5");
export const IconShield = make(ShieldCheck, "regular", "h-5 w-5");
export const IconRoute = make(Path, "regular", "h-5 w-5");
export const IconLeaf = make(Leaf, "regular", "h-5 w-5");
export const IconTruck = make(Truck);
export const IconBook = make(BookOpen, "regular", "h-5 w-5");
export const IconQuestion = make(Question, "regular", "h-5 w-5");

export const serviceIcons = {
  compare: IconCompare,
  pound: IconPound,
  check: IconShield,
  route: IconRoute,
  leaf: IconLeaf,
  book: IconBook,
};
