//Переменые для игры
let startBtn = document.getElementById('start-btn')
let startTicTacToe = document.getElementById('start-tic-tac-toe')

let cells = document.querySelectorAll("#tic-tac-toe td")
let ticTacToeStage = document.getElementById('tic-tac-toe-stage')
let ticTacToeStageAsk = document.getElementById('tic-tac-toe-stage-ask')


//Переменные для этапа 1
let firstStage = document.getElementById('first-stage')
let inputFirstStage = document.getElementById('first-stage-input')
let btnFirstStage = document.getElementById('first-stage-btn')
let askFirstStage = document.getElementById('first-stage-ask')

//Переменные для этапа 2
let secondStage = document.getElementById('second-stage')
let btnSecondStage = document.getElementById('second-stage-btn')

//Переменные для этапа 3
let thirdStage = document.getElementById('third-stage')
let Img1ThirdStage = document.getElementById('third-stage-img1')
let Img2ThirdStage = document.getElementById('third-stage-img2')
let Img3ThirdStage = document.getElementById('third-stage-img3')
let Img4ThirdStage = document.getElementById('third-stage-img4')
let textThirdStage = document.getElementById('third-stage-text')

//Переменные для этапа 4
let fourthStage = document.getElementById('fourth-stage')
let btnFourthStage = document.getElementById('fourth-stage-trueBtn')
let fourthStageText = document.getElementById('fourth-stage-text')

//Переменные для этапа 5
let fifthStage = document.getElementById('fifth-stage')
let fifthStageHpMonster = document.getElementById('fifth-stage-hp-monster')
let fifthStageHpUser = document.getElementById('fifth-stage-hp-user')
let fifthStageAttack = document.getElementById('fifth-stage-attack')
let fifthStageHeal = document.getElementById('fifth-stage-heal')
let fifthStageText = document.getElementById('fifth-stage-text')


const nextStage = (arg1, arg2) => {
    arg1.classList.remove(`${arg1.id}-visible`);
    arg1.classList.add('hide');
    arg2.classList.remove('hide');
    arg2.classList.add(`${arg2.id}-visible`)
}


//этап 1
let answer = (38 + 12 + 658 - 74) * 2;
const ckeckAsk = () => {
    if (inputFirstStage.value == answer) {
        askFirstStage.textContent = 
        'Вы ответили правильно. Переход на 2 этап...' ;
        setTimeout(() => {
            nextStage(firstStage, secondStage)
        }, 2000);
    } else {
        askFirstStage.textContent = 
        "Вы ошиблись. Попробуйте ещё раз";
    }
}

btnFirstStage.addEventListener('click', ckeckAsk)

//этап 2

const btn = () => {
    setTimeout(() => {
        nextStage(secondStage, thirdStage)
    }, 2000);
}

btnSecondStage.addEventListener('click', btn) 

//этап 3
const trueImg = () => {
    textThirdStage.textContent = "Это правильный ответ"
    setTimeout(() => {
        nextStage(thirdStage, fourthStage)
        thirdStage.classList.remove('third-stage-visible');
        thirdStage.classList.add('hide');
        fourthStage.classList.remove('hide');
        fourthStage.classList.add('fourth-stage-visible')   
    }, 2000);
}

const falseImg = () => {
    textThirdStage.textContent = "Это не Андора"
}

Img3ThirdStage.addEventListener('click', trueImg)
Img1ThirdStage.addEventListener('click', falseImg)
Img2ThirdStage.addEventListener('click', falseImg)
Img4ThirdStage.addEventListener('click', falseImg)

//этап 4
const askTrueBtn = () => {
    fourthStageText.textContent = 'Ураа! Ты нашёл нужный кирпич.'
    btnFourthStage.classList.remove('fourth-stage-btn')
    btnFourthStage.classList.add('fourth-stage-btn-active')
    setTimeout(() => {
        nextStage(fourthStage, fifthStage) 
    },2000);
}

btnFourthStage.addEventListener('click', askTrueBtn)

//этап 5
let hpMonster = 100;
let hpUser = 100;
const resetHp = (refresh) => {
    if (refresh) {
        fifthStageHpMonster.textContent = hpMonster;
        fifthStageHpUser.textContent = hpUser;
    } else {
        hpMonster = 100;
        hpUser = 100;
        fifthStageHpMonster.textContent = hpMonster;
        fifthStageHpUser.textContent = hpUser;
    }
}

resetHp(true);

const randomDamage = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const goAttack = () => {
    hpMonster -= randomDamage(10, 15)
    hpUser -= randomDamage(20, 30)
    resetHp(true);
    if (hpMonster <= 0) {
        fifthStageText.textContent = 'Поздравляю. Вы прошли игру.'
        fifthStageAttack.classList.add('hide')
        fifthStageHeal.classList.add('hide')
    }
    if (hpUser <= 0) {
        fifthStageText.textContent = 'К сожадению ты проиграл, но не расстраивайся, ты можешь попробовать снова.'
        fifthStageAttack.classList.add('hide')
        fifthStageHeal.classList.add('hide')
    }
}

const goHeal = () => {
    if ((hpUser + 20) < 100) {
        hpUser += 20;
    } else if ((hpUser + 20) > 100) {
        hpUser = hpUser + (20 - (hpUser+20 - 100))
    }
    fifthStageHpUser.textContent = hpUser;
}

fifthStageHeal.addEventListener('click', goHeal)
fifthStageAttack.addEventListener('click', goAttack)




const isVictory = (argCells) => {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let comb of combs) {
        if (argCells[comb[0]].textContent == argCells[comb[1]].textContent && 
            argCells[comb[1]].textContent == argCells[comb[2]].textContent && 
            argCells[comb[0]].textContent != ""
        ) {
            return true;
        } 
    }

};

const start = (argCells) => {
    let i = 0;
    for(let cell of argCells) {
        cell.addEventListener('click', function turn () {

            cell.textContent = ['X', '0'][i % 2];
            cell.removeEventListener('click', turn)
            if (isVictory(argCells)) {
                        ticTacToeStageAsk.textContent = `${cell.textContent} победил`
                    } else if (i == 8) {
                        ticTacToeStageAsk.textContent = `Ничья`
                    }
            i++;
        })
    }
}



//Старт игры

const startGame = () => {
    inputFirstStage.value = '';
    askFirstStage.textContent = '';
    textThirdStage.textContent = '';
    fourthStageText.textContent = '';
    fifthStageText.textContent = '';
    resetHp(false);
    fifthStageAttack.classList.remove('hide')
    fifthStageHeal.classList.remove('hide')
    btnFourthStage.classList.remove('fourth-stage-btn-active')
    btnFourthStage.classList.add('fourth-stage-btn')
    firstStage.classList.remove('hide')
    firstStage.classList.add('first-stage-visible')
    ticTacToeStage.classList.remove('tic-tac-toe-stage-visible')
    ticTacToeStage.classList.add('hide')
}

startBtn.addEventListener('click', startGame)


//Крестики нолики
const startTic = () => {
    cells.forEach(el => (el.textContent = ''))
    start(cells);
    ticTacToeStageAsk.textContent = 'Идёт игра...';

    const arrStage = [firstStage, thirdStage, thirdStage, fourthStage, fifthStage]
    arrStage.forEach(el => {
        console.log(el.classList[0])
        if(el.classList != 'hide') {
            el.classList.remove(el.classList[0])
            el.classList.add('hide')
        }
    })
    ticTacToeStage.classList.remove('hide')
    ticTacToeStage.classList.add('tic-tac-toe-stage-visible')
}
startTicTacToe.addEventListener('click', startTic)