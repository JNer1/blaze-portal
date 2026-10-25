import { useEffect, useState } from "react";
import { healthResponseSchema } from "@/shared/health";
import { Button } from "./components/ui/button";

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

  const check = () => {
    setApi("checking");
    void fetchHealth().then(setApi);
  };

  useEffect(() => {
    void fetchHealth().then(setApi);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">BlAzE Portal</h1>
        <p className="text-muted-foreground mt-2">
          Research administration tools. Development build — no features yet.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p role="status" data-state={api} className="font-medium">
          {statusText[api]}
        </p>
        <Button variant="outline" size="sm" onClick={check}>
          Check again
        </Button>
      </div>
    </main>
  );
}
