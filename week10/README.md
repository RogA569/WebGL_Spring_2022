My scene will have the user drag their mouse across their screen (click, hold, and move the mouse in any direction). When they do that, it will create cookies (3D models).
![Sketch showing how cookies are produced by user mousedragging, and ending once the mouse drag stops. Cookies are highlighted in orange, mouse drag in green, mouse in blue.](./assets/IMG_1385.jpg)

The cookies interact with each other via attraction. As soon as two cookies are created, they begin to attract towards each other. Once they have become one (i.e. the second cookie completely overlapping the first), the cookie (second one; first one is removed from scene) doubles in size.
![Sketch showing how the cookies attract towards one another. The order of cookie attraction is inversely related to their order of creation. After attraction, the scale of the remaining cookie is 4 times bigger than it originally was.](./assets/IMG_1386.jpg)

In-Process Documentation:
Creating cookies with 'dragstart'/'dragend' event listeners is proving to be quite difficult. At this rate, I may have to find a different way to create the cookies. Perhaps by hitting the spacebar, the user can create new cookies at random points along a 3D dimensional threshold?

The mouse-dragging idea has also meant that I can't utilize orbit controls, which does take away some of the 3D experience out of my sketch (user can't neccessarily see that the cookies are 3D, for example). This leads me more towards moving on to the spacebar idea.

I found a [nice resource](https://www.youtube.com/watch?v=OAcXnzRNiCY) by The Coding Train that should definitely help me with implementing attraction forces for the cookies! I will make sure to give credit in my code where appropriate.

So my final product has strayed away more from my original idea. However, I feel like this was a happy accident and therefore believe in this new direction, The way to interact with this particular program is as follows...

User can create a cookie by pressing the spacebar. They can decide how large this cookie is by adjusting the scale property in the webpage's GUI. They can also adjust the gravitional constant in the GUI (higher value --> more acceleration in the cookies' orbits). 