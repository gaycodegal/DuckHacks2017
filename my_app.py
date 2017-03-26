

import flask
from twilio.rest import TwilioRestClient
from flask import request

app = flask.Flask(__name__)

@app.route('/example')
def example():

    account_sid = "YOURSIDHERE" # Account SID 
    auth_token  = "YOURTOKENHERE"  # Auth Token 


    message = flask.request.args.get("message")
    number = flask.request.args.get("number")
    if(message == None):
        message = "No message"
    if(number == None):
        number = "not a number"

    client = TwilioRestClient(account_sid, auth_token)

    message_1 = client.messages.create(body=message,
    to= number,    # Receiving phone number
    from_="+YOURPHONEHERE") # Sending phone number

    print(message_1.sid)
    return "you asked us to send: '" + message + "' to " + number

