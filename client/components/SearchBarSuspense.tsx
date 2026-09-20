"use client";

import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";

type Props = {
  kind: "tutor" | "tuition";
  variant?: "hero" | "filters";
};

export default function SearchBarSuspense(props: Props) {
  return (
    <Suspense fallback={<div className={props.variant === "filters" ? "filters" : "search-bar"} />}>
      <SearchBar {...props} />
    </Suspense>
  );
}
