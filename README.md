# Mapping State to Props Using React and Redux

## Objectives

* Use the __React Redux__ library to connect the store to the __React__
application.   

* Utilize the __<Provider />__ component, the `connect` function and
`mapStateToProps` to access __Redux__ store content.

## Overview

In this lesson, we want to explore how `mapStateToProps` is used to connect
regular React components with the __Redux__ store. This is also a good
opportunity to review the steps for using the `redux` and `react-redux`
packages in your app.

## Instructions

Some files are provided, including `UserInput` and the reducer, `manageUsers`,
but the __Redux__ store isn't fully hooked up yet.

#### Connecting to Redux

In `src/index.js`, use the `createStore` from `redux`, passing in the provided
reducer, `manageUsers`, to create a `store`. Use `Provider` from `react-redux`
to wrap `<App />`, passing `store` as a prop to the `Provider`. This will give
your components access to the store.

#### Test by Dispatching an Action

Run `npm start` and open up your browser's dev console. If everything is
connected correctly in `index.js`, submitting something using the provided form
should cause a `console.log` to fire in our reducer, indicating that the values
have been added to our store.

In `UserInput.js`, take note of the way an action is dispatched to the __Redux__
store, as it is slightly different than what we've seen before:

```js
...

handleOnSubmit = (event) => {
  event.preventDefault();
  this.props.dispatch({type: 'ADD_USER', user: this.state})
}

...

export default connect()(UserInput);
```

Wrapping a component in `connect` without any arguments will still provide _one_
prop, `dispatch()`! This makes it possible for us to dispatch whatever actions
we want, from _anywhere_. We will go into greater detail on how we can apply
dispatch using `connect`, but using `this.props.dispatch()` is a handy and
simple way to allow components to interact with the store.

#### Mapping State

Now that we've got a working store, we want to get access to it and display the
contents of our store's state.

1. Connect the Users component similar to how it is connected in UserInput.

2. Write a function in `Users.js`, but outside of the Users class called
`mapStateToProps`. `mapStateToProps` accepts one argument, `state`, the current
version of your store's state. Use `state` to access the array of `users`. Your
`mapStateToProps` function should return an object with keys. Each key will
become a prop in your component, allowing you to assign values based on the
provided `state`.

The Users component should display the username of a user submitted to the
store. To pass the final test, it should also display a total count of current
users. Try to use `mapStateToProps` to solve both, returning two keys, one for
`users` and one for the `userCount`.

## Conclusion

With all tests passing, you should have a working form that adds and
successfully displays usernames, as well as a total count of those users. While
these are small bits of data, we've got a fully integrated React/Redux
application, ready to be expanded upon!
