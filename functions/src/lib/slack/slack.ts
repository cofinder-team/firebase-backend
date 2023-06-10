import * as functions from 'firebase-functions';
import request from 'request';

const config = functions.config();
const slackUrl = config.slack.url;

export const sendEmailCollect = (email: string) => {
  request.post({
    url: slackUrl,
    body: {
      channel: '#9-3-webhook',
      username: 'webhookbot',
      text: `New Email Submission: ${email}`,
    },
    json: true,
  });
};
