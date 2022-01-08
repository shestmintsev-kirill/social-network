import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary">
                        <Link to={'/profile'}>Back to home</Link>
                    </Button>
                }
            />
        </>
    );
};

export default ErrorPage;
