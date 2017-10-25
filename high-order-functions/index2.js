// const foo = printOnScreen(getDataForCurrentUser(processData(data)));
// const ourWidget =
//   compose(makeDraggable, addDecoration)(renderWidget);
// вызвать функцию renderWidget,  передав туда все аргументы args,
// и потом результат renderWidget  передам в addDecoration  и тот результат в makeDraggable

// function showFullName(firstPart, lastPart) {
//   console.log(this[firstPart] + ' ' + this[lastPart]);
// }

// var user = {
//   firstName: 'Василий',
//   surname: 'Петров',
//   patronym: 'Иванович',
// };

// showFullName.call(user, 'firstName', 'surname');

function printArgs() {
  var join = [].join;
  console.log(join);
  var argStr = join.call(arguments, ':');
  console.log(argStr);
}
printArgs(1, 2, 3);
