# CHAT-APP

This is a real-time chat application that allows users to communicate with each other in different chat rooms. It's built using React on the client side and Node.js with Express on the server side. The real-time functionality is powered by Socket.IO.

## Features

- **Real-time chat functionality:** Users can send and receive messages in real-time.
- **Room creation and deletion:** Users can create and delete chat rooms.
- **Typing indicators:** Shows when another user is typing.

## Tech Stack

**Client:** React, Socket.io-client, js-cookies, Material UI

**Server:** Node, Express, Socket.io, Mongoose, js-cookies

## Run Locally

### Clone the project

```bash
  git clone https://github.com/runtyalien/CHAT-APP

Install dependencies
For server
  cd server
  npm install

For client
  cd client
  npm install

Start the server
  cd server
  npm run start

Start the client
  cd client
  npm run start

API Reference
Socket Events
send-message
Emits a message to a specific room or to all connected sockets.

typing-started
Emits an event when a user starts typing.

typing-stopped
Emits an event when a user stops typing.

join-room
Joins a room with a given ID.

new-room-created
Creates a new room and emits an event.

room-removed
Removes a room with a given ID and emits an event.