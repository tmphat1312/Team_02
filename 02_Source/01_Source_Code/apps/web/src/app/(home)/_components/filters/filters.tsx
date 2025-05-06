"use client";

import { useEffect, useRef } from "react";

import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";

type FilterProps = {
  children: React.ReactNode;
};

export function Filters({ children }: FilterProps) {
  const categoryListRef = useRef<HTMLDivElement>(null);
  const observerElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoryListRef.current || !observerElRef.current) return;

    const categoryListEl = categoryListRef.current;
    const observerEl = observerElRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      categoryListEl.classList.toggle("shadow", !entry.isIntersecting);
    });

    observer.observe(observerEl);
    return () => observer.unobserve(observerEl);
  }, []);

  return (
    <>
      <div ref={observerElRef} />
      <div ref={categoryListRef} className="sticky top-[81px] z-50 bg-white">
        <Container>
          <Stack className="gap-6 h-[4.875rem]">{children}</Stack>
        </Container>
      </div>
    </>
  );
}
