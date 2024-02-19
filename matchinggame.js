const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');

// current phrase being dragged
let selectedId;

// target phrase
let dropTargetId;

// counter for correct phrases
let matchingCounter = 0;

addEventListeners();

function dragStart() {
  selectedId = this.id;
  // console.log(this.id)
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(ev) {
  ev.preventDefault();
}

function dragDrop() {
  dropTargetId = this.id;
  // console.log(this.id)

  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
    //console.log("Match!")
  } else if (checkForMatch2(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
    //console.log("Match!")
  }

  if (matchingCounter === 5) {
    endMessage.style.display = 'block';
  }

  this.classList.remove('over');
}

function checkForMatch(selected, dropTarget) {
  switch (selected) {
    case 'v1':
      return dropTarget === 'd1' ? true : false;

    case 'v2':
      return dropTarget === 'd2' ? true : false;

    case 'v3':
      return dropTarget === 'd3' ? true : false;

    case 'v4':
      return dropTarget === 'd4' ? true : false;

    case 'v5':
      return dropTarget === 'd5' ? true : false;

    default:
      return false;
  }
}

function checkForMatch2(selected, dropTarget) {
  switch (selected) {
    case 'd1':
      return dropTarget === 'v1' ? true : false;

    case 'd2':
      return dropTarget === 'v2' ? true : false;

    case 'd3':
      return dropTarget === 'v3' ? true : false;

    case 'd4':
      return dropTarget === 'v4' ? true : false;

    case 'd5':
      return dropTarget === 'v5' ? true : false;

    default:
      return false;
  }
}

function addEventListeners() {
  draggableListItems.forEach (item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
  })
}
