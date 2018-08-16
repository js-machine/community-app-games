module.exports = class TimerService {
    start(
        onInterval,
        onComplete,
        ms,
        interval = 1000
    ) {
        let countDownDate = new Date((new Date()).getTime() + ms).getTime();

        onInterval(ms);

        let newInterval = setInterval(() => {
            let now = new Date().getTime();

            let distance = countDownDate - now;

            onInterval(distance);

            if(distance < 0) {
                onComplete();
                clearInterval(newInterval);
            }
        }, interval)

        return newInterval;
    }

    end(timer) {
        clearInterval(timer)
    }    
}