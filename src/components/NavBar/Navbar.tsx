import { Link } from 'react-router-dom';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Sider } = Layout;

export const Navbar: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            breakpoint="md"
            style={{ minHeight: '100%' }}
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                    <Menu.Item key="1">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/dialogs">Messages</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/chat">Chat</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                    <Menu.Item key="5">
                        <Link to="/developers">Developers</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};
