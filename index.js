Array(10)
  .fill()
  .map((undef, index) => index + 1)
  .map(value => value % 3 ? value : '🤔')
  .forEach(value => console.log(value));
