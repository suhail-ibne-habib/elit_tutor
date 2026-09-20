"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  kind: "tutor" | "tuition";
  variant?: "hero" | "filters";
};

export default function SearchBar({ kind, variant = "hero" }: SearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const q = String(data.get("q") || "");
    const dest = kind === "tuition" ? "/tuitions" : "/tutors";
    router.push(q ? `${dest}?q=${encodeURIComponent(q)}` : dest);
  }

  if (variant === "filters") {
    return (
      <form className="filters" onSubmit={onSubmit}>
        {kind === "tutor" ? (
          <>
            <select name="subject" defaultValue="">
              <option value="">All subjects</option>
              <option>English</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>ICT</option>
            </select>
            <select name="area" defaultValue="">
              <option value="">All areas</option>
              <option>Dhanmondi</option>
              <option>Uttara</option>
              <option>Mirpur</option>
              <option>Chattogram</option>
            </select>
          </>
        ) : (
          <>
            <select name="class" defaultValue="">
              <option value="">All classes</option>
              <option>Class 5</option>
              <option>Class 8</option>
              <option>SSC</option>
              <option>HSC</option>
            </select>
            <select name="area" defaultValue="">
              <option value="">All areas</option>
              <option>Gulshan</option>
              <option>Banani</option>
              <option>Mirpur</option>
              <option>Agrabad</option>
            </select>
          </>
        )}
        <input
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={kind === "tutor" ? "Search name or keyword" : "Search subject or job title"}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    );
  }

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tutor, subject, or area"
      />
      <button className="btn btn-primary" type="submit">
        Search Tutor
      </button>
    </form>
  );
}
