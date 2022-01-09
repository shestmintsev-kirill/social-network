import 'antd/dist/antd.css';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Users from './components/Users/Users';
import { initializeApp } from './redux/app-reducer';
import { AppStateType } from './redux/redux-store';
import { Layout, Skeleton } from 'antd';
import Navbar from './components/Navbar/Navbar';
import BreadCrumb from './components/Breadcrumb/BreadCrumb';

const { Content, Footer } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

const App: React.FC = () => {
    const initialized = useSelector((state: AppStateType) => state.app.initialized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    if (!initialized) {
        return <Preloader />;
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Header />
            <Content style={{ height: '100%' }}>
                <Layout className="site-layout-background" style={{ minHeight: '100%' }}>
                    <Navbar />
                    <Content style={{ padding: '0 24px', minHeight: '100%' }}>
                        <BreadCrumb />
                        <Suspense fallback={<Skeleton active paragraph={{ rows: 6 }} />}>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect from="/" to="/profile" />
                                </Route>
                                <Route path="/dialogs">
                                    <DialogsContainer />
                                </Route>
                                <Route path="/profile/:userId?">
                                    <Profile />
                                </Route>
                                <Route path="/developers">
                                    <Users />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/chat">
                                    <ChatPage />
                                </Route>
                                <Route path="*">
                                    <ErrorPage />
                                </Route>
                            </Switch>
                        </Suspense>
                        <Footer style={{ textAlign: 'center' }}>Sosial network 2022</Footer>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default App;
