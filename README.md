# nfc-tracker getting started
$ git clone git https://github.com/james-salafatinos/nfc-tracker.git

#To Do:
1. Connect rescue time api 
    - will need to add to .env and heroku 

# Visualization Blogs used:
Donut Rescue Time Graph:
- https://www.d3-graph-gallery.com/graph/donut_label.html

#Can use to navigate public google sheets
range=: The rows and columns that are published to the web. For example, A1:B14.



# Habits
- Use Google sheets
- Exported from Habit Bull
    - Theres just no good app with a straight forward api and ease of use
- Setup:
    - Have the "Habits" google sheet as a button on the home screen (imitating an app)
    - Have a recorded macro on google apps script to add the csv rows every day
        - This is so I do not have to manually copy and paste (the goal is as easy data collection as possible)
    - On the google apps script/recorded macro, there is an option to set the trigger to run daily.
        - This essentially adds my habits, ready for me to click a checkbox if I did them, every day. 

<% include ../partials/test_polygons.ejs %>