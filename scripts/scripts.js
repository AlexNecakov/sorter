let charlist = []
let games = []

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

let current = 'top25'

function swap(key){
  document.getElementById(`${current}Img`).src = `./templates/temp_buttons/${current}.png`

  document.getElementById(`${key}Img`).src = `./templates/temp_buttons/${key}_sel.png`

   document.getElementById(`mainImg`).src = `./templates/${key}.png`

   current = key

}

function downloadTemplate(){
  var link = document.createElement('a');
  link.download = `${current}.png`;
  link.href = document.getElementById('mainImg').src
  link.id = 'template'
  document.body.appendChild(link);
link.click();
document.body.removeChild(link);

}

function toggleCollapsible(id) {
  let el = document.getElementById(id);
  el.classList.toggle("active");
  var content = el.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function startup() {
  document.getElementById('topTen').style.display = 'none';
  document.getElementById('resultcontainer').style.display = 'none';
}

function reset() {
  if (window.confirm("Do you want to start over? Your saved progress will be deleted.")) {
    window.location.reload();
    window.localStorage.clear()
  }
}

function portraitChoice(id1, id2, id3) {
  let cbox1 = document.getElementById(id1)
  if (cbox1.checked == false) {
    cbox1.checked = true
    return;
  }
  let cbox2 = document.getElementById(id2)
  cbox2.checked = !cbox1.checked;
  if (id3 != undefined) {
    let cbox3 = document.getElementById(id3)
    cbox3.checked = cbox2.checked
  }
}

function hideAll() {
  document.getElementById('resumeButton').style.display = 'none';
}
async function initialize() {
  if (window.localStorage['charlist']) {
    if (!window.confirm('Saved progress detected. Are you sure you want to start over?')) {
      return;
    }
  }
  charlist = [];
  let keys = await Object.keys(library)
  for (let i = 0; i < titlesArr.length; i++) {
      games.push(titlesArr[i])
      charlist = charlist.concat(keys.filter(key => library[key].origin.includes(titlesArr[i])))
  }
  this.applyFilters();
  if (charlist.length < 2) {
    window.alert('You need to select more than 2 characters.')
    return;
  }
  this.hideAll()
  this.start();
  document.getElementById('fldMiddleB').setAttribute("onClick", "undo()");
}

function portraitTagSelect(tag) {
  for (let i = 0; i < charlist.length; i++) {
    if (library[charlist[i]].tags.includes(tag)) {
      library[charlist[i]].portrait = tag;
    }
  }
}

function applyFilters() {
    charlist = this.shuffle(charlist)
  charlist = [...new Set(charlist)];
}
