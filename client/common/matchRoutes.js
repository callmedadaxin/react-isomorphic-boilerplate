import { matchRoutes } from 'react-router-config';

function getComponents(match) {
  const reducers = []
  const components = match.map(v => v.route).reduce(async (result, component) => {
    console.log(component)
    if (component.preload) {
      // loadable会自动给其注入preload方法
      const res = await component.preload();
      const { default: Component, reducer } = res
      console.log(Component, reducer)
      const ret = [...(await result), Component, ...[].concat(Component)];
      reducers.push(reducer)
      return ret;
    }
    return [...(await result), component];
  }, []);
  return {
    reducers,
    components
  }
}

function getParams(match) {
  return match.reduce((result, component) => {
    if (component.match && component.match.params) {
      return { ...result, ...component.match.params };
    }
    return result;
  }, {});
}

const asyncMatchRoutes = async (routes, pathname) => {
  const match = matchRoutes(routes, pathname);
  const params = getParams(match);
  const { components, reducers } = await getComponents(match);

  return { components, match, params, reducers };
};

export default asyncMatchRoutes;
