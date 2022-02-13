


class Listr {

    constructor() {
        this.storagePrefix = 'listr_item_'
        document.addEventListener('DOMContentLoaded', this)
        document.addEventListener('keyup', this)
    }

    init() {
        this.itemStore = window.localStorage
        this.input = document.getElementById('todo')
        this.items = document.querySelector('.items')
        this.itemTemplate = document.getElementById('item-tpl').content

        this.loadItems().forEach(item => {
            this.addToDOM(item)
        })
    }

    newListr() {
        if (!this.input.value.length) {
            return
        }

        const item = {
            id: this.storagePrefix + Math.random().toString(36).substring(2, 9),
            text: this.input.value
        }
        this.input.value = ''

        this.itemStore.setItem(item.id, item.text)
        this.addToDOM(item)
    }

    addToDOM(item) {
        const itemNode = this.itemTemplate.cloneNode(true).firstElementChild
        itemNode.querySelector('.note').innerText = item.text
        itemNode.setAttribute('data-id', item.id)

        this.items.prepend(itemNode)
        this.items.querySelectorAll('.item').forEach(item => {
            item.classList.remove('animation')
            item.offsetHeight;
            item.classList.add('animation')
        })
    }

    loadItems() {
        let items = []
        for (let i = 0; i < this.itemStore.length; i++) {
            let key = this.itemStore.key(i)
            if (key.startsWith(this.storagePrefix)) {
                items.push({
                    id: key,
                    text: this.itemStore.getItem(key)
                })
            }
        }
        return items
    }

    removeItem(item) {
        this.itemStore.removeItem(item.parentElement.getAttribute('data-id'))
        item.parentElement.classList.remove('animation')
        item.parentElement.classList.add('animation-fadeOut')
        setTimeout(() => { item.parentElement.remove() }, 300)
    }

    handleEvent(e) {
        switch (e.type) {
            case 'DOMContentLoaded':
                this.init()
                break
            case 'keyup':
                if (e.key === 'Enter') {
                    this.newListr()
                }
                break
            default:
                console.log('Listr EventHandler: ', e)
        }
    }
}


const app = new Listr()
