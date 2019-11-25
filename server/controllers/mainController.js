exports.getDefault = (req, res, next) => {
  const testObj = {
    number: 3,
    string: "Toto",
    date: new Date()
  };

  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(process.env));
};
