import { removeArrayItem } from "../array";

describe('Array Utils', () => {
    describe('removeArrayItem', () => {
        it('returns an array when removed item if item exists', () => {
            expect(removeArrayItem([1, 2, 3], 2)).toEqual([1, 3]);
        });

        it('returns an array without removing item if it does not exist', () => {
            expect(removeArrayItem([1, 2, 3], 4)).toEqual([1, 2, 3]);
        });
    });
});
