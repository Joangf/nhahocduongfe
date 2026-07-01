import { createClient } from "@supabase/supabase-js";

function getEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value || value.trim() === "") {
    throw new Error(
      `Thiếu biến môi trường: ${key}\n\n` +
      `Vui lòng tạo file .env trong thư mục gốc dự án (cạnh package.json) với nội dung:\n\n` +
      `VITE_SUPABASE_URL=https://your-project-id.supabase.co\n` +
      `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n\n` +
      `Lấy 2 giá trị này từ Supabase Dashboard → Project Settings → API.\n` +
      `- URL: mục "Project URL"\n` +
      `- ANON_KEY: mục "anon public"`
    );
  }
  return value;
}

const SUPABASE_URL = getEnv("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY = getEnv("VITE_SUPABASE_ANON_KEY");

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase client initialized:", SUPABASE_URL);
