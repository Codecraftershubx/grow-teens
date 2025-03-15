import { NextAuthUserSession } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboard from "./_components/Dashboard";

const AdminDashboard = async () => {
  const data: NextAuthUserSession | null = await getServerSession(authOptions);

  console.log("Data ", data);
  return (
    <div className="p-8">
        <Dashboard />
    </div>
  );
};

export default AdminDashboard;
