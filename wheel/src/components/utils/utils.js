// 防抖动，直到时间间隔大于ms后才会执行一次
export let debounce = (func, ms) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func()
        }, ms)
    }
}

// 图片懒加载