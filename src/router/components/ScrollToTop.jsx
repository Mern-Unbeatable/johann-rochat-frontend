import { useEffect } from 'react';

/**
 * Scrolls the window to the top on every completed route change.
 * Works with React Router Data Router instances.
 */
function ScrollToTop({ router, behavior = 'auto' }) {
  useEffect(() => {
    if (!router) {
      return undefined;
    }

    let lastLocationKey = router.state.location.key;

    const unsubscribe = router.subscribe((state) => {
      if (state.navigation.state !== 'idle') {
        return;
      }

      if (state.location.key !== lastLocationKey) {
        window.scrollTo({ top: 0, left: 0, behavior });
        lastLocationKey = state.location.key;
      }
    });

    return unsubscribe;
  }, [router, behavior]);

  return null;
}

export default ScrollToTop;
