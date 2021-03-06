import { contentScript } from './github-script';

export const destruct = () => {

  function destructor() {
    // Destruction is needed only once
    document.removeEventListener(destructionEvent, destructor);
    // Tear down content script: Unbind events, clear timers, restore DOM, etc.
    contentScript.destruct();
  }

  const destructionEvent = 'destruct_github_content_script_' + xbrowser.runtime.id;
  // Unload previous content script if needed
  document.dispatchEvent(new CustomEvent(destructionEvent));
  document.addEventListener(destructionEvent, destructor);
};
