# react-isomorphic-boilerplate
a boilerplate for react server-side rendering app

## Features
- [x] React + Redux + React-Router
- [x] Sever side render with Koa
- [x] Webpack 4+
- [ ] support sass
- [ ] support cssmodules with babel-plugin-react-css-modules
- [ ] Build with dll plugin

## Usage

```
// run client and server side for dev
npm start

// build client and server side
npm run build

// start serve
npm run serve
```

## Isomorphic
Write fetch hooks in containers

It will auto fetch and update the states both on the client and server side

```
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(getUserList())
})
@connect(state => state.users)
export default class UserContainer extends Component {
  render() {
    const { userList } = this.props
    return (
      <UserComp userList={userList}/>
    )
  }
}
```
