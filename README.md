# Mapping State to Props Using React and Redux

## Objectives

- Use the **React Redux** library to connect the store to the **React**
  application.

- Utilize the `<Provider />` component, the `connect` function and
  `mapStateToProps` to access **Redux** store content.

## Overview

In this lesson, we want to explore how `mapStateToProps` is used to connect
regular React components with the **Redux** store. This is also a good
opportunity to review the steps for using the `redux` and `react-redux`
packages in your app.

## Instructions

Some files are provided, including `UserInput` and the reducer, `manageUsers`,
but the **Redux** store isn't fully hooked up yet.

#### Connecting to Redux

In `src/index.js`, use the `createStore` method from `redux`, passing in the 
provided reducer, `manageUsers`, to create a `store`. Use `Provider` from 
`react-redux` to wrap `<App />`, passing `store` as a prop to the `Provider`. 
This will give your components access to the store.

#### Test by Dispatching an Action

Run `npm start` and open up your browser's dev console. If everything is
connected correctly in `index.js`, a form should appear in the browser.
Submitting something using the form will cause a `console.log` to fire in our
reducer, indicating that the values have been added to our store.

In `UserInput.js`, we can see the code that fires when we press the submit
button:

```js
...

handleOnSubmit = (event) => {
  event.preventDefault();
  this.props.dispatch({type: 'ADD_USER', user: this.state})
}

render() {
  return(
    <form onSubmit={this.handleOnSubmit}>
      ...
    </form>
  )
}
```

We can see that, _on submit_, `handleOnSubmit()` is called.
`event.preventDefault()` is called to stop the page from refreshing, then
`this.props.dispatch()` is called with a custom action, `{type: 'ADD_USER', user: this.state}`.

```js
export default connect()(UserInput);
```

Wrapping a component in `connect` as we see above will, by default, pass _one_
function to props: `dispatch()`. This makes it possible for us to dispatch
custom actions, as we see here in `handleOnSubmit()`.

We will go into greater detail on how we can customize our dispatches using
`connect`, but using `this.props.dispatch()` like this is a handy way to allow
any component to interact with the store.

#### Mapping State

Now that we've got a working store, we want to get access to it and display the
contents of our store's state.

1. Connect the Users component similar to how it is connected in UserInput.

2. Write a function in `Users.js`, but outside of the Users class, called
   `mapStateToProps`. `mapStateToProps` accepts one argument, `state`, the
   current version of your store's state. Use `state` to access the array of
   `users`. Your `mapStateToProps` function should return an object with keys.
   Each key will become a prop in your component, allowing you to assign values
   based on the provided `state`.

The Users component should display the username of a user submitted to the
store. To pass the final test, it should also display a total count of current
users. Try to use `mapStateToProps` to solve both, returning two keys, one for
`users` and one for the `userCount`.

## Conclusion

With all tests passing, you should have a working form that adds and
successfully displays usernames, as well as a total count of those users. While
these are small bits of data, we've got a fully integrated React/Redux
application, ready to be expanded upon!

