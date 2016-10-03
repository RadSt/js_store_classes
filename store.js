"use strict";

class Customer {
  constructor(data, movies){
    this._data = data;
    this._movies = movies;
  }

  get name(){return this._data.name;}
  get rentals() {return this._data.rentals.map(r => new Rental(r, this._movies));}
}

class Rental{
  constructor(data, movies){
    this._data = data;
    this._movies = movies;
  }

  get days() {return this._data.days;}
  get movieID() {return this._data.movieID;}
  get movie() {return this._movies[this.movieID];}
}

function statement(customerArg, movies) {
  const customer = new Customer(customerArg, movies);

  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
      result += `\t${rental.movie.title}\t${getAmount(rental)}\n`;
  }
  result += addFooterLines(getTotalAmount(customer), getFrequentTotalRenterPoints(customer));
  return result;

  function getAmount(rental){
    let thisAmount = 0;

    switch (rental.movie.code) {
          case "regular":
        thisAmount = 2;
        if (rental.days > 2) {
          thisAmount += (rental.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = rental.days * 3;
        break;
    }
    return thisAmount;
  }

    function getFrequentRenterPoints(rental){
      return (rental.movie.code === "new" && rental.days > 2) ? 2 : 1;
  }

  function addFooterLines(totalAmount, frequentTotalRenterPoints){
    let result = "";
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentTotalRenterPoints} frequent renter points\n`;
    return result;
  }

  function getTotalAmount(customer){
    let totalAmount = 0;
    for (let rental of customer.rentals) {

      totalAmount += getAmount(rental);
    }
    return totalAmount;
  }

  function getFrequentTotalRenterPoints(customer){
    let frequentTotalRenterPoints = 0;
    for (let rental of customer.rentals) {
      frequentTotalRenterPoints += getFrequentRenterPoints(rental);
    }
    return frequentTotalRenterPoints;
  }
}

let customer = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  }, ]
};

let movies = {
  "F001": {
    "title": "Ran",
    "code": "regular"
  },
  "F002": {
    "title": "Trois Couleurs: Bleu",
    "code": "regular"
  },
  // etc
};

console.log(statement(customer, movies));