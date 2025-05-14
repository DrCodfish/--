-- Step 1: Create the 'users' table without the 'store_id' foreign key
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_owner BOOLEAN NOT NULL DEFAULT FALSE,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add a default value for the 'approved' column in the 'users' table
ALTER TABLE public.users ALTER COLUMN approved SET DEFAULT FALSE;

-- Ensure all existing users have the 'approved' column set to FALSE if NULL
UPDATE public.users SET approved = FALSE WHERE approved IS NULL;

-- Step 2: Create the 'stores' table without the 'created_by' foreign key
CREATE TABLE public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Step 3: Add the 'store_id' column to the 'users' table with the foreign key constraint
ALTER TABLE public.users ADD COLUMN store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL;

-- Step 4: Add the 'created_by' column to the 'stores' table with the foreign key constraint
ALTER TABLE public.stores ADD COLUMN created_by UUID REFERENCES public.users(id) ON DELETE SET NULL;

-- Enable Row-Level Security (RLS) for 'users'
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
ON public.users
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow select for authenticated users
CREATE POLICY "Allow select for authenticated users"
ON public.users
FOR SELECT
USING (auth.role() = 'authenticated');

-- Enable Row-Level Security (RLS) for 'stores'
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
ON public.stores
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow select for authenticated users
CREATE POLICY "Allow select for authenticated users"
ON public.stores
FOR SELECT
USING (auth.role() = 'authenticated');

-- RLS Policy: Allow update for store owners
CREATE POLICY "Allow update for store owners"
ON public.stores
FOR UPDATE
USING (created_by = auth.uid());

-- Create the 'forums' table
CREATE TABLE public.forums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id),
    store_id UUID REFERENCES public.stores(id),
    region TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security (RLS) for 'forums'
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
ON public.forums
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow select for authenticated users
CREATE POLICY "Allow select for authenticated users"
ON public.forums
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create the 'forum_replies' table
CREATE TABLE public.forum_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    forum_id UUID REFERENCES public.forums(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security (RLS) for 'forum_replies'
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
ON public.forum_replies
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow select for authenticated users
CREATE POLICY "Allow select for authenticated users"
ON public.forum_replies
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create the 'calendar_events' table
CREATE TABLE public.calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    start TIMESTAMP NOT NULL,
    "end" TIMESTAMP NOT NULL,
    store_id UUID REFERENCES public.stores(id),
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security (RLS) for 'calendar_events'
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
ON public.calendar_events
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow select for authenticated users
CREATE POLICY "Allow select for authenticated users"
ON public.calendar_events
FOR SELECT
USING (auth.role() = 'authenticated');