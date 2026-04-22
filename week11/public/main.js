window.onload = () => {
    // uses the imported socket library inside of the index.njk file to create our client web socket
    const socket = io()

    const form = document.getElementById('form')
    const input = document.getElementById('input')

    form.addEventListener('submit', (event) => {
        // stop the default action from happening which is refresh
        event.preventDefault()
        // emit sends a piece of data to our server
        // 1st parem: name of the event we are sending, this is customizable and can be whatever that is not connect or disconnect
        // 2nd parem: param: the data that we are sending
        socket.emit('silly note', input.value)

        input.value = '' // removes input text after submission
    })

    socket.on('server sent data', (dataFromServer) => {
        const item = document.createElement('p')
        item.textContent = dataFromServer
        const messages = document.getElementById('all-messages')
        messages.appendChild(item)
    })

    socket.on('client id', (dataFromServer) => {
        const p = document.getElementById('client-number')
        p.textContent = 'you are client number ' + dataFromServer
    })
}