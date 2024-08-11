let gamelist = []

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

function hideAll() {
  document.getElementById('resumeButton').style.display = 'none';
}
async function initialize() {
  if (window.localStorage['gamelist']) {
    if (!window.confirm('Saved progress detected. Are you sure you want to start over?')) {
      return;
    }
  }
  let keys = await Object.keys(library)
  gamelist = gamelist.concat(keys)
  if (gamelist.length < 2) {
    window.alert('You need to provide more than 2 games.')
    return;
  }
  this.hideAll()
  this.start();
  document.getElementById('fldMiddleB').setAttribute("onClick", "undo()");
}
