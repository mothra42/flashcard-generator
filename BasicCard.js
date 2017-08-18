var inquirer = require("inquirer");
var study = require("./main.js");

var BasicCard = function(front, back)
{
	this.front = front.toLowerCase();
	this.back = back.toLowerCase();
	this.playCard = function(study,i)
	{
		inquirer.prompt([
			{
				type: "input",
				message: this.front,
				name: "guess",
				filter: function(str)
				{
					return str.toLowerCase();
				}
			}
		]).then(function(inqRes)
		{
			if(inqRes.guess === this.back)
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
}

module.exports = BasicCard;
