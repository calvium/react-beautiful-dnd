// @flow
import { useEffect } from 'react';
import { useMemo } from 'use-memo-one';
import type { Registry } from './registry-types';
import createRegistry from './create-registry';

export default function useRegistry(): Registry {
  const registry: Registry = useMemo(createRegistry, []);

  useEffect(() => {
    return function unmount() {
      registry.clean();
    };
  }, [registry]);

  return registry;
}
