# PDSCT

http://pdcst-app.herokuapp.com

## Goal

The purpose behind this project was simply to showcase what I could do in Go + React. The plan was never to build anything too elaborate. It just needed to be functional with just enough aestetics.

## Golang

I have a fair amount of experience programming in Go, however coming from an enterprise
shop we have teams dedicated to devloping tools that generate much of the boilerplate code for our micro-services. My goal in 
implementing the server handlers for this project was to **_not_** reinvent the wheel, but in essence come up with an
MVP that was easily repeatable and well-organized. In the end, the majority of routes simply wound up being pass-throughs to the thrid-party api,
and I only deviated from that pattern as needed due to it's limitations (i.e. there is no call to get a batch of podcasts by id in the free version
of the api, so I passed these ids from the clientside and compiled the results of individual get calls to then return back to the clientside.).

## React

Full disclosure - _I've never worked in React before._ This was mostly the entire impetus for the project. My desire was to show that I can adapt to any given stack, grow and learn. This was very much a learning experience, and though I'm much more comfortable working in Vue, I greatly enjoyed the challenge. I found it to be very powerful, and flexible in a lot of ways, but I definitely felt that a drawback to that was that pretty much everything needed to be home-baked. For one thing, I feel like the syntax and patterns around routing and conditional rendering are much cleaner in a framework such as Vue. I recognize that there are likely some React-based libraries that would make some of this easier, but I wanted to try to learn React from the ground up, in its most 'vanilla' sense possible.  Coming from Vue & the Vuetify library, I definitely felt there was much more grunt work upfront needed to get a functional app off the ground with React, but then again I'm sure some of that would be taken care of by leveraging an equivalet library. At the same time, I felt like React's usage of state and props is much easier to conceptualize than Vue (or maybe it was just that I had already been exposed to SPA state management... ¯\_(ツ)_/¯ Nonetheless I found it to be clean and predictable, which was awesome).

## Limitations/Areas for Improvement

As I said, this was really just an MVP, emphasis on the 'M'. There are defintely ways this app could be improved, but I felt like they were outside the scope of the project. **There's no internal data layer/user auth.** This would definitely be needed in order to present the same experience to users on any device so they could access and manage their followed podcasts. Right now, the 'Following.' page and its corresponding functionality throughout the app is fully functional. It was included in this project as an added feature, but it currently just uses local storage. In order to fully implement it in a production-worthy app The only thing that would need to change would be to instead point it to the database.

## If you've gotten this far...

Well if you have, that really means a lot, so thanks! The project honestly was a treat. It's not really all that fancy, but I feel like it definitely leverages a fair bit of the capabilities of React, which was the whole goal of it in the first place.
