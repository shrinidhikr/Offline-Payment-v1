# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'AC2dc63a35a0295ccfd0e0e301f6b251ff'
auth_token = '610b3e201e46e4580c7f08f33683c42a'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Join Earth's mightiest heroes. Like Kevin Bacon.",
                     from_='+12409497910',
                     to='+919620220642'
                 )

print(message.sid)

