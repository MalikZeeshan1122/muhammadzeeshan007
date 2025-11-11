-- Update RLS policies to allow public read access to portfolio data
DROP POLICY IF EXISTS "Users can view their own portfolio data" ON public.portfolio_data;

-- Allow anyone to view portfolio data
CREATE POLICY "Anyone can view portfolio data" 
ON public.portfolio_data 
FOR SELECT 
USING (true);

-- Keep write access restricted to authenticated users
-- (The insert, update, delete policies remain the same)