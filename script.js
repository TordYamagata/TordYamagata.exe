let highestZ = 10;


/* =====================================================
   ABRIR JANELA
===================================================== */

function openWindow(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;


    windowElement.classList.add("active");


    bringToFront(windowElement);


    updateTaskbar();


    document
        .getElementById("startMenu")
        .classList.remove("open");
}


/* =====================================================
   FECHAR
===================================================== */

function closeWindow(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;


    windowElement.classList.remove("active");


    updateTaskbar();
}


/* =====================================================
   MINIMIZAR
===================================================== */

function minimizeWindow(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;


    windowElement.classList.remove("active");


    updateTaskbar();
}


/* =====================================================
   MAXIMIZAR
===================================================== */

function maximizeWindow(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;


    if (
        windowElement.dataset.maximized === "true"
    ) {

        windowElement.style.width = "";
        windowElement.style.height = "";
        windowElement.style.left = "";
        windowElement.style.top = "";

        windowElement.dataset.maximized = "false";

    } else {

        windowElement.style.left = "0";
        windowElement.style.top = "0";

        windowElement.style.width = "100vw";
        windowElement.style.height =
            "calc(100vh - 32px)";

        windowElement.dataset.maximized = "true";
    }


    bringToFront(windowElement);
}


/* =====================================================
   JANELA PARA FRENTE
===================================================== */

function bringToFront(element) {

    highestZ++;

    element.style.zIndex = highestZ;
}


/* =====================================================
   MENU INICIAR
===================================================== */

function toggleStartMenu() {

    const menu =
        document.getElementById("startMenu");

    menu.classList.toggle("open");
}


/* =====================================================
   TASKBAR
===================================================== */

function updateTaskbar() {

    const taskbar =
        document.getElementById(
            "taskbarWindows"
        );


    taskbar.innerHTML = "";


    const windows =
        document.querySelectorAll(".window");


    windows.forEach(windowElement => {

        if (
            windowElement.classList.contains(
                "active"
            )
        ) {

            const button =
                document.createElement("button");


            button.className =
                "task-button";


            const title =
                windowElement.querySelector(
                    ".title-bar span"
                );


            button.innerText =
                title
                    ? title.innerText
                    : "Janela";


            button.onclick = function () {

                windowElement.classList.add(
                    "active"
                );

                bringToFront(windowElement);

            };


            taskbar.appendChild(button);

        }

    });
}


/* =====================================================
   RELÓGIO
===================================================== */

function updateClock() {

    const clock =
        document.getElementById("clock");


    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}`;
}


setInterval(
    updateClock,
    1000
);


updateClock();


/* =====================================================
   ABRIR GITHUB
===================================================== */

function openGithub(url) {

    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   ARRASTAR JANELAS
===================================================== */

document
    .querySelectorAll(".window")
    .forEach(windowElement => {


        const titleBar =
            windowElement.querySelector(
                ".title-bar"
            );


        let dragging = false;

        let offsetX = 0;
        let offsetY = 0;


        titleBar.addEventListener(
            "mousedown",
            function(event) {


                if (
                    event.target.tagName ===
                    "BUTTON"
                ) {

                    return;

                }


                if (
                    windowElement.dataset
                        .maximized === "true"
                ) {

                    return;

                }


                dragging = true;


                bringToFront(
                    windowElement
                );


                const rect =
                    windowElement
                        .getBoundingClientRect();


                offsetX =
                    event.clientX -
                    rect.left;


                offsetY =
                    event.clientY -
                    rect.top;

            }
        );


        document.addEventListener(
            "mousemove",
            function(event) {


                if (!dragging) return;


                windowElement.style.left =
                    (
                        event.clientX -
                        offsetX
                    ) + "px";


                windowElement.style.top =
                    (
                        event.clientY -
                        offsetY
                    ) + "px";

            }
        );


        document.addEventListener(
            "mouseup",
            function() {

                dragging = false;

            }
        );


        windowElement.addEventListener(
            "mousedown",
            function() {

                bringToFront(
                    windowElement
                );

            }
        );

    });