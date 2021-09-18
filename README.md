# Spikeball Events

Emojies - 📜 ⛏️ ➖ ✅

### Hosting
 - __http://18.216.248.251/home__


### Planning

##### Make models
 - ✅ Events
 - ✅ Participants
 - ✅ Nets
 - ✅ Rounds
 - ✅ Add unique serial no for paryicapant - track last record sl, If that is 15 start from 1
 - ✅ Upload players
 - ✅ Csv to json
 - ✅ Json file key and value validation
 - ✅ And save json object to mongodb
 - ✅ Create event front end
 - ✅ Modify add participant and show participant - Add more fields for adding a participant
 - ✅ Delete event and delete all participant of that event - Delete event frontend
 - ✅ Delete participant 
 - ✅ Add participant with files
 - ✅ when participant is been deleted delete that from events participants
 - ✅ Assign players to net randomly
 - ✅ Start round one to four 
 - ✅ Make some public routes to show score and detail
 - ✅ Add some sub document for participant - point, point deferential
 - ✅ In net create 4 performance(player performance) and in performance add point deferential, and many more. Performance need to have key round 1 to 15
 - ✅ After the foud round instead of creating a new net, we should update the existing net or performance

##### Round 5 to 8
 - Validate net 1 to 4, atlest 2 player need to have point for each round and all 4 round need to be done
 - Once passes all validation - create 4 more net for round 5 to 8 with all existing performance (performance need to rearrange by point)
 - do the same process for round 5 to 8
 - Rank player(performance) by point and point deferential
 - Assign the net for round 5 - rank 1 to 4 player in net 1, rank 5 to 8 in net 2 --- so on.
 - Validation - if there is point must have point deferential, two player mush have point for every round, if all round round is completed then go on
 - Make a scoring board
 - SHOULD MAKE A CURRENT ROUND AND SAVE IT TO THE DATABASE 


### Change requirements
 - ✅ Add ranking section in admin as well
 - When someone submit redirect to next round - all player will be listed initially 
 - ✅ Add participant informations - and reassign again - 
 - ✅ 5 round with 3 game for each round in total 15 games
 - ✅ Add some filed for participant - payment amount, paid method (cash, check ), venmo slash (*confused*), (city, firstname, lastname) required
 - ✅ Assign and Reassign participant button
 - ✅  Create only one route for assign and one route for reassign
 - ✅ Create only one round instead of all five round


### New requirements
 - Show the players before by ranking. total point, average point deferential
 - two in one team another two with another team
 - For every game they will change team mate
 - Every game with different partner (participant, point, point diferential)
 - Awarding point ()
 - Negative point will have red color, positive point will have green color
 - Change reassign to rank assign, random assign
 - On Right side Player name, point, point differential
 - After every game col will be like name, point, point diffrential
 - Timmate need to change on every game
 - Set default value for point and point differential from front-end,  so we can check how many games they played - if one player get 1 point oponent player will get 0 by default
 - Average point and point differential for player in rounds tab
 - Create some public table to show who is playing againest who and who get point



 ##### Problem
  - Component did update - login automitically and get a user
  - there are some problem with round - front-end
  - Problem with left performance
  - Problem with initial random assign from 2,3,4,5 round


### CSV Parser
 - __https://www.npmjs.com/package/csv-parser__
 - __https://www.npmjs.com/package/csvtojson__
 - __https://www.npmjs.com/package/fast-csv__
 - __https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/__


### Mongoose
 - __https://developpaper.com/question/how-to-set-auto-increment-field-in-mongoose/__
 - __https://stackoverflow.com/questions/28357965/mongoose-auto-increment/68815559#68815559__
 - __https://kipalog.com/posts/Mongoose-One-to-Many-Relationship-Example__ - One to many relationship


### File uplad
 - __https://www.geeksforgeeks.org/file-uploading-in-react-js/__
 - __https://www.laravelcode.com/post/how-to-upload-files-in-reactjs-with-example__

### Use Effect - Fetch Abort signal
 - __https://dmitripavlutin.com/react-cleanup-async-effects/__
 - __https://jsfiddle.net/Shayon/17zcubr4/265/__
 - __https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal__



__https://github.com/woodburydev/TypescriptPassportwReact/blob/main/backend/src/index.ts__
__https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method__


### Docker
 - [Tutorials](https://www.youtube.com/watch?v=DftsReyhz2Q&t=1319s)  - 22m
 - __https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker__
 - __https://github.com/MdSamsuzzohaShayon/Web-Linux-Essential-Docs/tree/2_web_hosting/Docker__
 - [Install docker](https://docs.docker.com/engine/install/ubuntu/)
 - [Make nodejs app with docker](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/)
 - [Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
 - [Making dockerfile](https://docs.docker.com/engine/reference/builder/)
 - [.dockerignore](https://docs.docker.com/engine/reference/builder/)
 - Commands for server 
  ```
  cd server
  sudo make build
  ```
 - make all those files inside client as well and run Similer command for client
  ```
  sudo make build
  ```
 - [Docker compose](https://docs.docker.com/compose/)
 - If made any change run those build once again
 - create docker-compose and makefile in root and run the command `sudo make run-dev`







### Errors
 - SyntaxError: Unexpected token < in JSON at position 0
    at JSON.parse (<anonymous>)
    at n.<anonymous> (Home.jsx:31)





 -  <tbody>
  380 |     {performances && performances.map((p, i) => (<tr key={i} >
> 381 |         <td>{p.participant.firstname + " " + p.participant.lastname}</td>
^  382 |         <td>{i + 1}</td>
  383 |         <td>{getTotalPointOfARound(p, props.roundNum)}</td>
  384 |         <td>{getTotalPointDifferentialOfARound(p, props.roundNum)}</td>
 - *Solution* When we create participant we also need to create performance by default

 - Point diffrential NaN value error handle
 - have some problem with input value - need to set previous value




# After updating this first thing need to learn is deploy MERN
