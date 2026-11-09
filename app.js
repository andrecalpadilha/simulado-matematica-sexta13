
let questoes = [];
let respostas = [];
let questaoAtual = 0;

const app = document.getElementById("app");
const botaoIniciar = document.getElementById("btn-iniciar");

// Carrega as questões do arquivo JSON
async function carregarQuestoes() {
    try {
        const resposta = await fetch("questoes.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as questões.");
        }

        questoes = await resposta.json();
        respostas = new Array(questoes.length).fill(null);

        botaoIniciar.addEventListener("click", iniciarSimulado);

    } catch (erro) {
        app.innerHTML = `
            <section id="inicio">
                <h2>Erro ao carregar o simulado</h2>
                <p>Verifique se o arquivo questoes.json está correto.</p>
            </section>
        `;
        console.error(erro);
    }
}

// Inicia a prova
function iniciarSimulado() {
    questaoAtual = 0;
    mostrarQuestao();
}

// Exibe a questão atual
function mostrarQuestao() {
    const questao = questoes[questaoAtual];

    let alternativasHTML = "";

    questao.alternativas.forEach(alternativa => {
        const marcada = respostas[questaoAtual] === alternativa.letra
            ? "checked"
            : "";

        alternativasHTML += `
            <label class="alternativa">
                <input
                    type="radio"
                    name="resposta"
                    value="${alternativa.letra}"
                    ${marcada}
                >
                <strong>${alternativa.letra})</strong>
                ${alternativa.texto}
            </label>
        `;
    });

    app.innerHTML = `
        <section class="questao">
            <div class="progresso">
                Questão ${questaoAtual + 1} de ${questoes.length}
            </div>

            <h3>${questao.tema}</h3>

            <p class="enunciado">${questao.enunciado}</p>

            <div class="alternativas">
                ${alternativasHTML}
            </div>

            <div class="navegacao">
                <button id="anterior"
                    ${questaoAtual === 0 ? "disabled" : ""}>
                    Anterior
                </button>

                ${
                    questaoAtual === questoes.length - 1
                    ? `<button id="finalizar">Finalizar simulado</button>`
                    : `<button id="proxima">Próxima</button>`
                }
            </div>
        </section>
    `;

    // Registra a alternativa selecionada
    document.querySelectorAll('input[name="resposta"]').forEach(input => {
        input.addEventListener("change", function() {
            respostas[questaoAtual] = this.value;
        });
    });

    // Voltar questão
    const botaoAnterior = document.getElementById("anterior");

    botaoAnterior.addEventListener("click", () => {
        if (questaoAtual > 0) {
            questaoAtual--;
            mostrarQuestao();
        }
    });

    // Avançar questão
    const botaoProxima = document.getElementById("proxima");

    if (botaoProxima) {
        botaoProxima.addEventListener("click", () => {
            if (respostas[questaoAtual] === null) {
                alert("Selecione uma alternativa antes de continuar.");
                return;
            }

            questaoAtual++;
            mostrarQuestao();
        });
    }

    // Finalizar prova
    const botaoFinalizar = document.getElementById("finalizar");

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", finalizarSimulado);
    }
}

// Calcula e apresenta o resultado
function finalizarSimulado() {
    if (respostas[questaoAtual] === null) {
        alert("Selecione uma alternativa antes de finalizar.");
        return;
    }

    const semResposta = respostas.filter(r => r === null).length;

    if (semResposta > 0) {
        alert(`Você ainda tem ${semResposta} questão(ões) sem resposta.`);
        return;
    }

    const confirmar = confirm("Deseja realmente finalizar o simulado?");

    if (!confirmar) return;

    let acertos = 0;

    questoes.forEach((questao, indice) => {
        if (respostas[indice] === questao.resposta) {
            acertos++;
        }
    });

    const erros = questoes.length - acertos;
    const nota = (acertos / questoes.length) * 10;

    mostrarResultado(acertos, erros, nota);
}

// Exibe a tela final e o gabarito
function mostrarResultado(acertos, erros, nota) {
    let revisaoHTML = "";

    questoes.forEach((questao, indice) => {
        const acertou = respostas[indice] === questao.resposta;

        revisaoHTML += `
            <div class="revisao">
                <h4>
                    Questão ${indice + 1} —
                    ${acertou ? "Acertou" : "Errou"}
                </h4>

                <p>Sua resposta: ${respostas[indice]}</p>
                <p>Resposta correta: ${questao.resposta}</p>
            </div>
        `;
    });

    app.innerHTML = `
        <section class="resultado">
            <h2>Simulado finalizado!</h2>

            <div class="pontuacao">
                <h3>Nota: ${nota.toFixed(1).replace(".", ",")}</h3>
                <p>Acertos: ${acertos}</p>
                <p>Erros: ${erros}</p>
                <p>Total de questões: ${questoes.length}</p>
            </div>

            <h3>Gabarito e revisão</h3>

            ${revisaoHTML}

            <button id="reiniciar">Refazer simulado</button>
        </section>
    `;

    document.getElementById("reiniciar").addEventListener("click", () => {
        respostas = new Array(questoes.length).fill(null);
        questaoAtual = 0;
        mostrarQuestao();
    });
}

// Inicia o carregamento
carregarQuestoes();
