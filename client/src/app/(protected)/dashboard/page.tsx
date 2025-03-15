import { NextAuthUserSession } from "@/types";
import { getServerSession } from "next-auth";
import Dashboard from "./_components/Dashboard";

const TeenDashboard = async () => {
  const data: NextAuthUserSession | null = await getServerSession();

  console.log("Data ", data);
  return (
    <div className="p-8">
        <Dashboard />
    </div>
  );
};

export default TeenDashboard;
