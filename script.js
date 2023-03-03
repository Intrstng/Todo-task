const createOrderedList = (arr) => {
  const orderedList = document.createElement('ol');
    document.body.prepend(orderedList);
    arr.forEach(item => {
      const orderedListItem = document.createElement('li');
      orderedListItem.textContent = item;
      orderedList.append(orderedListItem);
    })
}
createOrderedList(items);

const createInputField = () => {
  const inputForm = document.createElement('form');
  const textInput = document.createElement('input');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', 'inptext');
  textInput.className = 'input-text-main';
  inputForm.append(textInput);
  const btnInput = document.createElement('input');
  btnInput.setAttribute('type', 'button');
  btnInput.setAttribute('name', 'inpbtn');
  btnInput.value = 'Добавить запись в список';
  inputForm.append(btnInput);
  document.querySelector('ol').after(inputForm);
}
createInputField();

const createDeleteButton = () => {
  const deleteBtnInput = document.createElement('input');
  deleteBtnInput.className = 'del-item-btn';
  deleteBtnInput.setAttribute('type', 'button');
  deleteBtnInput.value = 'Удалить последнюю запись в списке';
  document.forms[0].after(deleteBtnInput);
}
createDeleteButton();

//По видео не до конца ясно: если по условию требуется, что основное текстовое поле может принять ввод значения ДО ТОГО КАК в нем появится placeholder с надписью "Введите значение", тогда испольуем эту первую функцию addItemInOrderedList,
//Если по условию требуется, что основное текстовое поле может принять ввод значения только ПОСЛЕ ТОГО как в нем появится placeholder с надписью "Введите значение" (т.е. со второго клика по кнопке "Добавить в список записок"), тогда испольуем вторую закоментированную функцию addItemInOrderedList (первую функцию тогда закоментировать вместо)
let isClickedAddBtn = false;
const addItemInOrderedList = () => {
  if ((!isClickedAddBtn || isClickedAddBtn) && document.forms[0].inptext.value.length > 0) {
    (document.querySelector('ol').children.length === 0 && (document.forms[0].inptext.value.length !== 0)) && document.querySelectorAll('input[type="button"]')[1].removeAttribute('disabled');
    if (document.forms[0].inptext.value.length > 0) {
      const newOrderedListItem = document.createElement('li');
      newOrderedListItem.classList.add('note');
      newOrderedListItem.textContent = document.forms[0].inptext.value;
      document.querySelector('ol').append(newOrderedListItem);
      document.forms[0].inptext.value = '';
      document.forms[0].inptext.placeholder = 'Введите значение';
            newOrderedListItem.addEventListener('click', changeInfoInOrderedListItem, {once: true});
    }
  return;
  } else if (!isClickedAddBtn) {
      document.forms[0].inptext.placeholder = 'Введите значение';
      isClickedAddBtn = true;
      return;
    }
}
    // const addItemInOrderedList = () => {
    //   if (!isClickedAddBtn) {
    //   document.forms[0].inptext.placeholder = 'Введите значение';
    //   isClickedAddBtn = true;
    //   return;
    // } else {
    //   (document.querySelector('ol').children.length === 0) && document.querySelectorAll('input[type="button"]')[1].removeAttribute('disabled');
    //   if (document.forms[0].inptext.value.length > 0) {
    //     const newOrderedListItem = document.createElement('li');
    //     newOrderedListItem.textContent = document.forms[0].inptext.value;
    //     document.querySelector('ol').append(newOrderedListItem);
    //     document.forms[0].inptext.value = '';
    //     newOrderedListItem.addEventListener('click', changeInfoInOrderedListItem, {once: true});
    //   }
    //   return;
    // }
    // }
document.forms[0].inpbtn.addEventListener('click', addItemInOrderedList); 

const removeItemFromOrderedList = () => {
  if (document.querySelector('ol').children.length < 0) {
    return;
  } else {
    if (document.querySelector('ol').children.length > 1) {
      document.querySelector('ol').lastElementChild.remove();
    } else if (document.querySelector('ol').children.length === 1) {
      document.querySelector('ol').lastElementChild.remove();
      document.querySelectorAll('input[type="button"]')[1].setAttribute('disabled', 'disabled');
    }
  }
}
document.querySelectorAll('input[type="button"]')[1].addEventListener('click', removeItemFromOrderedList);

const addHandlersToOrderedListItems = () => {
  [...document.getElementsByTagName('li')].forEach(item => item.addEventListener('click', changeInfoInOrderedListItem, {once: true}));
}
addHandlersToOrderedListItems()

function changeInfoInOrderedListItem(event) {
  const listItemInput = document.createElement('input');
  listItemInput.setAttribute('type', 'text');
  listItemInput.setAttribute('name', 'litext');
  listItemInput.setAttribute('value', event.target.textContent); //listItemInput.setAttribute('value', this.textContent);
  event.target.innerHTML = `${listItemInput.outerHTML}`; //this.innerHTML = `${listItemInput.outerHTML}`;
  event.target.firstElementChild.addEventListener('blur', saveInfoInOrderedListItem);
}

function saveInfoInOrderedListItem(event) {
  let targetParent = event.target.parentElement;
  event.target.parentElement.textContent = event.target.value;
  targetParent.addEventListener('click', changeInfoInOrderedListItem, {once: true});
}