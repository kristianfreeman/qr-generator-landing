const reader = new FileReader()
const input = document.querySelector('#string')

const generate = () => {
  if (input.value) {
    if (input.value.length > 2953) {
      document.querySelector('#error').innerHTML = 'too much data!'
      return
    } else {
      document.querySelector('#error').innerHTML = ''
    }

    fetch('https://qr.signalnerve.com/generate', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ text: input.value }),
    }).then(resp => {
      document.querySelector('#display').innerHTML = ''
      const img = document.createElement('img')
      const imageContentType = resp.headers.get('Content-Type')
      resp.blob().then(blob => {
        window.image_data = blob
        const url = URL.createObjectURL(blob)
        img.src = url
        document.querySelector('#display').appendChild(img)
      })
    })
  }
}

input.value = 'https://workers.dev'
generate()
document.querySelector('button#generate').addEventListener('click', () => generate())
