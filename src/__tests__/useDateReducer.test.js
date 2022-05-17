import { describe } from "vitest";
import { act, renderHook } from '@testing-library/react';
import { useDateReducer } from "../useDateReducer";
import { isSameDay, subDays, addDays, nextWednesday } from 'date-fns';

describe('useDateReducer', () => {
    it('correctly defaults date to today', () => {
        const {result} = renderHook(() => useDateReducer());
        const areSame = isSameDay(result.current.date, new Date());
        expect(areSame).toBe(true);
    });

    // Flaky: depends on setDate
    it('correctly increments date', () => {
        const {result} = renderHook(() => useDateReducer());
        act(() => result.current.setDate(new Date('1996-02-05')))
        const nextDay = addDays(result.current.date, 1);
        act(() => result.current.incrementDate())
        expect(isSameDay(nextDay, result.current.date)).toBeTruthy()
    });

    it('correctly decrements date', () => {
        const {result} = renderHook(() => useDateReducer());
        const prevDay = subDays(result.current.date, 1);
        act(() => result.current.decrementDate())
        expect(result.current.date).toEqual(prevDay)
    });

    it('correctly sets custom date', () => {
        const {result} = renderHook(() => useDateReducer());
        const expectedDate = new Date('1996-02-05');
        expect(isSameDay(result.current.date, new Date())).toBeTruthy();
        act(() => result.current.setDate(new Date('1996-02-05')))
        expect(isSameDay(expectedDate, result.current.date)).toBeTruthy()
    });
    
    // Flaky: depends on setDate
    it('correctly resets date', () => {
        const {result} = renderHook(() => useDateReducer());
        act(() => result.current.setDate(new Date('1996-02-05')))
        act(() => result.current.resetDate())
        expect(isSameDay(result.current.date, new Date())).toBeTruthy();
    });
    
    // Flaky, depends on setDate
    it(`doesn't decrement date if current is 1995-06-20`, () => {
        const {result} = renderHook(() => useDateReducer());
        act(() => result.current.setDate(new Date('1995-06-20')));
        const date = result.current.date
        act(() => result.current.decrementDate())
        expect(isSameDay(date, result.current.date))
    })

    it(`doesnt't increment date if current is today`, () => {
        const {result} = renderHook(() => useDateReducer());
        act(() => result.current.incrementDate());
        expect(isSameDay(result.current.date, new Date())).toBeTruthy()
    })
})
