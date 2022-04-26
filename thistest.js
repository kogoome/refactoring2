// const test = {
//   prop: 42,
//   func: function() {
//     return this.prop;
//   },
// };
const test = {
  prop: 42,
  func: () => {
    return this
  },
};

console.log(test.func() === global);
