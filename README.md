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

To run towards production backend:

Start frontend with the following environment variables set:
- `NODE_ENV=production`
- `WHIP_ENDPOINT_URL=<whip-endpoint>`


## About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!