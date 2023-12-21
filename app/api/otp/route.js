import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
});

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") ?? "";
  console.log({"ip:": ip});


  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new NextResponse("Too many requests", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}`,
      },
    });
  }

  const response = "api has been called";
  return NextResponse.json(response);
}
