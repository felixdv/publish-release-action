import { getPostData } from '../src/getPostData';

describe('getPostData tests', () => {
    it('formats the post data properly', async () => {
        const data = getPostData('foo', 'bar');
        expect(data).toEqual({
            text: `Release from github action: foo\nRepository: bar`,
        });
    });
});
