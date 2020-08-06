
##About

Get to it: http://nfc-tracker.herokuapp.com/

## Todo:
1. Sync / make separate mouse trackers for the visualizations so they don't leave off after each other (i.e. if you spin another graph and come back to the graph you were spinning, it will jump to a different viewing angle)
2. Sleep Integration + Visualization 
3. Weight Data Integration
4. NFC-tracking DB calls + Visualization
5. Daily Rescue Time Visualization
6. Rename viz scripts.ejs



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
###Key to organization

