-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table (Stores both Citizens and Doctors)
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text not null check (role in ('citizen', 'doctor', 'admin')),
  
  -- Citizen specific
  abha_id text unique,
  contact text,
  blood_group text,
  allergies text,
  
  -- Doctor specific
  license_id text unique,
  hospital_name text,
  
  -- Auth (Simple for demo)
  password_hash text not null
);

-- Medical Records Table
create table public.medical_records (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  patient_id uuid references public.users(id) not null,
  doctor_id uuid references public.users(id), -- Can be null if self-uploaded
  type text not null, -- 'Lab Report', 'Prescription', 'Scan'
  description text,
  file_url text, -- URL to file in Supabase Storage
  metadata jsonb
);

-- Consents Table
create table public.consents (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  patient_id uuid references public.users(id) not null,
  doctor_id uuid references public.users(id) not null,
  status text not null default 'pending', -- 'granted', 'revoked', 'pending'
  expires_at timestamp with time zone,
  
  unique(patient_id, doctor_id)
);

-- Access Logs
create table public.access_logs (
  id uuid default uuid_generate_v4() primary key,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  doctor_id uuid references public.users(id),
  patient_id uuid references public.users(id),
  action text not null
);

-- Row Level Security (RLS) - Basic Setup
alter table public.users enable row level security;
alter table public.medical_records enable row level security;
alter table public.consents enable row level security;

-- Policies (Open for Demo - allow authenticated access)
create policy "Allow public read for demo" on public.users for select using (true);
create policy "Allow public insert for demo" on public.users for insert with check (true);
create policy "Allow public read for demo" on public.medical_records for select using (true);
create policy "Allow public insert for demo" on public.medical_records for insert with check (true);
