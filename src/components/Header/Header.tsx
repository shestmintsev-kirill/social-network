import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Menu, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

const Header: React.FC = () => {
    const { Header } = Layout;

    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const login = useSelector((state: AppStateType) => state.auth.login);

    const getLogout = async () => {
        await dispatch(logout());
        history.push('/login');
    };

    return (
        <Header>
            <div className="logo" />
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/developers">Developers</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                {isAuth ? (
                    <>
                        <Col span={1} title={login || ''}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Col>
                        <Col span={5}>
                            <Button onClick={getLogout}>Log out</Button>
                        </Col>
                    </>
                ) : (
                    <Col span={6}>
                        <Button>
                            <Link to="/login">Login</Link>
                        </Button>
                    </Col>
                )}
            </Row>
        </Header>
    );
};

export default Header;
