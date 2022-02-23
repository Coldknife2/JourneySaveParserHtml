function determineTimePercentage() {
    return 1 - trig(new Date().getHours());
}

function trig(x) {
    return -0.00694444*x**2+0.1666666*x;
}


const randomPick = Math.random() > determineTimePercentage();
document.body.style.backgroundImage = `url(./images/cmatw_${ randomPick ? "sunny" : "dark"}.png)`;

if (randomPick)
{
    const link = document.createElement("link");
    link.href = "./css/sunnyStyle.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(link);
}