/**
 * 延迟尝试，直到条件满足
 */
export default function delayRetry(condition: () => true, callback: () => {},
                                   duration = 200, times = 10) {
  let count = 0;
  let timer = null;

  // retry
  function retry() {
    timer = setTimeout(() => {
      clearTimeout(timer);
      if (count < times) {
        condition() ? callback() : retry();
        count++;
      }
    }, duration);
  }

  retry();
}
