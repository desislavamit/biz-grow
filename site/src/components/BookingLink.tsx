import type { ReactNode } from "react";
import { site } from "@/i18n/config";

export function BookingLink({
  className,
  newTabLabel,
  children,
}: {
  className?: string;
  newTabLabel: string;
  children: ReactNode;
}) {
  return (
    <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
