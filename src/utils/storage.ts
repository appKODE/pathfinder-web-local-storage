import { DataStorage, Spec } from '@kode-frontend/pathfinder-web-core';
import { getItem, setItem } from './local-storage';

export const ENDPOINTS_KEY = 'endpoints';
export const GLOBAL_ENV_KEY = 'global';
export const SPEC_KEY = 'spec';

const getEndpointsOptions:(key: string)=>Record<string, string>|undefined = (key) => {
  let result;

  try {
    const optionsString = getItem(key);

    if (optionsString) {
      const parsedOptions = JSON.parse(optionsString) as Record<string, string>;

      if (typeof parsedOptions === 'object') {
        result = parsedOptions;
      }
    }
  } catch (e) {
    console.error(e);
  }



  return result;
};

const getEndpointEnv:(urlId: string)=>string|undefined = (urlId) => {
  const options = getEndpointsOptions(ENDPOINTS_KEY);

  if (options) {
    return options[urlId];
  }

  return undefined;
};

const setEndpointEnv:(urlId: string, envId?: string)=>void = (urlId, envId) => {
  const options = getEndpointsOptions(ENDPOINTS_KEY);
  const res = { ...options, [urlId]: envId };

  setItem(ENDPOINTS_KEY, JSON.stringify(res));
};

const resetEndpointsEnv = () => {
  setItem(ENDPOINTS_KEY, '{}');
};

const resetGlobalEnv = () => {
  setItem(GLOBAL_ENV_KEY, '{}');
};

const getGlobalEnv = () => getItem(GLOBAL_ENV_KEY)!;

const setGlobalEnv = (envId?: string) => {
  setItem(GLOBAL_ENV_KEY, envId);
};

const setSpec = (data: Spec) => {
  setItem(SPEC_KEY, JSON.stringify(data));
};

const getSpec:()=> Spec | undefined = () => {
  const rawSpec = getItem(SPEC_KEY);

  if (rawSpec) {
    try {
      return JSON.parse(rawSpec) as Spec;
    } catch (e) {
      console.error(e);
    }
  }
  return undefined;
};

export const storage: DataStorage = {
  getSpec,
  setSpec,
  getEndpointEnv,
  setEndpointEnv,
  resetEndpointsEnv,
  resetGlobalEnv,
  getGlobalEnv,
  setGlobalEnv,
};
