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
 - Add unique serial no for paryicapant - track last record sl, If that is 15 start from 1
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
 - Make some public routes to show score and detail
 - ✅ Add some sub document for participant - point, point deferential
 - ✅ In net create 4 performance(player performance) and in performance add point deferential, and many more. Performance need to have key round 1 to 15
 - ✅ After the foud round instead of creating a new net, we should update the existing net or performance
 - Set default value of performance (point and point deferential)

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
 - 5 round with 3 game for each round in total 15 games
 - Add some filed for participant - payment amount, paid method (cash, check ), venmo slash (*confused*), (city, firstname, lastname) required



 ##### Problem
  - Component did update - login automitically and get a user
  - there are some problem with round - front-end


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



__https://github.com/woodburydev/TypescriptPassportwReact/blob/main/backend/src/index.ts__
__https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method__






