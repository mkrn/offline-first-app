# Offline-first Data Management App Example

## Scope of exercise

The goal of this exercise is to evaluate how well you can design a synchronization solution between a server and a client.

Requirements: 
 •	Develop an endpoint `/user/:id` that get and edit the user profile (Name, Email, Avatar) 
 •	We will need a frontend interface to display and edit the user profile
 •	On the frontend, we need to be able to display and edit the user profile offline.
 •	We need to be able to have the user profile synchronized between the frontend and the backend when we or online

Technology:
 •	Frontend: Angular or React
 •	Backend: NodeJs or GoLang

Feel free to use the UI and design you want.
Testing is not required by it is a plus.


### Requirements 
- Display and edit the user profile offline
- Synchronize user profile between the frontend and the backend when we go online


## Solution

### Launch locally
```
yarn 
yarn workspace backend-nodejs test
yarn workspace backend-nodejs start
yarn workspace frontend start 
```

### Online preview

[Demo](https://offline-first-app.netlify.com/)
[API](https://mkrn-offline-first-app-1.glitch.me)



## Offline-first considerations

### Data Persistence
Existing users data should be cached, so we can browse it offline. Redux store with redux-persist is used as a solution (handled by redux-offline).

### Progressive Web App
React app should be cached to the device so it's accessible offline (This functionality comes out of the box with create-react-app).

### Optimistic updates
We should see our updates applied optimistically regardless of server reachability.

### Queue updates
When we go online, all the updates should be queued in order and sent to the server. New data should be fetched and merged.

### Retry handling
We should retry failed operations if we were offline, or server was inaccesible. When server returns an error, we need to show it to the user and not retry the operation.

### UUIDs
We should avoid using auto-increment on ids since this can cause conflicts with items inserted while offline. Instead, we should generate item's ids on client-side in UUID format. 

### Prevent overwriting someone else's updates (versioning)
If someone else has updated an item we have updated offline, our change should be rejected, and error message shown. We will use an additional field "version" to ensure we're not overwriting someone else's changes.

## Technologies used

- Yarn workspaces
- Express server
- SQLite
- Jest and supertest
- Typescript 
- React w/ React hooks
- React-router-dom
- Redux
- Redux-offline
- Blueprint.js

## Possible Improvements

- Show sync status as an icon against records 
- Periodically fetch all users
- Use webSockets to push data updates to clients 
- Use GraphQL and Apollo library leveraging subscriptions, caching and offline
- Add form validation
- Use a different field to handle race conditions
- Use a different datastore to be able to leverage serverless hosting.
