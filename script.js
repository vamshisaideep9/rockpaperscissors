function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    return getRandomInt(3) + 1;
}

function choiceName(choice) {
    switch (choice) {
        case 1: return 'rock';
        case 2: return 'paper';
        case 3: return 'scissor';
        default: return 'invalid';
    }
}

function parseHumanInput(input) {
    if (input === null) return null;
    const s = input.trim().toLowerCase();
   
    const n = parseInt(s, 10);
    if ([1, 2, 3].includes(n)) return n;
   
    if (s === 'rock') return 1;
    if (s === 'paper') return 2;
    if (s === 'scissor' || s === 'scissors') return 3;
    return NaN;
}

function getHumanChoice() {
    while (true) {
        const input = prompt("What do you want to play? rock(1), paper(2) or scissor(3)? (type 1/2/3 or the word)");
        if (input === null) return null; 
        const parsed = parseHumanInput(input);
        if ([1,2,3].includes(parsed)) return parsed;
        alert("Invalid input. Please enter 1, 2, 3, rock, paper, or scissor.");
    }
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === null) return { message: "Game cancelled by player.", winner: null };
    if (![1,2,3].includes(humanChoice) || ![1,2,3].includes(computerChoice)) {
        return { message: "Invalid choice.", winner: null };
    }

    if (humanChoice === computerChoice) {
        return { message: `Draw: both chose ${choiceName(humanChoice)}.`, winner: 'draw' };
    }

    const humanWins = ((humanChoice - computerChoice + 3) % 3) === 1;
    if (humanWins) {
        return { message: `You win: ${choiceName(humanChoice)} beats ${choiceName(computerChoice)}.`, winner: 'human' };
    } else {
        return { message: `Computer wins: ${choiceName(computerChoice)} beats ${choiceName(humanChoice)}.`, winner: 'computer' };
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    while (true) {
        const humanSelection = getHumanChoice();
        if (humanSelection === null) {
            console.log("Player cancelled the game.");
            break;
        }

        const computerSelection = getComputerChoice();
        const result = playRound(humanSelection, computerSelection);

        console.log(`Player: ${choiceName(humanSelection)} (${humanSelection}), Computer: ${choiceName(computerSelection)} (${computerSelection})`);
        console.log(result.message);

        if (result.winner === 'human') humanScore++;
        if (result.winner === 'computer') computerScore++;

        console.log(`Score — You: ${humanScore}, Computer: ${computerScore}`);

        const again = confirm("Play again?");
        if (!again) break;
    }
    console.log("Final Score — You:", humanScore, "Computer:", computerScore);
}

playGame();
