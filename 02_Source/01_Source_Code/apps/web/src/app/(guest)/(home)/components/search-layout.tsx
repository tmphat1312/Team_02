"use client";

import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { cn } from "@/lib/utils";

import { useIsMapOpen } from "../hooks/use-is-map-open";
import { Map } from "./maps/map";

export function SearchLayout({ children }: { children?: React.ReactNode }) {
  const { isMapOpen } = useIsMapOpen();

  return (
    <Container className="py-6">
      <Grid className={cn("grid-cols-1 gap-x-8", isMapOpen && "grid-cols-2")}>
        {children}
        {isMapOpen && <Map />}
      </Grid>
    </Container>
  );
}
