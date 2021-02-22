let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://aif-s3.aif.ru/images/018/624/ded4f53e7867f09b37f3f4d8d0c0a327.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://aif-s3.aif.ru/images/018/624/ded4f53e7867f09b37f3f4d8d0c0a327.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://aif-s3.aif.ru/images/018/624/ded4f53e7867f09b37f3f4d8d0c0a327.jpg'}
]

const toHTML = fruit =>
    `
                <div class="col">
                    <div class="card">
                        <img style="height: 300px;" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
                        <div class="card-body">
                            <h5 class="card-title">${fruit.title}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
                        </div>
                    </div>
                </div>`


function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на Товар',
    closable: true,
    width: '400px',
    footerBtns: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
        }}
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)


    if (btnType === 'price') {

        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()

        console.log(id, fruit)
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверенны?',
            content: `<p>Вы удаляете фрукт: ${fruit.title}</p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})