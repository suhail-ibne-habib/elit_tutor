"use client";

export function FormAlert({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (!error && !success) return null;

  if (error) {
    return (
      <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-destructive">{error}</p>
    );
  }

  return <p className="rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">{success}</p>;
}
