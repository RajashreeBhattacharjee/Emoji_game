document.addEventListener("DOMContentLoaded", function() {
    const emojis = ["🐍", "🌊", "🔥"];
    const emojiButtons = document.querySelectorAll(".choice");
    const refreshButton = document.getElementById("refreshButton");
    const resultParagraph = document.getElementById("result");
    const rulesParagraph = document.getElementById("rules");
    const userScoreParagraph = document.getElementById("userScore");
    const computerScoreParagraph = document.getElementById("computerScore");

    let userScore = 0;
    let computerScore = 0;

    emojiButtons.forEach(button => {
        button.addEventListener("click", function() {
            const userEmoji = this.textContent;
            const computerEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            const result = determineWinner(userEmoji, computerEmoji);
            resultParagraph.textContent = `Computer chose ${computerEmoji}. ${result.message}`;
            rulesParagraph.textContent = `Rule: ${result.rule}`;
            updateScore(result);
        });
    });

    refreshButton.addEventListener("click", function() {
        resultParagraph.textContent = "";
        rulesParagraph.textContent = "";
        userScore = 0;
        computerScore = 0;
        userScoreParagraph.textContent = userScore;
        computerScoreParagraph.textContent = computerScore;
    });

    function determineWinner(userEmoji, computerEmoji) {
        const rules = {
            "🐍🌊": "Snake can swim in water.",
            "🌊🔥": "Water can extinguish fire.",
            "🔥🐍": "Fire can burn snake."
        };
        const key = userEmoji + computerEmoji;
        const message = determineResultMessage(userEmoji, computerEmoji);
        return { message, rule: rules[key] || "No specific rule. It's a draw!" };
    }

    function determineResultMessage(userEmoji, computerEmoji) {
        if (
            (userEmoji === "🐍" && computerEmoji === "🌊") ||
            (userEmoji === "🌊" && computerEmoji === "🔥") ||
            (userEmoji === "🔥" && computerEmoji === "🐍")
        ) {
            return "You win!";
        } else if (
            (userEmoji === "🌊" && computerEmoji === "🐍") ||
            (userEmoji === "🔥" && computerEmoji === "🌊") ||
            (userEmoji === "🐍" && computerEmoji === "🔥")
        ) {
            return "Computer wins!";
        } else {
            return "It's a draw!";
        }
    }

    function updateScore(result) {
        if (result.message.includes("win")) {
            if (result.message.includes("You")) {
                userScore++;
                userScoreParagraph.textContent = userScore;
            } else {
                computerScore++;
                computerScoreParagraph.textContent = computerScore;
            }
        }
    }
});
