# sei-group-project-3: RoadTrippers

## https://roadtrippers-ga-project.herokuapp.com/

## Overview

Working in a group this was our first time putting together a full stack app. We brainstormed and pooled our ideas, brainstorming aloud, picking out parts of ideas we liked until something was unintentionally born that everyone had contributed to. No one person thought of it yet we all have a share of it.
We then worked together to create a wireframe using balsamiq.com
Roadtrippers is a community based travel app specifically for road routes.
Working on both back anf front end of development, it was captivating to see how to bring both those ends together and I thoroughly enjoyed my first experience in full stack development.

----------------

## Brief

# Project Brief:
- Build a full-stack application** by making your own backend and your own front-end.
- Use an Express API** to serve your data from a Mongo database.
- Consume your API with a separate front-end** built with React.
- Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
-Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut.
-Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers.
- Be deployed online so it's publicly accessible.

--------------

## Technologies used
# Backend:
- Node.js
- MongoDB
- Mongoose
- Mongoose-unqiue-validator
- Body-parser
- Express
- jsonwebtoken
- Bcrypt

# Frontend:
- React
- SCSS
- Http-proxy-middleware
- Axios
- Node-sass
- React-burger-menu
- React-router-dom
- React-dom
- React-map-gl
- React-modal
- React-responsive-carousel
- React-select
- React-tooltip

# Development Tools:
- VS Code Editor
- GitHub
- Git
- Balsamiq
- Chrome Dev Tools
- Heroku

-----------------
## Approach
As there was 3 of us, we decided 1 person shall start scaffolding out the front to prepare to recieve the backend while me and my colleague kitted out the backend using Mongoose to create our database. We kept communication between the 3 of us open and accessible to make sure our work would sync in harmony.

#Backend
*Models:*

- We created 3 main schemas using Mongoose, also taking advantage of Mongoose's ability to creae virtual fields which we used to create a password confirmation field to validate the users password upon registration. Using Bcrypt we prevalidated password comparisons, if this passed we then hashed them before they were saved to protect the users password. Following this we edited the JSON response to stop the email and password being sent back in the response to the client.
- Besides our 3 main schemas we used schemas to be used in some fields of our main schemas:
-Our Message schema; aside from the sender and recipient field, has a comment field which is made up of an array of Comment schemas. Our comment schemas 2 fields; User and Text.
-Our Trip schema; had a field for recommendation field which was an array of reccomendation schemas. Very similar to our message and comment.

*Controllers:*
- We had 3 controllers; Users, Trips, Auth.
Initially we built our basic CRUD requests on Users and Auth. We used jsonwebtoken to create tokens upon login which we later used to create secure and authorised only functions of our app.
- We tested all our end point using Insomnia to ascertain we were retirieving the correct data and that our secure routes were protecting and blocking unwanted users from accessing certain data.
- We also created specific error handlers to improve our json responses on the front end which greatly helped our development process.

#Frontend:
Coming to the front end was and our colleaugue who had been on the front end now coming face to face with the back end was a moment of truth as we were to see what our 2 months of study had taught us as we tested bringing the 2 ends together and what was to happen. 
It was a smooth process, thanks to our team dynamic of open and accessible communication, super respectful of touching each others code and great technical communication. 
We then worked on our different parts of the website while still communicating our procedure. This was especially necessary as our work obviously overlapped and will effect the others part they are working on.

Profile:
I did most of the work on the profile and edit profile pages which had a fair bit of functionality.
I used Cloudinary as the storage to upload users images (profile and trip pics). This also had the added benefit of showing a preview to the user before uploading which I transformed to show a smaller image on the screen.
The users profile page had 2 main images, profile and cover. We also had an image carousel, of the users recent pics, which we installed using yarn. Using modal combined with this I manipulated the profile and cover pic that upon clicking the pic a modal would open with a carousel of  all the users profile/recent pics. I also created a function from scracth which would select the current photo the user was looking at and set it as the profile or cover pic. I embedded this button within the image carousel.
The profile edit page was a great example of pre loading data using axios requests. All of the users images (profile and recent) were preloaded in cloudinarys preview panel, which is embedded into the code. I created individual delete buttons for each pic so it was very easy for the user to delete and upload new pics. 
We also had an 'Interests' part of the users profile. 
These were icons I had gotten from the internet depicting different interests someone may have when it comes to travel. E.g. rural roads, sea, forest, mountain roads, solo, history ect. These icons were simple pictures and hovering over them on a profile you would get a little box with its title, I did this using React-tool-tip. On the edit page the setup was slightly different. All the available icons were mapped out(after being sent for in the back end) with their titles underneath them. The ones the user had already selected had thier titles in white and the rest in black. Changing interests was as easy as clicking the icon you want and clicking on the one you dont want (if the title was white first).
These icons and their value(title) were also used as tags for the trips themselves. This was great as on the index page where you can search for trips, they could then be filtered by these same interests.
On the profile we also have the conversations the user has open with ther users, whether they have sent them or recieved them. 

#Bugs:
After copious amounts of testing we seem to have ironed out all known kinks in our website. The only thing that would need ammending is the carousel renders the images in a non-uniform way which from a UX perspective is quite shabby.

#Hurdles:
At first the icons gave me a lot of trouble as I thought it would be a good idea to use SVG as an absolute newb to the industry let alone anything more techincal. After lots of head banging and wrestling matches I then found a way round of still having the icons I wanted but in a much simpler way.

#Wins:
My teams dynamic was positive and productive. Our lack of git merge issues is a testament to that I believe. At no point did we have any feelings of being lost or chaotic among our work. Focused and humorous with each other we sailed through project week and it was a really great experience.