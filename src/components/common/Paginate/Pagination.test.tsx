import { create } from 'react-test-renderer';
import Pagination from './Pagination';

describe('Pagination component tests', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(<Pagination totalUsersCount={11} pageSize={1} portionSize={10} />);
        const root = component.root;
        const spans = root.findAllByType('div');
        const button = root.findAllByType('button');
        expect(spans.length).toBe(2);
        expect(button.length).toBe(2);
    });
});
