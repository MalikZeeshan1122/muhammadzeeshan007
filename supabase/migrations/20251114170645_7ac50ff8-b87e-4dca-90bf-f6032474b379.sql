-- Add is_public column to portfolio_data table
ALTER TABLE public.portfolio_data 
ADD COLUMN is_public boolean NOT NULL DEFAULT false;

-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can view portfolio data" ON public.portfolio_data;

-- Create new policy: only allow viewing of portfolios marked as public
CREATE POLICY "Anyone can view public portfolios" 
ON public.portfolio_data 
FOR SELECT 
USING (is_public = true);

-- Users can still view their own portfolio data (public or private)
CREATE POLICY "Users can view their own portfolio data" 
ON public.portfolio_data 
FOR SELECT 
USING (auth.uid() = user_id);