import { Context } from '@actions/github/lib/context';
import { getPostData } from '../src/getPostData';

describe('getPostData tests', () => {
    it('formats the post data properly', async () => {
        const context = {
            repo: {
                repo: 'foo-bar-api',
                owner: 'johndoe',
            },
            serverUrl: 'https://github.com',
            job: 'deploy',
            ref: 'refs/heads/develop',
            sha: 'c97be9ffd5dbdd1c4e59e4e2945a3701475af543',
        } as Context;
        const data = getPostData(context, {
            text: 'v1.2 - New tags system',
            stage: 'production',
        });

        const title = 'Release for <https://github.com/johndoe/foo-bar-api|johndoe/foo-bar-api> [production]: v1.2 - New tags system';
        expect(data).toEqual({
            attachments: [
                {
                    color: '#36a64f',
                    fallback: title,
                    pretext: title,
                    fields: [
                        {
                            title: 'Job',
                            value: 'deploy',
                            short: true,
                        },
                        {
                            title: 'Github Ref',
                            value: 'refs/heads/develop',
                            short: true,
                        },
                        {
                            title: 'SHA',
                            value: 'c97be9ffd5dbdd1c4e59e4e2945a3701475af543',
                            short: false,
                        },
                    ],
                },
            ],
        });
    });
});
