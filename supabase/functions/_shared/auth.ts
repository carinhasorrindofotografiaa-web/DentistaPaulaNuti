import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateResetToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
