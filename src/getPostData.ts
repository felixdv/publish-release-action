import { Context } from '@actions/github/lib/context';

type InputOptType = 'text' | 'stage';
type InputOpts = {
    [k in InputOptType]: string | undefined;
};

export function getPostData(context: Context, input: InputOpts): any {
    const repository = `${context.repo.owner}/${context.repo.repo}`;
    const repositoryLink = `<${context.serverUrl}/${repository}|${repository}>`;
    const commitLink = `${context.serverUrl}/${repository}/commit/${context.sha}`;
    const title = `Release for ${repositoryLink} [${input.stage}]: ${input.text}`;
    return {
        attachments: [
            {
                fallback: title,
                pretext: title,
                color: '#36a64f',
                fields: [
                    {
                        title: 'Job',
                        value: context.job,
                        short: true,
                    },
                    {
                        title: 'Github Ref',
                        value: context.ref,
                        short: true,
                    },
                    {
                        title: 'SHA',
                        value: `<${commitLink}|${context.sha.substr(0, 8)}>`,
                        short: false,
                    },
                ],
            },
        ],
    };
}
