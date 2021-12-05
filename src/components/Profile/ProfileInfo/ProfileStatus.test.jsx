import { create, act } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('after creation `input` should be not displayed', () => {
    const component = create(<ProfileStatus status='test status' />);
    const root = component.root;
    expect(() => {
      root.findByType('input')
    }).toThrow();
  })

  test('after creation `span` should be displayed', () => {
    const component = create(<ProfileStatus status='test status' />);
    const root = component.root;
    let span = root.findByType('span')
    expect(span).not.toBeNull()
  });

  test('status from props shold be in the state', () => {
    const component = create(<ProfileStatus status='test status' />);
    const root = component.root;
    expect(root.props.status).toBe('test status')
  });

  test('after creation `span` should contains correct status', () => {
    const component = create(<ProfileStatus status='test status' />);
    const root = component.root;
    let span = root.findByType('span')
    expect(span.props.children[1]).toBe('test status')
  });

  test('input should be displayed in EditMode instead of span', () => {
    const component = create(<ProfileStatus status='test status' />);
    const root = component.root;
    let span = root.findByType('span')
    act(() => {
      span.props.onDoubleClick()
    })
    let input = root.findByType('input')
    expect(input.props.value).toBe('test status')
  });

  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status='test status' updateStatus={mockCallback} />);
    const root = component.root;
    root.props.updateStatus()
    expect(mockCallback.mock.calls.length).toBe(1)
  });
})