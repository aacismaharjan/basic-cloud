export const executeOperation = (req, res) => {
  const { operation, a, b } = req.body;
  let result;

  switch (operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': result = a / b; break;
  }

  const response = { result };
  console.log(`Computed ${a} ${operation} ${b} = ${result}`);
  res.json(response);
};
