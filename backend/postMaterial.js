fetch('http://localhost:4000/api/materials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "BOPP Laminado Brillante",
    type: "BASE",
    grammageGm2: 25,
    pricePerKg: 4.5,
    initialStockKg: 1000,
    wasteMarginPct: 5
  })
}).then(res => res.json()).then(console.log).catch(console.error);
