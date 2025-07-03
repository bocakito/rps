        const ratio = {
            wins: 0,
            losses: 0,
            ties: 0
        }
        const computerMoveParagraph = document.querySelector('#ComputerMove');
        const btnReset = document.querySelector('#btnReset');
        const btnRock = document.querySelector('#btnRock');
        const btnPaper = document.querySelector('#btnPaper');
        const btnScissors = document.querySelector('#btnScissors');
        const wins = document.querySelector('#wins');
        const losses = document.querySelector('#losses');
        const ties = document.querySelector('#ties');
        btnRock.addEventListener('click', () => playGame('Rock'));
        btnPaper.addEventListener('click', () => playGame('Paper'));
        btnScissors.addEventListener('click', () => playGame('Scissors'));
        btnReset.addEventListener('click', () => updateScoreboard());
        console.log(btnReset);
        function pickPCMove(){
            const randNum = Math.random();
            
            if (randNum < 0.33) {
                return 'Rock';
            } else if (randNum < 0.66) {
                return 'Paper';
            } else {
                return 'Scissors';
            }
        }
        function playGame(playerMove = ''){
            let computerMove = pickPCMove();
            let result = '';

            if (playerMove === 'Scissors'){
                if (computerMove === 'Scissors'){
                    result = 'TIE';
                }else if (computerMove === 'Rock'){
                    result = 'LOSE';
                }else {
                    result = 'WIN';
                }
            }
            if (playerMove === 'Rock'){
                if (computerMove === 'Scissors'){
                    result = 'WIN';
                }else if (computerMove === 'Rock'){
                    result = 'TIE';
                }else {
                    result = 'LOSE';
                }
            }if (playerMove === 'Paper'){
                if (computerMove === 'Scissors'){
                    result = 'LOSE';
                }else if (computerMove === 'Rock'){
                    result = 'WIN';
                }else {
                    result = 'TIE';
                }
            }
            //computerMoveParagraph.textContent = `Computer chose: ${computerMove}. You ${result}!`;
            loadingFunc(result, computerMove);
            setTimeout(() => {
                if (result === 'LOSE'){
                ratio.losses+=1
                losses.textContent = `Losses: ${ratio.losses}`;
            }else if (result === 'WIN'){
                ratio.wins+=1;
                wins.textContent = `Wins: ${ratio.wins}`;
            }else{
                ratio.ties+=1;
                ties.textContent = `Ties: ${ratio.ties}`;   
            };
                jumpyjump(result);
            },5250)
        }
        function updateScoreboard() {
            if(ratio.wins + ratio.losses + ratio.ties !== 0){
                ratio.wins = 0;
                ratio.losses = 0;
                ratio.ties = 0;
                wins.textContent = `Wins: ${ratio.wins}`;
                losses.textContent = `Losses: ${ratio.losses}`;
                ties.textContent = `Ties: ${ratio.ties}`;
                computerMoveParagraph.classList.add('jump');
                setTimeout(() => {
                    computerMoveParagraph.classList.remove('jump');
                }, 1000);
                computerMoveParagraph.textContent = 'Your score has been reset.';
            }else{
                computerMoveParagraph.classList.add('jump');
                setTimeout(() => {
                    computerMoveParagraph.classList.remove('jump');
                }, 1000);
                computerMoveParagraph.textContent = 'Score is zero.';
            }
        }
        const jumpyjump = (result = '') => {
            if(result === 'WIN'){
                wins.classList.add('jump');
                setTimeout(() => {
                    wins.classList.remove('jump');
                }, 200);
            }else if (result === 'LOSE'){
                losses.classList.add('jump');
                setTimeout(() =>{
                    losses.classList.remove('jump')
                }, 200)
            }else if (result === 'TIE'){
                ties.classList.add('jump');
                setTimeout(() => {
                    ties.classList.remove('jump');
                }, 200);
            }
        }
        let isAnimating = false;
        const playButtons = document.querySelectorAll('.playButton');
        const resetContainer = document.querySelector(".resetContainer");
        const observer = new MutationObserver(() => {
            const resetContainerText = resetContainer.textContent;
            if(resetContainerText.length > 0 && !isAnimating){
                isAnimating = true;
                observer.disconnect();
                setTimeout(() => {
                    btnReset.classList.add('moveBtnReset');
                }, 100);
                console.log('class added');
                console.log(btnReset.classList)
                resetContainer.classList.add('expand');
                    playButtons.forEach(btn => {
                        btn.disabled = true;
                    });
                setTimeout(() =>{
                    setTimeout(() => {
                        btnReset.classList.remove('moveBtnReset');
                    }, 50);
                    console.log('class removed');
                    console.log(btnReset.classList)
                    resetContainer.classList.remove('expand');
                    computerMoveParagraph.textContent = '';
                    playButtons.forEach(btn => {
                        btn.disabled = false;
                        console.log("btn enabled");
                        console.log(btnReset.disabled)
                    });
                    isAnimating = false;
                    observer.observe(resetContainer, {
                        childList: true,
                        subtree: true,
                        characterData: true
                    })
                }, 9000);
            }
        })
        observer.observe(resetContainer, {
            childList: true,
            subtree: true,
            characterData: true
        })
        const loadingFunc = (result, computerMove) =>{
            let i = 0;
            const loadingQstnMarks = ['?', '??', '???'];
            computerMoveParagraph.textContent = `Computer chose: ${loadingQstnMarks[i]}`
            i++;
            const interval = setInterval(() => {
                computerMoveParagraph.textContent = `Computer chose: ${loadingQstnMarks[i]}`
                i = (i + 1) % loadingQstnMarks.length; 
            },1750)
            setTimeout(() => {
                clearInterval(interval);
                computerMoveParagraph.textContent = `Computer chose: ${computerMove}. You ${result}`;
                console.log('question mark used')
            }, 5250)
        }