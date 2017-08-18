var inquirer = require("inquirer");
var study = require("./main.js");


var ClozeCard = function(text, cloze)
{
	this.text = text.toLowerCase();
	this.cloze = cloze.toLowerCase();
	this.partial = text.replace(cloze, "...").toLowerCase();
	//this function will ask the user the question on their flash card.
	this.playCard = function(study,i)
	{
		inquirer.prompt([
			{
				type: "input",
				message: this.partial,
				name: "guess",
				filter: function(str)
				{
					return str.toLowerCase();
				}
			}
		]).then(function(inqRes)
		{
			if(inqRes.guess === this.cloze)
			{
				console.log("that's correct");
				study(++i);
				return;
			}
			else
			{
				console.log("Nope");
				this.playCard(study, i);
			}
		}.bind(this));
	};
	//this ensures the cloze deletion is accurate. 
	this.isCloze = function()
	{
		var isCloze = new RegExp(this.cloze);
		return isCloze.test(this.text);
	}
}

module.exports = ClozeCard;
