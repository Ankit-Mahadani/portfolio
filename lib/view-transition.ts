type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

export function startViewTransition(callback: () => void) {
  const doc = document as DocumentWithViewTransitions;
  if (doc.startViewTransition) {
    doc.startViewTransition(callback);
  } else {
    callback();
  }
}
