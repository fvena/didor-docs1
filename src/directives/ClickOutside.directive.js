// Define the function to be called on click, filter the excludes and call the handler
function directive(e, el, binding, vnode) {
  // If no closeConditional was supplied assign a default
  const isActive = vnode.context[binding.arg] || false;

  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || isActive === false) return;

  // If click was triggered programmaticaly (domEl.click()) then
  // it shouldn't be treated as click-outside
  // Chrome/Firefox support isTrusted property
  // IE/Edge support pointerType property (empty if not triggered
  // by pointing device)
  if (('isTrusted' in e && !e.isTrusted) || ('pointerType' in e && !e.pointerType)) return;

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.
  if (!el.contains(e.target) && binding.value) {
    setTimeout(() => {
      binding.value(e);
    }, 0);
  }
}

const clickOutside = {
  inserted(el, binding, vnode) {
    const onClick = e => directive(e, el, binding, vnode);

    // Register our clickOutside handler on the click/touchstart listeners
    document.addEventListener('click', onClick, true);
    document.addEventListener('touchstart', onClick, true);
    document.onkeydown = e => {
      // this is an option but may not work right with multiple handlers
      if (e.keyCode === 27) {
        // TODO: there are minor issues when escape is clicked right after open keeping the old target
        onClick();
      }
    };

    el._clickOutside = onClick;
  },

  unbind(el) {
    if (!el._clickOutside) return;

    // If the element that has v-outside-click is removed, unbind it from listeners
    document.removeEventListener('click', el._clickOutside, true);
    document.removeEventListener('touchstart', el._clickOutside, true);
    document.onkeydown = null; // Note that this may not work with multiple listeners

    delete el._clickOutside;
  },
};

export default clickOutside;
