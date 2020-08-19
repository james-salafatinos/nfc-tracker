
##About

Get to it: http://nfc-tracker.herokuapp.com/



##Installation
1. Download all the files in this repo with `git clone https://github.com/james-salafatinos/nfc-tracker.git` on git bash
2. Make sure you have NodeJS installed: https://nodejs.org/en/
3. Run `npm install` inside the root folder to install the dependencies
    


## Todo:
1. Untangle Weight and Test Mesh: Sync / make separate mouse trackers for the visualizations so they don't leave off after each other (i.e. if you spin another graph and come back to the graph you were spinning, it will jump to a different viewing angle)
2. :white_check_mark: Sleep Integration + Visualization 
3. :white_check_mark: Weight Data Integration
4. NFC-tracking DB calls + Visualization
5. :white_check_mark:  Daily Rescue Time Visualization
6. :white_check_mark:  Rename viz scripts.ejs
7. :white_check_mark: Put in console.logs ("Habits Successfully retrieved...") etc
8. Use router.get() instead of app.get() for api, and separate concerns in separate file
9. :white_check_mark: Get Colors for Sleep Visualization
10. :white_check_mark: Create database table and migrate for users
11. :white_check_mark: Create a basic user flow so a user can sign up with URLS
12. Stop google from thinking the website needs translation from Portuguese
13. Fix the weird offset on the weight visualization causing the misalignment between date annotations and 3d rectangles
14. Generalize the graphical generators and create API for certain visual/grouping features


## Workstreams:
1. User sign up flow
2. Google Sheets app creation flow
3. Visualization customization
4. User API construction (all data hooked up accessible via API)
5. Site visual consistency







##Installation


##Features
- Multiple d3-3d js plots on one page

##Wiki

##Support


##License


##References 
### Visualization Blogs used:
Donut Rescue Time Graph:
- https://www.d3-graph-gallery.com/graph/donut_label.html


#### Habits


## Notes
### Challenges
- Use Google sheets
- Theres just no good habit, sleep tracker, simple data tracker apps with an API
- Setup:
    - Have the google sheet data tracker as a button on the home screen (imitating an app)
    - Have a recorded macro on google apps script to add the csv rows every day
        - This is so I do not have to manually copy and paste (the goal is as easy data collection as possible)
    - On the google apps script/recorded macro, there is an option to set the trigger to run daily.
        - This essentially adds my rows automatically for me to just tap checkboxes. Checkboxes can be encoded as 0 and 1 within google sheets. For example, with the macro, the app is lets me just click a click a checkbox if I did my habits, every day. 
- Pro organization move is having the visualizations in a separate folder and calling them in the index.js file
    - <% include ../partials/test_polygons.ejs %>
        *Note* This must be inside of an `<svg id = 'example_id'>` tag and the file goes like this: ` d3.select(##example_id).append('svg') `
### Distributable
- Distributed Public Short URLs
- Accounts
- 

Choice of:
- Data
- Colors
- Chart Types?

Headaches:
https://docs.google.com/spreadsheets/d/e/2PACX-1vTqgsxeKiU1_bjuRTQiG1nd7OwBJWX82Tt3yNGUHo2NznMiccxVEe0bJ13nilBW19HmPgVCrzyyOBnv/pub?output=csv
