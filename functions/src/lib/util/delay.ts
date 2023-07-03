const delay = (ms: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms);
    }, ms),
  );
};

export default delay;
