// import plays from "./plays.json" assert { type: "json" };
// import invoices from "./invoices.json" assert { type: "json" };

const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

const invoices = 
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "adudience": 55
            },
            {
                "playID": "as-like",
                "adudience": 35
            },
            {
                "playID": "othello",
                "adudience": 40
            }
        ]
    }


function statement(invoices, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;

    let result = `Statement for ${invoices.customer}\n`;
    const format = new Intl.NumberFormat("En-US",
                            {style: "currency", currency: "USD",
                            minimumFractionDigits: 2}).format;
    
    console.log(invoices)

    for (let perf of invoices.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;

                if (perf.adudience > 30) {
                    thisAmount += 1000 * (perf.adudience - 30);
                }

                break;

            case "comedy":
                thisAmount = 30000;

                if (perf.adudience > 20) {
                    thisAmount += 10000 + 500 * (perf.adudience - 20);
                }

                thisAmount += 300 * perf.adudience;
                break;

            default: 
                throw new Error(`unknown type: ${play.type}`);
        }

        volumeCredits += Math.max(perf.adudience - 30, 0);

        if ("comedy" === play.type) volumeCredits += Math.floor(
            perf.adudience / 5);

        result += ` ${play.name}: ${format(thisAmount / 100)}`;
        result += ` (${perf.adudience} seats) \n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You erned ${volumeCredits} credits\n`;
    return result;
}

console.log(statement(invoices, plays));