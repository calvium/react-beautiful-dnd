// @flow
import { useEffect, useRef } from 'react';
import type { Registry } from './registry-types';
import createRegistry from './create-registry';

export default function useRegistry(): Registry {
  const registryRef = useRef<?Registry>(null);
  if (!registryRef.current) {
    registryRef.current = createRegistry();
  }
  const registry = registryRef.current;

  useEffect(() => {
    return function unmount() {
      // null out the ref so we'll create a new registry if we remount.
      // (React 17+ does this in dev mode just to annoy me.)
      registryRef.current = null;
      // clean up the registry to avoid any leaks
      // doing it after an animation frame so that other things unmounting
      // can continue to interact with the registry
      requestAnimationFrame(registry.clean);
    };
  }, [registry]);

  return registry;
}
