'use client'

import { Layout, theme } from "antd";
const AdminHeader = () =>{
  const {
    token: { colorBgContainer},
  } = theme.useToken();  
   const { Header} = Layout;
  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }} />
    </>
  );
}

export default AdminHeader