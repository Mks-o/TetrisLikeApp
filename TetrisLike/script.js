
var id = null;
let random = new Random();
//#region html
let containerElement = document.querySelector("#container")
let scoreLable = document.querySelector(".score");
let speedLable = document.querySelector(".speed");
var mainBlock = document.getElementById("btn");
//#endregion
//#region gamevalues
let score = 0;
let speed = 1;
let count = 0
//#endregion
//#region controls
let posX = 0;
var posY = 0;
let offset = 0.1;
let move = 0;
let presed = false;

//#endregion
//#region custom
let colors = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
let sizes = [30, 60, 90];
let names = ['div', 'pre', 'nav', 'css', 'label', 'input', 'promises', 'JSON', 'class', 'select', '{js}', 'array', '$react', 'array', 'webpack', 'html', 'header', 'section', 'Object', 'let', 'const', 'var', 'padding', 'margin', 'Bootstrap', 'Jquery', 'function', 'if', 'else', 'try', 'catch', 'finally'];
//#endregion

function checkBottom(y = posY, div = mainBlock) {
    return y >= containerElement.offsetHeight - div.offsetHeight;
}
function myMove() {
    posY = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (checkBottom() || isOnTop(mainBlock)) {
            clearInterval(id);
            mainBlock.id = "";
            speed += 0.001;
            speedLable.innerText = speed.toFixed(1);
            inLineCheck(mainBlock);
            mainBlock.classList.add("fall")
            if (posY == 0) {
                endGame();
                return;
            }
            createNewElement();
        }
        else {
            posY += speed;
            mainBlock.style.top = posY + 'px';
            mainBlock.style.left = posX + 'px';
        }
    }
}
const checkCollide = function (div, element) {
    const divRect = getOffset(div);
    const mainBlickRect = getOffset(element);
    return divRect.top <= mainBlickRect.bottom &&
        divRect.top - mainBlickRect.top > 0 &&
        divRect.left + offset < mainBlickRect.right &&
        divRect.right - offset > mainBlickRect.left
}
function isOnTop(block) {
    let divs = document.querySelectorAll('.fall');
    return [...divs].some(div => {
        return checkCollide(div, block)
    });
}
//#region events
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37 && move - posX <= 0 && canMove(-1)) {
        posX -= move;
    }
    else if
        (event.keyCode == 39 &&
        posX < getOffset(containerElement).leftOffset - move - mainBlock.offsetWidth + offset
        && canMove(1)
    ) {
        posX += move;
    }
    else if (event.keyCode == 40 && !presed) {
        speed += 4;
        presed = true;
    }
});
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 40) {
        speed -= 4;
        presed = false;
    }
})
//#endregion

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        name: el.innerText,
        leftOffset: el.offsetWidth,
        x: rect.y,
        y: rect.x,
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right,
        bottom: rect.bottom
    };
}
function canMove(direction) {
    let elemRect = getOffset(mainBlock);
    let divs = document.querySelectorAll('.fall');
    let res = true;
    [...divs].forEach(div => {
        const divRect = getOffset(div);
        if (divRect.top <= elemRect.bottom
            && divRect.bottom + offset >= elemRect.top) {

            if (direction < 0 && elemRect.left - move < divRect.right - offset && divRect.right <= elemRect.left + offset) {
                res = false;
            }

            else if (direction > 0 &&
                divRect.left - move - elemRect.right < -offset
                && divRect.left >= elemRect.right - offset) {
                res = false;
            }
        }
    });
    return res;
}
function createNewElement() {
    mainBlock = document.createElement("div");
    let color = random.getRandomArrayElement(colors);
    let s = random.getRandomArrayElement(sizes);
    let n = random.getRandomArrayElement(names);
    let textSize = ["10px", "15px", "22px"]
    let values = getOffset(containerElement).leftOffset / sizes[2] - 1;
    console.log(values);
    posX = sizes[2] * random.getRandomNumber(0, values);
    mainBlock.className = `btn ${color} h1 d-flex text-wrap align-items-center justify-content-center`;
    mainBlock.val = count++;
    mainBlock.innerText = mainBlock.val + " " + n;
    mainBlock.style.setProperty("position", "absolute");
    mainBlock.style.setProperty("font-size", textSize[sizes.indexOf(s)]);
    mainBlock.style.setProperty('width', `${s}px`);
    mainBlock.style.setProperty('height', `${s}px`);
    mainBlock.style.setProperty('padding', '0px');
    mainBlock.style.setProperty('border', '0px');
    mainBlock.style.left = posX + 'px';
    mainBlock.id = "btn";
    containerElement.appendChild(mainBlock);
    move = mainBlock.offsetWidth;
    myMove();
}
function inLineCheck(element) {
    let divs = document.querySelectorAll('.fall');
    const elemRect = getOffset(element);
    let elements = [];
    [...divs].forEach(div => {
        let divRect = getOffset(div);
        if (div.className.match(element.className)) {
            //horiaontal
            if (Math.abs(divRect.x - elemRect.x) < sizes[1] && Math.abs(divRect.y - elemRect.y) < sizes[1] * 2) {
                elements.push(div);
                elements.push(element);
            }
            //vertical
            if (Math.abs(divRect.y - elemRect.y) < sizes[1] &&
                Math.abs(divRect.x - elemRect.x) <= sizes[1] * 3 - offset) {
                elements.push(div);
                elements.push(element);
            }
        }
    });
    unique = elements.filter((value, index, array) => array.indexOf(value) === index);
    if (unique.length > 2) {
        unique.forEach(e => {
            score += parseInt(e.val);
            e.className = "btn btn-secondary"
            setInterval(() => e.remove(), 150);
        });
        scoreLable.innerText = `Score: ${score}`;
    }
    [...divs].forEach(div => {
        if (!isOnTop(div) && !checkBottom(getOffset(div).top, div)) {
            MoveDiv(div);
        }
    })
}
function MoveDiv(div) {
    var yPos = getOffset(div).top;
    let int = setInterval(() => {
        if (checkBottom(yPos, div) || isOnTop(div)) {
            div.id = "";
            inLineCheck(div);
            div.classList.add("fall")
            clearInterval(int);
            return;
        }
        else
            yPos += speed;
        div.style.top = yPos + 'px';
    }, 10);
}
function onStart() {
    let container = document.querySelector("#container");
    let btn = document.createElement("button");
    btn.innerText = "start";
    btn.onclick = () => { createNewElement(); btn.remove() }
    container.append(btn);
    btn.className = "w-50 btn btn-danger position-absolute translate-middle-x";
    btn.style.left = container.offsetWidth / 2 + 'px';
    btn.style.top = 0 + 'px';
}
function endGame() {
    let lastscore = "-";
        if (localStorage.getItem("score")) {
            lastscore = localStorage.getItem("score");
        }
        alert(`Last score was: ${lastscore}\nEnd game(Your score: ${score})`);
        localStorage.setItem("score", score);
        location.reload();
    }
onStart();