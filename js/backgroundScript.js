function determineTimePercentage() {
    return 1 - trig(new Date().getHours());
}

function trig(x) {
    return -0.00694444*x**2+0.1666666*x;
}

document.body.style.backgroundImage = `url(./../images/cmatw_${Math.random() > determineTimePercentage() ? "sunny" : "dark"}.png)`;