var inquirer = require("inquirer");
var study = require("./main.js");

//need to add function if cloze is not part of card.
var ClozeCard = function(text, cloze)
{
	this.text = text.toLowerCase();
	this.cloze = cloze.toLowerCase();
	this.partial = text.replace(cloze, "...").toLowerCase();
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
	this.isCloze = function()
	{
		var isCloze = new RegExp(this.cloze);
		return isCloze.test(this.text);
	}
}

module.exports = ClozeCard;
