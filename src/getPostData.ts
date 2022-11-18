type SlackRequest = {
    text: string;
};

export function getPostData(text: string, repository: string): SlackRequest {
    return {
        text: `Release from github action: ${text}\nRepository: ${repository}`,
    };
}
