import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { accountQuery } from '@/lib/queries';
export function DashboardLayout({children}:{children:ReactNode}){const {data}=useQuery(accountQuery);return <div className="dashboard-shell"><aside className="dashboard-sidebar"><p className="eyebrow">YOUR AQOON</p><Link to="/dashboard" activeProps={{className:'selected'}}><BookOpen/> My learning</Link>{(data?.roles.includes('educator')||data?.roles.includes('admin'))&&<Link to="/educator" activeProps={{className:'selected'}}><GraduationCap/> Educator studio</Link>}{data?.roles.includes('admin')&&<Link to="/admin" activeProps={{className:'selected'}}><ShieldCheck/> Administration</Link>}<div className="sidebar-community"><span className="status-dot"/>{data?.profile.camp} community</div></aside><main className="dashboard-content">{children}</main></div>}
