const list = document.querySelector('#list')

let prefix="/collaborative-movie-list/";

// Repopulate the list with an up to date version.
function refresh () {
  fetch(prefix + 'list?list=movies')
    .then(x => x.json())
    .then(y => {
      y.sort((a, b) => {
        return a.name > b.name
      })
      list.innerHTML = ''
      for (const item of y) {
        const d = document.createElement('div')
        d.innerText = item.name
        d.classList = 'list-item'
        if (item.tagged) {
          d.style.textDecoration = 'line-through'
        }
        d.onclick = e => {
          console.log(item)
          fetch(prefix + `toggle?list=movies&name=${item.name}`)
            .then(x => x.text())
            .then(y => {
              refresh()
            })
        }
        list.appendChild(d)
      }
    })
}

// Add an item to the list.
function addItem () {
  if (confirm('Would you like to add a item?')) {
    const item = prompt('What item do you want to add?')
    fetch(prefix + `add?list=movies&name=${item}`)
      .then(x => x.text())
      .then(y => {
        refresh()
      })
  }
}

refresh()
