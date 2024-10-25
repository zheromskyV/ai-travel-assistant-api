import type { RouterContext } from '@oak/oak/router';
import { randomUUID } from 'node:crypto';

const kv = await Deno.openKv();

const SID = 'sid';
const EXPIRE_IN = 60 * 60 * 1000; // 1 hour

export const enum SessionKey {
  Thread = 'thread_id',
}

interface Session extends Partial<Record<SessionKey, string>> {
  id: string;
}

export async function createSession(ctx: RouterContext<string>): Promise<Session> {
  const sid = randomUUID();
  ctx.state[SID] = sid;
  await ctx.cookies.set(SID, sid);

  const session = { id: sid };
  await setSidKV(session);

  return session;
}

export async function getSession(ctx: RouterContext<string>): Promise<Session | null> {
  const sid = await ctx.cookies.get(SID) || ctx.state[SID];
  return sid ? getSidKV(sid) : null;
}

export async function getFromSession(
  ctx: RouterContext<string>,
  key: SessionKey,
): Promise<string | undefined> {
  const session = await getSession(ctx);
  return session?.[key];
}

export async function setToSession(
  ctx: RouterContext<string>,
  key: SessionKey,
  value: string,
): Promise<void> {
  const session = await getSession(ctx);

  if (session) {
    await setSidKV({ ...session, [key]: value });
  }
}

async function setSidKV(session: Session) {
  return await kv.set([SID, session.id], session, { expireIn: EXPIRE_IN });
}

async function getSidKV(sid: string) {
  const { value } = await kv.get<Session>([SID, sid]);
  return value;
}
