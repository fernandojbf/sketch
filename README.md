# Sketch Challenge

made by Fernando Ferreira

## How to run the code

- `yarn`
- `yarn build`
- `yarn start`
- browse: <http://localhost:3000/document/Y8wDM>

## How to run tests

- unit tests: `yarn test`
- type-check `yarn type-check`

## Dependencies

### Framework

- nextjs

### Most important libraries

- react
- recoil
- @apollo/client
- styled-components
- styled-system

## Developer Notes

### Context

#### NextJS

This application was done using nextjs, for me one of the best react frameworks these days. The main reason I've used it was to speed up the boilerplate and improve developer experience.

#### Recoil

Recoil is an experimental library from Facebook that got my attention. I really wanted to try it so I used the opportunity of this challenge to test it. The state management of this application is not too complex, so I could have used react context, redux, apollo-state or some other. But thinking about the possibilities (not for this challenge, but in a more complex application like this), I chose recoil.

#### Styled-Components and Styled-System

Since Sketch uses styled-components I've decided to also use it. I think styled-system is a really cool tooling to create design systems so I've added it too.

### Solution

I wanted to create an application as a representation of the state. That is the reason why I've created a set of recoil atoms and selectors, using them in the components. I could use Graphql Components to query data but my objective was to have a really reactive state decoupled from the components.

The foundation of the state is `document-id` and `artboard-id`. From there, there is a chain of actions that will build the complete state, without the need to store state computation by the developer. The state reacts to user selections.

The components are a representation of the data. I have 2 Main components (SketchDocument and Arboard) that link recoil state to the markdown.

In terms of component hierarchy/structure, I've used a really flexible idea of atomic design. Simple components like `Text` and `Box` can be found in the atoms folder. The molecules folder contains Components that are a collection of atoms. And finally we have the pages folder that contains components that use a set of molecules/atoms and hooks to build the UI.

The state folder contain all recoil related code, and the Inspector (state sync) that needs to be present.

Finally we have a hooks folder.

The rest of the folders are mainly due to nextjs framework.

## What can be improved

There is a lot of things that can be improved in this challenge. I've made this challenge using a couple of hours a day, from Monday (3/08/2020) to Friday (07/08/2020). If I had more time, I would solve some of the following items.

### Race Condition

There is a race condition on the code.
Since I've made a reactive state, and an UI totally responsive to that state, I end up with the problem of having the router outside recoil.

NextJS has a really restrictive router and with the short time, was impossible to make a solution for this. What I would like to have done was implement the router history inside of recoil state, making sure that the router would be reactive to the state at the same time (this would be really difficult to do with nextjs router. Maybe easier with react-router).

I've added code on `SketchDocument` and `Artboard` to make sure the page does not break with that race condition. But the perfect solution would be moving router history to recoil state.

### Proper Link

Since the whole application is reactive to state changes, I didn't want to use normal Links, but a state action that would react on a route change. Because of that all my links have an onClick action that prevent browser to make the default behaviour. I used that so the app continue to work without js (if ssr was there) but with the power of a state of truth.

Creating a link with all the features (like open in new tab) but making a state change would be simple to achieve with more time.

### isFirstRender aka static html

I've started the implementation but I didn't have time to finish. The idea of `useIsFirstRender` was to enable each page to render a skeleton, and not requesting any data on static generation.

### Tests

I only added one test as example.
The tests on the other components would be really identical to what I've done.

The recoil tests would be a funny thing to do. For sure, the strategy to make it would be using the initialState of the store to test the result of the selectors.

### Typescript

I only added some definitions. I did not add the graphql definitions. Because of that there is a lot of Typescript that can be improved.

### Responsive design

Since I only had designs for desktop I did not spend time adding any mobile/tablet designs. This could be improved as well.

Probably the designs will not match 100% since I've only used the images that were given in the challenge.

### useRecoilValueLoadable

Recoil is already prepared to use react concurrent mode. I would remove all the loading, error checks to add `Suspense` and error boundaries, but since concurrent mode is experimental and I was already using recoil (experimental too), I've decided to not add more fire to my code :)

### Eslint/Styling Missing

Probably there is a lot of linting that should be failing in this project. Since I wanted to move fast I ended up not adding it. I've added prettier to make sure I had some standard there.

## Conclusion

I think this is everything that I have on my mind right now.

If there is anything I can help please reach me.

Cheers

Fernando Ferreira
