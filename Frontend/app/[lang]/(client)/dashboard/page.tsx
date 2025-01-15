import { getJwtData } from '@/lib/get-jtw-data';
import { AdminDashboard } from '@/sceens/admin-dashboard/admin-dashboard';
import { DeanDashboard } from '@/sceens/dean-dashboard';
import { DepartmentWorkerDashboard } from '@/sceens/department-dashboard';
import { StudentDashboard } from '@/sceens/student-dashboard/student-dashboard';

const dashboards = {
  admin: AdminDashboard,
  student: StudentDashboard,
  dean: DeanDashboard,
  'department-worker': DepartmentWorkerDashboard
};

const Dashboard = async () => {
  const tokenData = await getJwtData();
  if (!tokenData) return null;
  const { role, userId } = tokenData;

  const Dashboard = dashboards[role as keyof typeof dashboards];

  return <Dashboard userId={userId} />;
};

export default Dashboard;
