const callbacks = new Set<() => void>();

export const clickAnywhere = (el: HTMLElement, cb: () => void) => {
  const propaHandler = (e: MouseEvent) => {
    // need to call back other clickAnywhere
    // before e.stopPropagation,
    // if there are more than one
    callbacks.forEach((ocb) => {
      if (ocb !== cb) {
        ocb();
      }
    });
    e.stopPropagation();
  };

  const callbackHandler = () => {
    cb();
  };

  el.addEventListener('mousedown', propaHandler);
  window.addEventListener('mousedown', callbackHandler);
  callbacks.add(cb);

  return () => {
    el.addEventListener('mousedown', propaHandler);
    window.removeEventListener('mousedown', callbackHandler);
    callbacks.delete(cb);
  };
};
