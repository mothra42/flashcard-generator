inquirer = require("inquirer");
ClozeCard = require("./ClozeCard");
BasicCard = require("./BasicCard");

var cards = [];

function createCards()
{
	if(cards.length === 10)
	{
		return study(0);
	}
	inquirer.prompt([
			{
				type: "list",
				message: "Do you want a cloze card or a basic card?",
				choices: ["Cloze", "Basic"],
				name: "typeCard"
			}
		]).then(function(inqRes)
		{
			if(inqRes.typeCard === "Cloze")
			{
				console.log("what is up?");
				inquirer.prompt([
						{
							type: "input",
							message: "please enter the full text of your card.",
							name: "fullText"
						},
						{
							type: "input",
							message: "please enter the part of the sentence that is the cloze deletion.",
							name: "clozeDeletion"
						}
					]).then(function(inqRes)
					{
						var cloze = new ClozeCard(inqRes.fullText, inqRes.clozeDeletion);
						if(cloze.isCloze())
						{
						cards.push(cloze);
						createCards();
						}
						else
						{
								console.log("that was not a valid Cloze Card")
								createCards();
						}
					});
			}
			if(inqRes.typeCard === "Basic")
			{
				inquirer.prompt([
						{
							type: "input",
							message: "please enter your question.",
							name: "frontText"
						},
						{
							type: "input",
							message: "please enter your answer.",
							name: "backText"
						}
					]).then(function(inqRes)
					{
						var basic = new BasicCard(inqRes.frontText, inqRes.backText);
						cards.push(basic);
						createCards();
					});
			}
		});
}

createCards();

//I'm aware this breaks because of asynchronus issues. See my note in BasicCard.js.
function study(i)
{
	if(i === 10)
	{
		return console.log("you're done studying");
	}
	cards[i].playCard(study,i);
}

//alternate study function
// function study(i)
// {
// 	if(i === 2)
// 	{
// 		return console.log("you're done studying");
// 	}
// 	cards[i].playCard.then(function(full)
// 	{
// 		study(++i);
// 	});
// }
module.exports = study;
