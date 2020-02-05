const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const getDateString = function(dateOb) {
  const month = months[dateOb.getMonth()];
  const day = days[dateOb.getDay()];
  const date = dateOb.getDate();
  return `${month} ${date} ${day}`;
};

const getEachItemHtml = function(ext, deleteEnable, item) {
  const html = `<div class="${ext}eachItem" id="${item.id}">
  <div class="${ext}cardUntick">
  <div class="${ext}cardTick notVisible"></div>
  </div>
  <div class="${ext}itemName">${item.name}</div>`;
  if (deleteEnable) {
    return `${html}
    <div class="deleteLogo" id="${item.id}-d" onclick="deleteItem()"></div>
    </div>`;
  }
  return `${html}</div>`;
};

const getListHtml = function(list, mapper) {
  return list.map(mapper).join('');
};

const todoBox = function(res) {
  const date = getDateString(new Date(res.date));
  const listHtml = getListHtml(
    res.items,
    getEachItemHtml.bind(null, '', true)
  );
  return `<div class="heading">${res.title}</div>
      <div class="date">${date}</div>
      <div class="smallHorizontalLine"></div>
      <div class="itemList" id="${res.id}">
      ${listHtml}
        <input type="text" id="itemInput" onkeyup="takeItem(this)"
        placeholder="itemName" autofocus></input>
      </div>
      <button class="closeButton" onclick="closeCard()">close</button>`;
};

const titleHtml = `<div class="writeTitle">Write Title</div>
<input type="text" id="titleInput" autofocus/>
<button id="done" onclick="takeTitle()">Done</button>`;

const getEachTodoHtml = function(todo) {
  const items = getListHtml(
    todo.items,
    getEachItemHtml.bind(null, 'nonePointer todo-', false)
  );
  return `<div class="cardBox" id="${todo.id}-par" >
   <div class="todoCard" id="${todo.id}" onclick="getCardDetails()">
     <div class="todoCardTitle nonePointer">${todo.title}</div>
     ${items}
   </div>
   <div class="topTick"></div>
 </div>`;
};

const todoCards = function(res) {
  let div = '';
  const ids = Object.keys(res).reverse();
  ids.forEach(todo => {
    div += getEachTodoHtml(res[todo]);
  });
  return div;
};
