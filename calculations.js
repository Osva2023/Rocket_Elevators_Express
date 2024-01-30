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
  
  module.exports = {
    calculateRegionAverages
  };
  