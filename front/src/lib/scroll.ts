export const scrollToBottom = (ref: (Window & typeof globalThis) | any = window) => {
  ref.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};
