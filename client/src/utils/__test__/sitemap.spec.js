import { getPathByKey, PATHS } from '../sitemap';

describe('Sitemap Utils', () => {
    describe('getPathByKey', () => {
        it('returns False if key does not exist in the sitemap', () => {
            expect(getPathByKey('Test')).toBe(false);
        });

        it('returns path with params', () => {
            expect(getPathByKey(PATHS.EditAlbum, { id: '99' })).toBe('/albums/edit/99');
        });

        it('retuns path without params if no params were passed or they do not exist in the path', () => {
            expect(getPathByKey(PATHS.EditAlbum, { hello: 'world' })).toBe('/albums/edit/:id');
            expect(getPathByKey(PATHS.Home)).toBe('/');
        });
    });
});