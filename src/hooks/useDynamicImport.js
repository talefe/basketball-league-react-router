import { useState, useEffect } from 'react';

export default function useDynamicImport(load) {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const mod = load();
    setComponent(mod.default);
  }, [load]);

  return component;
}
