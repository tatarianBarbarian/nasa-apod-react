import { addDays, isSameDay, subDays } from "date-fns";
import { describe, expect, it } from "vitest";
import { formatDate, getPrevDate, getNextDate } from '../date';


describe('formatDate', () => {
    it('formats date to expected format', () => {
        const expected = '2020-05-02';
        const date = new Date(expected);
        const formatted = formatDate(date);

        expect(formatted).toBe(expected);
    });
});

describe('getPrevDate', () => {
    it('decrements date', () => {
        const start = new Date('2020-05-02');
        const expected = subDays(start, 1);
        const result = getPrevDate(start);

        expect(result).toEqual(expected);
    })

    it(`decrements date only if date is after 1995-06-20`, () => {
        const start = new Date('1995-06-20');
        const result = getPrevDate(start);

        expect(isSameDay(start, result)).toBeTruthy();
    })
})

describe('getNextDate', () => {
    it('increments date', () => {
        const start = new Date('2020-05-02');
        const expected = addDays(start, 1);
        const result = getNextDate(start);

        expect(result).toEqual(expected)
    })

    it(`should not increment date if it is today`, () => {
        const start = new Date();
        const result = getNextDate(start);

        expect(isSameDay(start, result)).toBeTruthy();
    })
})
