// calculations.js

function calculateAverage(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, value) => acc + Number(value), 0);
    return sum / values.length;
  }
  
  function calculateRegionAverages(regionAgents) {
    const ratings = regionAgents.map(agent => agent.rating);
    const fees = regionAgents.map(agent => agent.fee);
  
    const avgRating = calculateAverage(ratings);
    const avgFee = calculateAverage(fees);
  
    return {
      average_rating: avgRating.toFixed(2),
      average_fee: avgFee.toFixed(2)
    };
  }
  
  function calculateEle(apartmentNumber, floorsNumber) {
    const ratioApt = Math.ceil(apartmentNumber) / Math.ceil(floorsNumber);
    
    const regBanks = Math.ceil(ratioApt / 6);
    const extraBanks = Math.ceil(floorsNumber / 20);
    const elevatorsNeeded = Math.ceil(regBanks * extraBanks);
    return elevatorsNeeded;
}

function getCost(tier, floorsNumber, apartmentNumber, standard_price, premium_price, exelium_price, standard_fee, premium_fee, exelium_fee) {
    if (tier === "standard") {
        const elevatorsNeeded = calculateEle(apartmentNumber, floorsNumber);

        const installationFeepercent = elevatorsNeeded * standard_price * standard_fee;
        const finalcost = elevatorsNeeded * standard_price + installationFeepercent;
        return finalcost;
    } else if (tier === "premium") {
        const elevatorsNeeded = calculateEle(apartmentNumber, floorsNumber);

        const installationFeepercent = elevatorsNeeded * premium_price * premium_fee;
        const finalcost = elevatorsNeeded * premium_price + installationFeepercent;
        return finalcost;
    } else if (tier === "exelium") {
        const elevatorsNeeded = calculateEle(apartmentNumber, floorsNumber);

        const installationFeepercent = elevatorsNeeded * exelium_price * exelium_fee;
        const finalcost = elevatorsNeeded * exelium_price + installationFeepercent;
        return finalcost;
    }
}

module.exports = {
    calculateEle,
    getCost
};
