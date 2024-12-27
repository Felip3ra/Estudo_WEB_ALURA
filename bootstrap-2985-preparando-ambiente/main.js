const inputCheck = document.querySelector('#modo-noturno')
const elementoBody = document.querySelector('body')

inputCheck.addEventListener('click',() => {
    const modo = inputCheck.checked ? 'dark' : 'light'
    elementoBody.setAttribute("data-bs-theme",modo)
})