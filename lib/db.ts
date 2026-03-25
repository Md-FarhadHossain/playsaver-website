import { createClient } from "@libsql/client";

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
}

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// ── Schema initialisation ─────────────────────────────────────────────────
export async function initDb() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id          TEXT PRIMARY KEY,
      email       TEXT UNIQUE NOT NULL,
      name        TEXT,
      avatar      TEXT,
      created_at  TEXT DEFAULT (datetime('now')),
      last_login  TEXT
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id          TEXT PRIMARY KEY,
      user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      jwt         TEXT NOT NULL,
      created_at  TEXT DEFAULT (datetime('now')),
      expires_at  TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS time_saved (
      id          TEXT PRIMARY KEY,
      user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      seconds     REAL NOT NULL DEFAULT 0,
      date        TEXT NOT NULL,
      created_at  TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, date)
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      slug        TEXT UNIQUE NOT NULL,
      content     TEXT NOT NULL,
      excerpt     TEXT,
      image_url   TEXT,
      meta_title  TEXT,
      meta_desc   TEXT,
      author_id   TEXT REFERENCES users(id),
      published   INTEGER DEFAULT 0,
      created_at  TEXT DEFAULT (datetime('now')),
      updated_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS uninstall_feedback (
      id          TEXT PRIMARY KEY,
      reason      TEXT NOT NULL,
      details     TEXT,
      created_at  TEXT DEFAULT (datetime('now'))
    );
  `);
}

// ── Typed helpers ─────────────────────────────────────────────────────────
export interface DbUser {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  created_at: string;
  last_login: string | null;
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email],
  });
  return (result.rows[0] as unknown as DbUser) ?? null;
}

export async function findUserById(id: string): Promise<DbUser | null> {
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE id = ?",
    args: [id],
  });
  return (result.rows[0] as unknown as DbUser) ?? null;
}

export async function upsertUser(user: {
  id: string;
  email: string;
  name: string;
  avatar: string;
}): Promise<DbUser> {
  await db.execute({
    sql: `INSERT INTO users (id, email, name, avatar, last_login)
          VALUES (?, ?, ?, ?, datetime('now'))
          ON CONFLICT(email) DO UPDATE SET
            name       = excluded.name,
            avatar     = excluded.avatar,
            last_login = datetime('now')`,
    args: [user.id, user.email, user.name, user.avatar],
  });
  const updated = await findUserByEmail(user.email);
  return updated!;
}

export async function createSession(session: {
  id: string;
  userId: string;
  jwt: string;
  expiresAt: Date;
}): Promise<void> {
  await db.execute({
    sql: `INSERT INTO sessions (id, user_id, jwt, expires_at)
          VALUES (?, ?, ?, ?)`,
    args: [
      session.id,
      session.userId,
      session.jwt,
      session.expiresAt.toISOString(),
    ],
  });
}

export async function deleteSessionByJwt(jwt: string): Promise<void> {
  await db.execute({
    sql: "DELETE FROM sessions WHERE jwt = ?",
    args: [jwt],
  });
}

export async function deleteExpiredSessions(): Promise<void> {
  await db.execute({
    sql: "DELETE FROM sessions WHERE expires_at < datetime('now')",
    args: [],
  });
}

export interface UserStats {
  user_id: string;
  email: string;
  name: string;
  total_ms: number;
  synced_at: string;
}

export async function getUserStats(userId: string): Promise<UserStats | null> {
  const result = await db.execute({
    sql: `SELECT * FROM user_stats WHERE user_id = ?`,
    args: [userId],
  });
  
  if (result.rows.length === 0) return null;
  const row = result.rows[0] as Record<string, unknown>;
  
  return {
    user_id: String(row.user_id),
    email: String(row.email),
    name: String(row.name),
    total_ms: Number(row.total_ms ?? 0),
    synced_at: String(row.synced_at),
  };
}

// ── Blog helpers ──────────────────────────────────────────────────────────

export interface DbBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  meta_title: string | null;
  meta_desc: string | null;
  author_id: string | null;
  published: number;
  created_at: string;
  updated_at: string;
}

export async function createBlog(blog: DbBlog): Promise<void> {
  await db.execute({
    sql: `INSERT INTO blogs (id, title, slug, content, excerpt, image_url, meta_title, meta_desc, author_id, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
    args: [
      blog.id,
      blog.title,
      blog.slug,
      blog.content,
      blog.excerpt,
      blog.image_url,
      blog.meta_title,
      blog.meta_desc,
      blog.author_id,
      blog.published,
    ],
  });
}

export async function updateBlog(blog: Partial<DbBlog> & { id: string }): Promise<void> {
  const fields: string[] = [];
  const args: any[] = [];
  
  if (blog.title !== undefined) { fields.push("title = ?"); args.push(blog.title); }
  if (blog.slug !== undefined) { fields.push("slug = ?"); args.push(blog.slug); }
  if (blog.content !== undefined) { fields.push("content = ?"); args.push(blog.content); }
  if (blog.excerpt !== undefined) { fields.push("excerpt = ?"); args.push(blog.excerpt); }
  if (blog.image_url !== undefined) { fields.push("image_url = ?"); args.push(blog.image_url); }
  if (blog.meta_title !== undefined) { fields.push("meta_title = ?"); args.push(blog.meta_title); }
  if (blog.meta_desc !== undefined) { fields.push("meta_desc = ?"); args.push(blog.meta_desc); }
  if (blog.published !== undefined) { fields.push("published = ?"); args.push(blog.published); }
  
  if (fields.length === 0) return;
  
  fields.push("updated_at = datetime('now')");
  args.push(blog.id);

  await db.execute({
    sql: `UPDATE blogs SET ${fields.join(", ")} WHERE id = ?`,
    args,
  });
}

export async function getBlogBySlug(slug: string): Promise<DbBlog | null> {
  const result = await db.execute({
    sql: "SELECT * FROM blogs WHERE slug = ?",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return JSON.parse(JSON.stringify(result.rows[0]));
}

export async function getBlogById(id: string): Promise<DbBlog | null> {
  const result = await db.execute({
    sql: "SELECT * FROM blogs WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return null;
  return JSON.parse(JSON.stringify(result.rows[0]));
}

export async function getAllBlogs(publishedOnly = false): Promise<DbBlog[]> {
  const sql = publishedOnly 
    ? "SELECT * FROM blogs WHERE published = 1 ORDER BY created_at DESC" 
    : "SELECT * FROM blogs ORDER BY created_at DESC";
  
  const result = await db.execute({ sql, args: [] });
  return result.rows.map(row => JSON.parse(JSON.stringify(row)));
}

export async function deleteBlog(id: string): Promise<void> {
  await db.execute({
    sql: "DELETE FROM blogs WHERE id = ?",
    args: [id],
  });
}

export async function createUninstallFeedback(feedback: {
  id: string;
  reason: string;
  details?: string;
}): Promise<void> {
  await db.execute({
    sql: `INSERT INTO uninstall_feedback (id, reason, details) VALUES (?, ?, ?)`,
    args: [feedback.id, feedback.reason, feedback.details || null],
  });
}

export interface DbUninstallFeedback {
  id: string;
  reason: string;
  details: string | null;
  created_at: string;
}

export async function getAllUninstallFeedback(): Promise<DbUninstallFeedback[]> {
  const result = await db.execute({
    sql: "SELECT * FROM uninstall_feedback ORDER BY created_at DESC",
    args: [],
  });
  return result.rows.map(row => JSON.parse(JSON.stringify(row)));
}
