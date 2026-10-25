import { useEffect, useState } from "react";
import { healthResponseSchema } from "@/shared/health";
import { SalaryRequestPage } from "./salary/SalaryRequestPage";

type ApiState = "checking" | "ok" | "unavailable";

async function fetchHealth(): Promise<ApiState> {
  try {
    const res = await fetch("/api/health");
    if (!res.ok) return "unavailable";
    healthResponseSchema.parse(await res.json());
    return "ok";
  } catch {
    return "unavailable";
  }
}

const statusText: Record<ApiState, string> = {
  checking: "Checking API…",
  ok: "API is running",
  unavailable: "API is unavailable",
};

export function App() {
  const [api, setApi] = useState<ApiState>("checking");

  useEffect(() => {
    void fetchHealth().then(setApi);
  }, []);

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold tracking-tight">BlAzE Portal</h1>
          <p data-testid="api-status" data-state={api} className="text-muted-foreground text-sm">
            {statusText[api]}
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Salary request</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Development build. Nothing is saved; use made-up data only.
          </p>
        </div>
        <SalaryRequestPage />
      </main>
    </div>
  );
}
