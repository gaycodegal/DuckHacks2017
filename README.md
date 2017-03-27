# DuckHacks 2017 (Thrive)
Steph Oro, Izzy Joyce, John Cheng/Wang, Jade Laceste, Sarah Dollard

## Won one of the five categories at DuckHacks 2017!

Capabilities
+ Tracks time you spend on active tabs.
+ Categorizes time spent by site.
+ Displays analytical graphs in popup.
+ Clear saved data.
+ Set email preferences.
+ Integrated emailing via PHP.
    - Disabled for liability protection of the authors.

Extras
+ Flask server that can send texts via Twillio.
    - Developed by Jade and Sarah.
    - Disabled for liability protection of the authors.
		
## Post Mortem

For this competition, we followed the agile development model. Jade and Sarah pair programmed together for the hackathon, as did Izzy and John for a second team. Steph Oro was the agile coach, providing help to the two pairs, and helping the pairs learn Python and JavaScript respectively, as well as coding the app shell and analysis algorithm.

At the time of this hackathon, Izzy and John were freshmen computer science majors in the honors track, Jade was a sophomore computer engineer, Sarah was a sophomore mechanical engineering major, and Steph was a sophomore computer science major and a TA for CS 115.

For the skill level of the team, this project was a great success, especially for winning one of five DuckHacks 2017 categories. The team did experience time restrictions due to large homework loads that needed doing in the course of the hackathon, but despite this setback, much was accomplished, and the project was successful.

### Challenges

It's not as easy as one would think to track exactly what url a user is viewing actively, and this was the main challenge that we faced during development. Essentially, a Chrome extension may only access a tab's identifier when it becomes active, and can only recieve URLs loaded asynchronously by another method.

In order to solve this problem, we first started by gathering data in a format we could work with. We saved all of the pages that became active in a queue timestamped by when they were added. Simultaneously, we also saved URL changes to a series of queues - one per browser tab. In this method, we were able to collect the data we would need to analyze, but the anlysis algorithm would present further challenges.

For the analysis algorithm, we attempted multiple solutions, eventually settling on a multiple pass solution. For our first failed attempt, we tried to handle everything at once, keeping a hash mapping of tab ID to current url, a second hash map of time spent on each url, and a final map of pointers into a url queue to save time spent searching. This method was both inefficient and the code was far too complex to be understandable. Thus, we decided to move on and attempt other solutions.

You can find a more complete list of attempted solutions in the project's history, or in the code commented out in steph.js. However the final solution we settled on required multiple passes and solved our problem with simplicity and efficiency.

This solution was to first pass over the activity queue and determine the length of time spent on each tab active (saving a start, end, and length field). We pushed this data into N many queues in a hash map keyed by tab IDs. Additionally, we also passed over the already existing N many URL queues and annotated these with start, end, and length fields.

With this preprocessing, it became much simpler to implement our analysis algorithm - we now had 2 sets of N many queues, both keyed by tab ID. Thus, we simply took an approach much like the 'merge' section one might find in an implementation of the mergesort algorithm to walk over the queue pair for each tab ID and sum the times spent separated by url.

### Skills Learned

The main learning we took from this setback and eventual success was that while any given approach one might come up with for solving a complicated process might work, it is wise to recognize that overly complicated algorithms might be made simpler by a series of preprocessing steps to coerce data into the format that you feel best suits the algorithm, especially in an environment where coding time is limited. 

Additionally, Izzy and John learned JavaScript, the d3.js framework, and how to make a chrome extension. Sarah and Jade learned Python's Flask and Twillio libraries. Steph learned more about successfully managing teams and succesfully navigating project obstacles, as well as continuing to expand her knowledge of chrome extension development (and did some networking).

## Installation

To install, after downloading, go to chrome://extensions 
1) Enable Developer mode by ticking the checkbox.
2) Click Load unpacked extension...
3) Navigate to the Thrive folder.
4) Select the folder.
5) DuckHacks2017 (Thrive) is now ready for your use and will
function on any sites loaded after the extension has
been installed.

## Removal

To uninstall, go to chrome://extensions
1) Navigate to DuckHacks2017 (Thrive).
2) Either uncheck Enabled or click the trash icon
and click remove.

This app will track your time, and if you visit the options page, you can mark sites you visit as Useful, Neutral, or Distracting. I've disabled emailing capabilities, but included our php script for emailing, and Flask app for texting. 

You may need to configure your site for cross origin access. For php, you'd want to put:

    allow from all

In a `.htaccess` file in the same folder as the emailing script - although you might want to include some more security features into both the Flask app and php/htaccess.

## Legal

This project may be launched on the chrome app store after polishing, but it is also available in source format under the MIT License see [LEGAL.md](./LEGAL.md) for details.
