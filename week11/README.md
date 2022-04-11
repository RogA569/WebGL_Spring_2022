For this assignment, I am adapting my Interaction (Week 10) assignment to make it communicate with the embedded LED on my Arduino Uno.

Firstly, I have to fix the issues from Week 10's assignment. The attraction physics was wonky, but with some tuning, I was able to make the cookie models (excluding the attractive cookie, up to two more models) attract themselves towards a very attractive singular cookie model. The effect of attraction is same for all of the attracted cookies, which speaks to the attractiveness of the singular cookie. 

I wanted the user to generate a randomly positioned cookie (or the first cookie, which is always positioned in the center), via a button press (Arduino input). I also wanted to implement a potentionmeter (another Arduino input) to control the scale of the next generated cookie or the gravitional constant used in the application. 

Since I wasn't able to receive these materials by the previously anticipated date (Thursday, April 7), I will instead use the embedded LED on my Arduino Uno. I understand that it doesn't "really" qualify as an interface for controlling my sketch. However, I proceeding with this unsatisfactory implementation as a means of submitting an assignment of some kind, and at least show that I understand the IPC process between my code and my Arduino.

Embedded LED use will involve:
- LED blinks whenever attracted cookies reach their collective maximum velocity magnitude (7)