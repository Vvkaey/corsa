import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
} 