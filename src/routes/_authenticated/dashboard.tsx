import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import { accountQuery,dashboardQuery } from '@/lib/queries';
import { pageHead } from '@/lib/aqoon';
export const Route=createFileRoute('/_authenticated/dashboard')({head:()=>pageHead('My Learning','Your enrolled courses and learning community on AQOON.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(accountQuery),context.queryClient.ensureQueryData(dashboardQuery)]);},component:Dashboard});
function Dashboard(){const {data:account}=useSuspenseQuery(accountQuery);const {data:enrolments}=useSuspenseQuery(dashboardQuery);return <DashboardLayout><div className="section-heading"><div><p className="eyebrow">YOUR NEXT CHAPTER</p><h1>Welcome, {account?.profile.display_name.split(' ')[0]||'learner'}.</h1><p>Make a little room for learning today.</p></div><Button asChild><Link to="/courses">Explore courses <ArrowUpRight/></Link></Button></div>{account?.profile.educator_requested&&!account.roles.includes('educator')&&!account.roles.includes('admin')&&<div className="notice">Your educator application is awaiting approval. You can explore and enrol in courses while it is reviewed.</div>}<h2 className="text-2xl mb-6">My courses</h2>{enrolments.length?<div className="course-grid">{enrolments.map(e=>e.courses&&<CourseCard key={e.id} course={e.courses}/>)}</div>:<div className="empty-state"><BookOpen className="mx-auto mb-4"/><h2>Your first chapter awaits.</h2><p>Find a course that sparks your curiosity.</p><Button asChild><Link to="/courses">Find a course <ArrowUpRight/></Link></Button></div>}</DashboardLayout>}
