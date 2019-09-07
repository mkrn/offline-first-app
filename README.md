# Offline-first Data Management App Example

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


## Offline-first data management solution

### Requirements 
- Display and edit the user profile offline
- Synchronize user profile between the frontend and the backend when we go online

## Offline-first considerations

### Data Persistence
Existing users data should be cached, so we can browse it offline.

### Progressive Web App
React app should be cached to the device so it's accessible offline.

### Optimistic response
We should see our changes applied regardless of server reachability.

### Queue updates
When we go online, all the updates should be queued in order and sent to server. New data should be fetched and merged.

### Using UUIDs
We should avoid using auto-incrementing ids, instead we should generate item's ids on client side in UUID format. 

### Prevent overwriting someone else's updates (versioning)
If someone else have updated an item we have updated offline, our change should be rejected, and error message shown. We will use an additional field "version" to ensure we're not overwriting someone else's changes.

## Solutions

- Redux
- Redux-offline
- Redux-persist
- Service workers


## Possible Improvements

- Show sync status as an icon against records 
- Use webSockets to push data updates to clients 
- Periodically poll users
- Form validation
- 