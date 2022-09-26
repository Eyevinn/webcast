# Simple Webcast

Browser application to broadcast yourself. 

- Press Broadcast
- Copy and share link to webcast
- Watch webcast

Includes both a frontend application and backend server. Based on the libraries [@eyevinn/whip-web-client](https://www.npmjs.com/package/@eyevinn/whip-web-client) and [@eyevinn/whip-endpoint](https://www.npmjs.com/package/@eyevinn/whip-endpoint).

## Development

Install dependencies

```
npm install
```

To run locally:

- Start backend: `npm start`
- Start frontend in dev mode: `npm run dev`

Then point your browser to http://localhost:1234

To run towards production backend, start frontend with the following environment variables set:
- `NODE_ENV=production`
- `WHIP_ENDPOINT_URL=<whip-endpoint-url>`
- `BC_ICE_SERVERS=turn:eyevinn:SECRET@turn.eyevinn.technology:3478`
- `API_KEY=<api-key>`

## Custom TURN server

To specify TURN server set the environment variable `ICE_SERVERS=<turn1>,<turn2>` where `<turn1>` is on the format `turn:<username>:<credential>@<turnserver>:<port>` when starting the frontend and backend. For example: 

```
ICE_SERVERS=turn:eyevinn:<secret>@turn.eyevinn.technology:3478 npm start
```

## Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

## About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
