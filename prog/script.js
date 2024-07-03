const formClima = document.querySelector('.formulárioClima');
const cidadeInput = document.querySelector('.cidadeInput');
const container = document.querySelector('.container');
const API_KEY = 'afcdedcfa89781a5cf3eec3746755cf4';

formClima.addEventListener('submit', async event => {
    event.preventDefault();
    const cidade = cidadeInput.value;
    
    if (cidade) {
        try {
            const dadosClimas = await buscarClima(cidade);
            informações(dadosClimas);
        } catch (error) {
            console.error(error);
            verificaErro(error.message);
        }
    } else {
        verificaErro('Por favor, digite a cidade!');
    }
});

async function buscarClima(cidade) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&lang=pt_br`;
    const resposta = await fetch(apiUrl);

    if (!resposta.ok) {
        throw new Error('Não foi possível buscar os dados!');
    }
    return await resposta.json();
}

function informações(info) {
    const { name: cidade, main: { temp: tempo, humidity: umidade }, weather: [{ description, id }] } = info;
    
    const cidadeDisplay = document.createElement('h1');
    const tempoDisplay = document.createElement('p');
    const umidadeDisplay = document.createElement('p');
    const descriçãoDisplay = document.createElement('p');
    const climaEmoji = document.createElement('p');

    cidadeDisplay.textContent = cidade;
    tempoDisplay.textContent = `${(tempo - 273.15).toFixed(1)}°C`;
    umidadeDisplay.textContent = `Umidade: ${umidade}%`;
    descriçãoDisplay.textContent = description;
    climaEmoji.textContent = emoji(id)
  
    cidadeDisplay.classList.add('cidade');
    tempoDisplay.classList.add('temperatura');
    umidadeDisplay.classList.add('umidade');
    descriçãoDisplay.classList.add('desc');
    climaEmoji.classList.add('emoji');
    
    container.innerHTML = ''; // Limpar container antes de adicionar novos elementos
    container.appendChild(cidadeDisplay);
    container.appendChild(tempoDisplay);
    container.appendChild(umidadeDisplay);
    container.appendChild(descriçãoDisplay);
    container.appendChild(climaEmoji);

    container.style.display = 'flex'; // Tornar o container visível
}

function emoji(tempoId) {
    switch(true){
        case (tempoId >= 200 && tempoId < 300):
            return '⛈️';
        case (tempoId >= 300 && tempoId < 400):
            return '🌧️';
        case (tempoId >= 500 && tempoId < 600):
            return '🌧️';
        case (tempoId >= 600 && tempoId < 700):
            return '❄️';

        case (tempoId >= 700 && tempoId < 800):
            return '🌫️';

        case (tempoId === 800):
            return '☀️';
        case (tempoId >= 801 && tempoId < 810):
            return '🌥️';

        default:
            return '⁉'
    }
}

function verificaErro(mensagem) {
    const erro = document.createElement('p');
    erro.innerText = mensagem;
    erro.classList.add('erro');

    container.innerHTML = ''; // Corrigido para innerHTML para limpar corretamente
    container.style.display = 'flex';
    container.appendChild(erro);
}