// Função para formatar números com zero à esquerda
function pad(num) {
    return num < 10 ? '0' + num : num;
}

// Função para gerenciar a troca de abas
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    // Limpa os resultados e erros ao trocar de aba
    hideResult();
}

// Função para exibir resultados
function displayResult(dist, time, pace, speed) {
    document.getElementById('resultDistance').textContent = `${dist.toFixed(2)} km`;
    document.getElementById('resultTime').textContent = `${pad(time.h)}:${pad(time.m)}:${pad(time.s)}`;
    document.getElementById('resultPace').textContent = `${pad(pace.m)}:${pad(pace.s)} min/km`;
    document.getElementById('resultSpeed').textContent = `${speed.toFixed(2)} km/h`;

    document.getElementById('result-section').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
}

// Função para ocultar resultados e erros
function hideResult() {
     document.getElementById('result-section').style.display = 'none';
     document.getElementById('error-message').style.display = 'none';
}

// Função para exibir erros
function displayError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
}

// Função para limpar os campos de um formulário
function clearFields(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset(); // Reseta todos os campos do formulário
    }
    hideResult(); // Oculta a seção de resultados e erros
}


// Função principal para calcular Pace e Velocidade
function calculatePace() {
    const distance = parseFloat(document.getElementById('distance1').value);
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (isNaN(distance) || distance <= 0) {
        displayError("Por favor, insira uma distância válida.");
        return;
    }
    if (hours > 23 || minutes > 59 || seconds > 59) {
        displayError("Por favor, insira valores de tempo válidos.");
        return;
    }

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds <= 0) {
         displayError("O tempo total deve ser maior que zero.");
        return;
    }

    // Calcular Pace
    const paceInSeconds = totalSeconds / distance;
    const paceMinutes = Math.floor(paceInSeconds / 60);
    const paceSeconds = Math.round(paceInSeconds % 60);

    // Calcular Velocidade Média
    const speed = distance / (totalSeconds / 3600);
    
    displayResult(
        distance,
        { h: hours, m: minutes, s: seconds },
        { m: paceMinutes, s: paceSeconds },
        speed
    );
}

// Função principal para calcular Tempo Total e Velocidade
function calculateTime() {
    const distance = parseFloat(document.getElementById('distance2').value);
    const paceMinutes = parseInt(document.getElementById('paceMinutes').value) || 0;
    const paceSeconds = parseInt(document.getElementById('paceSeconds').value) || 0;

    if (isNaN(distance) || distance <= 0) {
        displayError("Por favor, insira uma distância válida.");
        return;
    }
    if (paceMinutes > 59 || paceSeconds > 59) {
        displayError("Por favor, insira valores de pace válidos.");
        return;
    }

    const paceInSeconds = (paceMinutes * 60) + paceSeconds;
    if (paceInSeconds <= 0) {
        displayError("O pace deve ser maior que zero.");
        return;
    }

    // Calcular Tempo Total
    const totalSeconds = paceInSeconds * distance;
    const totalHours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const totalMinutes = Math.floor(remainingSecondsAfterHours / 60);
    const finalSeconds = Math.round(remainingSecondsAfterHours % 60);

    // Calcular Velocidade Média
    const speed = 3600 / paceInSeconds;

    displayResult(
        distance,
        { h: totalHours, m: totalMinutes, s: finalSeconds },
        { m: paceMinutes, s: paceSeconds },
        speed
    );
}
