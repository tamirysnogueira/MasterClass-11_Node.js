const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
    const api = await fetch("http://localhost:3000/").then((data) => data.json())
    
    api.urls.map(({name, url}) => addElement({name, url}))
}

load()

function addElement({ name, url }) {

    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, name, url)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

async function removeElement(el, name, url) {
    if (confirm('Tem certeza que deseja deletar?')){
        const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`).then((data) => data.json())

        if(String(res.message) === String('ok')){
            alert('URL deletada')
            el.parentNode.remove()
        } else {
            alert('Erro, não foi possível deletar')
        }
    }
        
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}`).then((data) => data.json())

    if(String(res.message) === String('ok')){
        alert('URL adicionada')
        addElement({ name, url })
    } else {
        alert('Erro, não foi possível adicionar')
    }
    
    input.value = ""
})