"use strict";

class Customer {
  constructor(data, movies){
    this._data = data;
    this._movies = movies;
  }

  get name(){return this._data.name;}
  get rentals() {return this._data.rentals.map(r => new Rental(r, this._movies))};
  get totalFrequentRenterPoints() {
     return this.rentals.map(r => r.frequentRenterPoints).reduce((a, b) => a + b);
  }
  get totalAmount() {
      return this.rentals.reduce((total, r) => total + r.amount, 0 );
  }
}


class Rental{
  constructor(data, movies){
    this._data = data;
    this._movies = movies;
  }

  get days() {return this._data.days;}
  get movieID() {return this._data.movieID;}
  get movie() {return this._movies[this.movieID];}
  get frequentRenterPoints() {
      return (this.movie.code === "new" && this.days > 2) ? 2 : 1;
  }

    get amount() {
    let thisAmount = 0;

    switch (this.movie.code) {
        case "regular":
            thisAmount = 2;
            if (this.days > 2) {
                thisAmount += (this.days - 2) * 1.5;
            }
            break;
        case "new":
            thisAmount = this.days * 3;
            break;
    }
    return thisAmount;
}
}

function statement(customerArg, movies) {
  const customer = new Customer(customerArg, movies);

  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
      result += `\t${rental.movie.title}\t${rental.amount}\n`;
  }
    result += addFooterLines(customer.totalAmount, customer.totalFrequentRenterPoints);
    return result;

  function addFooterLines(totalAmount, totalFrequentRenterPoints){
    let result = "";
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;
    return result;
  }
}

function statementHtml(customerArg, movies) {
    const customer = new Customer(customerArg, movies);

    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    result += '<table>\n';
    for (let rental of customer.rentals) {
        result += `<tr><td>${rental.movie.title}</td><td>${rental.amount}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<p>Amount owed is<em>${customer.totalAmount}</em></p>\n`;
    result += `<p>You earned<em>${customer.totalFrequentRenterPoints}</em></p>\n`;
    return result;
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
console.log(statementHtml(customer, movies));