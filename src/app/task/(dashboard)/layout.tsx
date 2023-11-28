import { Toaster } from "sonner";
import Navbar from "./_components/Navbar";
import { ModalProvider } from "./providers/ModalProvider";
import { QueryProvider } from "./providers/QueryProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <QueryProvider>
        <Navbar />
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </div>
  );
};

export default DashboardLayout;
