-- Chạy lệnh này trong Supabase SQL Editor (supabase.com → project → SQL Editor)

CREATE TABLE registrations (
  id              BIGSERIAL PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  hoten           TEXT,
  sdt             TEXT,
  email           TEXT,
  congty          TEXT,
  chucvu          TEXT,
  ghichu          TEXT,
  da_chuyen_khoan TEXT
);
