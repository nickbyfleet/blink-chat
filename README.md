# Blink Chat

This is a little proof of concept for a chat app

## To get it going

In the project directory, you can run:
### `npm install`

Which will install the requirements then

### `npm start`

Which runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Development Notes & Known Issues

* I opted to use Typescript and then demonstrate that I can split things out into components when it makes sense
* I used Material UI to give the app a little bit of styling
* Would have liked to have had time to write some tests, but opted not to since the brief didn't mention TDD.
* Especially with the addition of the message editing, the main `App.tsx` file is starting to get a bit hectic. If more 
functionality were to be added, a better approach might be to use Redux and then separate into actions/mutators etc.
* Related to point 1, this would then make the code a lot easier to write tests for