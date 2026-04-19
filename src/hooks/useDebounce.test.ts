import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should return the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 500));
		expect(result.current).toBe('initial');
	});

	it('should update the value after the specified delay', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 500 } }
		);

		rerender({ value: 'updated', delay: 500 });
    
		// Value should not update immediately
		expect(result.current).toBe('initial');

		// Fast-forward 500ms
		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe('updated');
	});

	it('should cancel the previous timer if value changes quickly', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 500 } }
		);

		rerender({ value: 'updated1', delay: 500 });
    
		act(() => {
			jest.advanceTimersByTime(300);
		});
    
		// Timer hasn't finished, value should still be initial
		expect(result.current).toBe('initial');

		// Change value again before the first 500ms completes
		rerender({ value: 'updated2', delay: 500 });
    
		act(() => {
			jest.advanceTimersByTime(300);
		});

		// Still initial because the timer reset
		expect(result.current).toBe('initial');

		// Finally complete the second timer
		act(() => {
			jest.advanceTimersByTime(200);
		});

		expect(result.current).toBe('updated2');
	});
});