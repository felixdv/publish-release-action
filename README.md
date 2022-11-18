# Publish release to Slack action

This action posts a release / deploy message to a Slack channel.

## Inputs

### `url`

**Required** The Slack webhook URL.

### `text`

Any additional text you want to add to the release message.

## Outputs

### `request`

The JSON request payload that was posted to Slack.

### `response`

Content included in Slack's reponse.

## Example usage

```yaml
uses: felixdv/publish-release-action@v1.1
with:
  url: 'https://hooks.slack.com/services/{rest of webhook URL}'
  text: 'Production release {{ env.GITHUB_REF_NAME }} for MyGreatApp'
```
