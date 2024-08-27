import React from "react";
import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { Layout } from "antd";
import AdminContent from "@/components/layout/admin.content";


const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout>
      <AdminSideBar />
      <Layout>
        <AdminHeader />
          <AdminContent>
            {children}
          </AdminContent>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};
export default AdminLayout