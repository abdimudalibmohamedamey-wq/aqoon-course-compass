import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
export const getCourses = createServerFn({method:'GET'}).handler(async()=>{
 const key=process.env['SUPABASE_PUBLISHABLE_KEY']; const url=process.env['SUPABASE_URL'];
 if(!key||!url) throw new Error('Course service is unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers); if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const {data,error}=await client.from('courses').select('*').eq('published',true).order('created_at').limit(100);if(error)throw error;return data;
});
export const setEducatorRole = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({userId:z.uuid(),approved:z.boolean()})).handler(async({data,context})=>{
 const {data:admin,error}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(error||!admin)throw new Error('Administrator access required');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const result=data.approved?await supabaseAdmin.from('user_roles').upsert({user_id:data.userId,role:'educator'},{onConflict:'user_id,role'}):await supabaseAdmin.from('user_roles').delete().eq('user_id',data.userId).eq('role','educator');if(result.error)throw result.error;return {success:true};
});
