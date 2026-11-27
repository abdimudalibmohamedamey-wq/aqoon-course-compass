import { z } from 'zod';
import classroom from '@/assets/classroom.jpg.asset.json';
import students from '@/assets/students.jpg.asset.json';
import type { Tables } from '@/integrations/supabase/types';
export const camps = ['Ifo', 'Hagadera', 'Dagahaley'] as const;
export const categories = ['Digital Skills', 'Languages', 'Business', 'Life Skills'] as const;
export const campSchema = z.enum(camps);
export const registrationSchema = z.object({display_name:z.string().trim().min(2),camp:campSchema,account_type:z.enum(['learner','educator'])});
export const courseSchema = z.object({title:z.string().trim().min(3),description:z.string().trim().min(10),category:z.enum(categories),duration:z.string().min(1),level:z.enum(['Beginner','Intermediate','Advanced']),published:z.boolean()});
export type Course = Tables<'courses'>;
export type Profile = Tables<'profiles'>;
export type Lesson = Tables<'lessons'>;
export function courseImage(key:string){return key==='students'?students.url:classroom.url;}
export const heroImage = classroom.url;
export function pageHead(title:string,description:string){return {meta:[{title:`${title} | AQOON`},{name:'description',content:description},{property:'og:title',content:`${title} | AQOON`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}
