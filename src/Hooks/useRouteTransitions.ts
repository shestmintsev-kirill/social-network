import { useLocation } from 'react-router-dom';
import { useTransition } from 'react-spring';

export const useRouteTransitions = () => {
    const location = useLocation();
    return useTransition(location, {
        keys: (location) => location.pathname,
        from: { display: 'none', transform: 'scale(0.9)', opacity: 0 },
        enter: { display: 'block', transform: 'scale(1)', opacity: 1 },
        leave: { display: 'none' }
    });
};
