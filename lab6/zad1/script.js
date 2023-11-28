document.addEventListener("DOMContentLoaded", () => {

    const helper = document.getElementById("helper");
    const container1 = document.getElementById("container-outer");
    const container2 = document.getElementById("container-middle");
    const container3 = document.getElementById("container-inner");

    let counter = document.querySelector("#counter p");
    const btnPropagation = document.getElementById("btn-propagation");
    const btnReset = document.getElementById("btn-reset");
    const btnOrder = document.getElementById("btn-order");

    let logs = document.getElementsByClassName("logs")[0];
    let message = document.getElementById("message");

    let propagationEnabled = false;
    let removedListenerYellow = false;
    let removedListenerRed = false;
    let isOrderOriginal = true;
    let messageOpen = false;

    const setup = () => {
        helper.addEventListener("click", helperClick, true);
        container1.addEventListener("click", handleContainer1Click, !isOrderOriginal);
        container2.addEventListener("click", handleContainer2Click, !isOrderOriginal);
        container3.addEventListener("click", handleContainer3Click, !isOrderOriginal);
    }

    const removeListerners = () => {
        helper.removeEventListener("click", helperClick, true);
        container1.removeEventListener("click", handleContainer1Click, isOrderOriginal);
        container2.removeEventListener("click", handleContainer2Click, isOrderOriginal);
        container3.removeEventListener("click", handleContainer3Click, isOrderOriginal);
        container1.removeEventListener("click", handleContainer1Click, !isOrderOriginal);
        container2.removeEventListener("click", handleContainer2Click, !isOrderOriginal);
        container3.removeEventListener("click", handleContainer3Click, !isOrderOriginal);
    }

    const removeListenerYellow = () => {
        container2.removeEventListener("click", handleContainer3Click);
        removedListenerYellow = true;

        const newLogP = document.createElement("p");
        newLogP.innerHTML = "Remove listener from container 3";
        newLogP.style.color = "red";
        newLogP.style.fontWeight = "bold";
        logs.prepend(newLogP);
    }

    const removeListenerRed = () => {
        container3.removeEventListener("click", handleContainer2Click);
        removedListenerRed = true;

        const newLogP = document.createElement("p");
        newLogP.innerHTML = "Remove listener from container 2";
        newLogP.style.color = "red";
        newLogP.style.fontWeight = "bold";
        logs.prepend(newLogP);
    }

    const helperClick = () => {
        messageOpen = true;
    }

    const handleClick = (element, value) => {
        if (messageOpen || !isOrderOriginal) {
            message.innerHTML = `Nacisnąłeś ${element} o wartości ${value}`;
            messageOpen = false;
        }

        const counterValue = parseInt(counter.innerHTML);
        counter.innerHTML = counterValue + value;
        if (!removedListenerYellow && counterValue > 30) removeListenerYellow();
        if (!removedListenerRed && counterValue > 50) removeListenerRed();
    }

    const handleContainer1Click = (event) => {
        handleClick("blue", 1);
        if (!propagationEnabled) event.stopPropagation();

        const newLogP = document.createElement("p");
        newLogP.innerHTML = "Container 1 was clicked";
        logs.prepend(newLogP);
    }

    const handleContainer2Click = (event) => {
        if (!removedListenerRed) {
            handleClick("red", 2);
            if (!propagationEnabled) event.stopPropagation();

            const newLogP = document.createElement("p");
            newLogP.innerHTML = "Container 2 was clicked";
            logs.prepend(newLogP);
        }
    }

    const handleContainer3Click = (event) => {
        if (!removedListenerYellow) {
            handleClick("yellow", 3);
            if (!propagationEnabled) event.stopPropagation();

            const newLogP = document.createElement("p");
            newLogP.innerHTML = "Container 3 was clicked";
            logs.prepend(newLogP);
        }
    }

    helper.addEventListener("click", () => {
        const newLogP = document.createElement("p");
        newLogP.innerHTML = "----------------------------------";
        logs.prepend(newLogP);
    });

    btnPropagation.addEventListener("click", () => {
        if (propagationEnabled) {
            propagationEnabled = false;
            btnPropagation.innerHTML = "Start propagation";

            const newLogP = document.createElement("p");
            newLogP.innerHTML = "Stop propagation";
            newLogP.style.color = "red";
            newLogP.style.fontWeight = "bold";
            logs.prepend(newLogP);
        } else {
            propagationEnabled = true;
            btnPropagation.innerHTML = "Stop propagation";

            const newLogP = document.createElement("p");
            newLogP.innerHTML = "Start propagation";
            newLogP.style.color = "green";
            newLogP.style.fontWeight = "bold";
            logs.prepend(newLogP);
        }
    })

    btnReset.addEventListener("click", () => {
        counter.innerHTML = 0;
        logs.innerHTML = "";
        messageOpen = false;
        message.innerHTML = "LOGS:";
        removedListenerYellow = false;
        removedListenerRed = false;
        propagationEnabled = false;
        btnPropagation.innerHTML = "Start propagation";
        btnOrder.innerHTML = "Change order (original)";
        isOrderOriginal = true;
        removeListerners();
        setup();
    });

    btnOrder.addEventListener("click", () => {
        const newLogP = document.createElement("p");
        if (isOrderOriginal) {
            isOrderOriginal = false;
            newLogP.innerHTML = "Order of event propagation: container 1 -> container 2 -> container 3";
            btnOrder.innerHTML = "Change order (reversed)";
        } else {
            isOrderOriginal = true;
            newLogP.innerHTML = "Order of event propagation: container 3 -> container 2 -> container 1";
            btnOrder.innerHTML = "Change order (original)";
        }
        console.log(isOrderOriginal);
        newLogP.style.color = "blue";
        newLogP.style.fontWeight = "bold";
        logs.prepend(newLogP);
        removeListerners();
        setup();
    });

    setup();
});
