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

Skills learned:

Izzy and John learned JavaScript, the d3.js framework, and how to make a chrome extension. Sarah and Jade learned Python's Flask and Twillio libraries. Steph learned more about successfully managing teams and succesfully navigating project obstacles (and did some networking).

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

THIS PROJECT, LIKE ALL MY OTHER PROJECTS HAS NO WARRENTY STATED OR IMPLIED. FOR THE PURPOSES OF LIABILITY THIS IS A COPYRIGHTED WORK AND YOU'RE NOT ALLOWED TO USE IT IN ANY FORM UNLESS THE LAW SAYS YOU CAN. IF YOU'RE LEGALLY ALLOWED TO USE IT THE AUTHORS ARE NOT TO BE HELD RESPONSIBLE FOR WHAT HAPPENS.

## Side Note

I won't sue anyone using this, I'm just telling you that you can't use it for the saftey of the authors.
