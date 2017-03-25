# DuckHacks 2017 App

To install, go to chrome://extensions 
1) Enable Developer mode by ticking the checkbox.
2) Click Load unpacked extension...
3) Navigate to the OnlyOnce2 folder
4) Select the folder.
5) Only Once 2.0 is now ready for your use and will
function on any sites loaded after the extension has
been installed.

To uninstall, go to chrome://extensions
1) Navigate to OnlyOnce2
2) Either uncheck Enabled or click the trash icon
and click remove.

The behaviour of Only Once can be modified by running
console commands on the website you would like to make
allowances for. The following are the commands patterns
allowed (code is indented):

Okay, so if you want to give a site the ability
to use as many alerts as needed, use:

    localStorage.setItem("onlyoncemessage", "Infinity");


If you want to enable a site to use x number of
alerts (across all site uses) use:

    localStorage.setItem("onlyoncemessage", "1337");
		
Replacing 1337 with your desired number.

If you would like the alert use to reset every site
visit, use:

    localStorage.setItem("onlyoncenotstatic", "true");
    localStorage.setItem("onlyoncemessage", "1337");

Replacing 1337 with your desired number.

To turn any site back to normal of 1 alert and you're
done, use:

    localStorage.setItem("onlyoncenotstatic", "false");
    localStorage.setItem("onlyoncemessage", "1");
	