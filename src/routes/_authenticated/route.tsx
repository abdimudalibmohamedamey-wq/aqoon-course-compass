import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
export const Route = createFileRoute('/_authenticated')({ssr:false,beforeLoad:async()=>{const {data:{user},error}=await supabase.auth.getUser();if(error||!user)throw redirect({to:'/auth'});const {data}=await supabase.from('profiles').select('camp,active').eq('id',user.id).single();if(!data?.camp)throw redirect({to:'/auth',search:{mode:'profile'}});if(!data.active)throw redirect({to:'/auth',search:{mode:'suspended'}});},component:()=> <Outlet/>});
