export function formatRate(profile: Record<string, any>): string {
  const hourly = profile.rate_hourly_usd as number | undefined;
  const projectMin = profile.rate_project_min_usd as number | undefined;
  const parts: string[] = [];
  if (hourly) parts.push(`$${hourly}/h`);
  if (projectMin) parts.push(`projects from $${projectMin}`);
  return parts.length ? parts.join(" · ") : "rate on request";
}

export function asArray(v: any): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.length) return [v];
  return [];
}

export function statusLabel(profile: Record<string, any>): string {
  return profile.accepting_bookings ? "open to work" : "currently full";
}

export function specialties(profile: Record<string, any>): string[] {
  return asArray(profile.specialties);
}

export function antiSpecialties(profile: Record<string, any>): string[] {
  return asArray(profile.anti_specialties);
}

export function ensureUrl(u?: string): string | undefined {
  if (!u) return undefined;
  if (u.startsWith("http")) return u;
  return `https://${u}`;
}
