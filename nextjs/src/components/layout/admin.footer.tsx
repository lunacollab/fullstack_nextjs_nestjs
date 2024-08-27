'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Gin ©{new Date().getFullYear()} Created by @Gin
            </Footer>
        </>
    )
}

export default AdminFooter;