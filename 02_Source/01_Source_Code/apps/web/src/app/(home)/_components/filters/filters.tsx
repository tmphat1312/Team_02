"use client";

import { useEffect, useRef } from "react";

type FilterProps = {
  children?: React.ReactNode;
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
        <div className="width-container">
          <div className="flex items-center gap-6  h-[4.875rem]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
