/**
 * 等待
 * @param time 等待时间（毫秒）
 * */
export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
