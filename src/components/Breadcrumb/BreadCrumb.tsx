import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const BreadCrumb: React.FC = () => {
    const [breadcrumbItem, setBreadcrumbItem] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        setBreadcrumbItem(location.pathname.replace('/', ''));
    }, [location]);

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <Link to="/profile">Home</Link>
            </Breadcrumb.Item>
            {breadcrumbItem !== 'profile' && <Breadcrumb.Item>{breadcrumbItem}</Breadcrumb.Item>}
        </Breadcrumb>
    );
};

export default BreadCrumb;
