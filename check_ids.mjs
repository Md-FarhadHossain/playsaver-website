import { createClient } from '@libsql/client';

const db = createClient({
  url:       'libsql://play-saver-farhadix.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzM5Mjc4ODcsImlkIjoiMDE5ZDA1NzItOTEwMS03OTNmLWI5NjUtYjcyZWIzY2Y5OTkzIiwicmlkIjoiY2ZlZjAyMTEtMjYxNS00ZTlhLWFjZTUtMTg0NTUwZGNiNDJmIn0.m990ALvUO7rK33zDPjqm1r1nBGT_Sjg1JCBysw-y7Ul6Bpf9WqxhoHRSdcuDsSzCpBDd123HC2Kt_Jow0BKkDw',
});

console.log('\n=== users table ===');
const users = await db.execute('SELECT id, email, name FROM users');
console.table(users.rows);

console.log('\n=== user_stats table ===');
const stats = await db.execute('SELECT user_id, email, name, total_ms, synced_at FROM user_stats');
console.table(stats.rows);

console.log('\n=== time_saved table ===');
const ts = await db.execute('SELECT user_id, seconds, date FROM time_saved LIMIT 10');
console.table(ts.rows);
