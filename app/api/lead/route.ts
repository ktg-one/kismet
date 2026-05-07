import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/email";
import { appendLeadRow } from "@/lib/sheets";

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const submittedAt = new Date().toISOString();
  const data = parsed.data;

  const results = await Promise.allSettled([
    sendLeadEmail(data),
    appendLeadRow({ ...data, submittedAt }),
  ]);

  const anyFulfilled = results.some((r) => r.status === "fulfilled");
  const allConfigErrors = results.every(
    (r) => r.status === "rejected" && /not configured/.test((r as PromiseRejectedResult).reason?.message ?? "")
  );

  if (allConfigErrors) {
    console.warn("[lead] All sinks unconfigured, lead dropped:", data);
    return NextResponse.json({ error: "service_unconfigured" }, { status: 503 });
  }

  if (anyFulfilled) {
    if (results.some((r) => r.status === "rejected")) {
      console.warn("[lead] Partial sink failure", results);
    }
    return NextResponse.json({ ok: true });
  }

  console.error("[lead] All sinks failed", results);
  return NextResponse.json({ error: "server_error" }, { status: 500 });
}
