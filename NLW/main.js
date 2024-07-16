// bibliotecas e códigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMM'),
        hora: dayjs(data).format('HH:mm')
    }
}


//object
const atividade = {
    nome: 'Almoço',
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

// array
let atividades= [
    atividade,
    {
        nome: 'Academia',
        data: new Date("2024-07-09 11:00"),
        finalizada: false
    },
    {
        nome: 'Treino',
        data: new Date("2024-06-09 12:00"),
        finalizada: true
    },
]



//arrow function
const criarItemdeAtividade = (atividade) => {
    let input = `<input 
    onchange= "salvarAtividade(event)"
    value="${atividade.data}"
    type="checkbox" `
    
    if(atividade.finalizada){
      input += 'checked'
    }

    input += '>'
    
    const formatar = formatador(atividade.data);
    
    return `
    <div class= "card-bg">
                ${input}

                <div>
                    <img class= "active" src="./assets/check.svg" alt="">

                    <img class= "inactive" src="./assets/no-check.svg" alt="">
                    <span> ${atividade.nome} </span>
                </div> 
                    
                <time class= "short">
                    ${formatar.dia.semana.curto}.
                    ${formatar.dia.numerico} <br>
                    ${formatar.hora}
                </time>
                <time class= "full"> ${formatar.dia.semana.longo}, 
                dia ${formatar.dia.numerico}
                de ${formatar.mes}
                às ${formatar.hora}h </time>
            </div>`
}

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')

    section.innerHTML = ''

    //verifica se a lista está vazia
    if(atividades.length == 0){
        section.innerHTML = `<p>Não há nenhuma tarefa cadastrada</p>`
        return
    }
    
    for(let atividade of atividades){
        section.innerHTML += criarItemdeAtividade(atividade)
    }
}
 
atualizarListaDeAtividades()


const salvarAtividade = (event) =>{
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste){
        return alert('Dia/Hora não disponíveis')
    }

    atividades= [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]


let diasSelecao = ''

for(let dia of dias){
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de
    ${formatar.mes}
    `

    diasSelecao += `
    <option value='${dia}'>${diaFormatado}</option> 
    `
}

document.querySelector('select[name="dia"]').innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''
    
    for(let i = 6; i < 23; i++){
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}">${hora}:00</option>`
        
        horasDisponiveis += `<option value="${hora}">${hora}:30</option>`    
    }
    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataInput
    })

    if(!atividade){
        return
    }

    atividade.finalizada = !atividade.finalizada
} 
