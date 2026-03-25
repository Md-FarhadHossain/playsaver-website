import { createClient } from '@libsql/client';

const db = createClient({
  url:       'libsql://play-saver-farhadix.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzM5Mjc4ODcsImlkIjoiMDE5ZDA1NzItOTEwMS03OTNmLWI5NjUtYjcyZWIzY2Y5OTkzIiwicmlkIjoiY2ZlZjAyMTEtMjYxNS00ZTlhLWFjZTUtMTg0NTUwZGNiNDJmIn0.m990ALvUO7rK33zDPjqm1r1nBGT_Sjg1JCBysw-y7Ul6Bpf9WqxhoHRSdcuDsSzCpBDd123HC2Kt_Jow0BKkDw',
});

const users = await db.execute({ sql: 'SELECT id, email, name, avatar FROM users WHERE email LIKE ?', args: ['%farhad%'] });
console.log('users =>', users.rows);

const stats = await db.execute({ sql: 'SELECT user_id, email, name, total_ms FROM user_stats WHERE email LIKE ?', args: ['%farhad%'] });
console.log('stats =>', stats.rows);
