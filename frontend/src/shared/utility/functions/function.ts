function debounceFn() {
  let timer: ReturnType<typeof setTimeout>;
  return function (fn: (textValue: string) => void, textValue: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(textValue);
    }, 700);
  };
}

const debounce = debounceFn();

export { debounce };
