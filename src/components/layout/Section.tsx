import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-7xl flex-col px-5 py-20 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
