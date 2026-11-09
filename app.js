
let questoes = [];
let respostas = [];
let questaoAtual = 0;

const app = document.getElementById("app");
const botaoIniciar = document.getElementById("btn-iniciar");

// Dicas específicas das 16 questões
const dicas = [
    "Aplique o primeiro desconto e depois calcule o segundo sobre o novo preço.",
    "Some as horas dos três funcionários. Depois, descubra quanto corresponde a cada hora.",
    "Observe que a quantidade de combustível aumenta na mesma proporção da distância.",
    "Simplifique cada raiz antes de realizar a divisão.",
    "Lembre-se: 1 milhão é 10⁶ e 1 bilhão é 10⁹.",
    "Use a propriedade do quadrado da soma: (a + b)² = a² + 2ab + b².",
    "Na potência de potência, multiplique os expoentes. Não esqueça de elevar o coeficiente.",
    "Observe se cada expressão representa uma diferença de quadrados ou um trinômio quadrado perfeito.",
    "Identifique a taxa fixa e o valor cobrado por quilômetro.",
    "Substitua cada valor do domínio na função para encontrar a imagem.",
    "Distribua o sinal de menos para todos os termos do segundo parêntese.",
    "Lembre-se: o ângulo inscrito mede a metade do ângulo central que determina o mesmo arco.",
    "Use a semelhança de triângulos e monte uma proporção entre as alturas e as sombras.",
    "Utilize a relação métrica: cateto² = hipotenusa × projeção do cateto.",
    "Para o prisma, calcule área da base × altura. Para o cilindro, use π × raio² × altura.",
    "Transforme a quantidade de respostas em fração e depois em porcentagem."
];

// Carrega as questões
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

// Inicia o jogo
function iniciarSimulado() {
    questaoAtual = 0;
    mostrarQuestao();
}

// Mostra a questão
function mostrarQuestao() {
    const questao = questoes[questaoAtual];
    const porcentagem = ((questaoAtual + 1) / questoes.length) * 100;

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
                <span>FASE ${questaoAtual + 1} / ${questoes.length}</span>
                <span>${Math.round(porcentagem)}% concluído</span>
            </div>

            <div style="
                background:#34365d;
                height:10px;
                border-radius:10px;
                margin-bottom:25px;
                overflow:hidden;">
                <div style="
                    width:${porcentagem}%;
                    height:100%;
                    background:linear-gradient(90deg,#8b5cf6,#22d3ee);
                    transition:width 0.4s;">
                </div>
            </div>

            <h3>${questao.tema}</h3>

            <p class="enunciado">${questao.enunciado}</p>

            <div class="alternativas">
                ${alternativasHTML}
            </div>

            <div style="margin-top:22px;">
                <button id="btn-dica" type="button">
                    💡 Pedir uma dica
                </button>

                <div id="area-dica" style="
                    display:none;
                    background:#292348;
                    border:1px solid #8b5cf6;
                    border-radius:10px;
                    padding:15px;
                    margin-top:12px;
                    color:#e9ddff;
                    line-height:1.6;">
                </div>
            </div>

            <div class="navegacao">
                <button id="anterior"
                    ${questaoAtual === 0 ? "disabled" : ""}>
                    ← Anterior
                </button>

                ${
                    questaoAtual === questoes.length - 1
                    ? `<button id="finalizar">Finalizar jogo 🏆</button>`
                    : `<button id="proxima">Próxima →</button>`
                }
            </div>
        </section>
    `;

    // Salva a alternativa escolhida
    document.querySelectorAll('input[name="resposta"]').forEach(input => {
        input.addEventListener("change", function() {
            respostas[questaoAtual] = this.value;
        });
    });

    // Exibe a dica
    document.getElementById("btn-dica").addEventListener("click", () => {
        const areaDica = document.getElementById("area-dica");
        areaDica.textContent = "💡 Dica: " + dicas[questaoAtual];
        areaDica.style.display = "block";
    });

    // Voltar
    document.getElementById("anterior").addEventListener("click", () => {
        if (questaoAtual > 0) {
            questaoAtual--;
            mostrarQuestao();
        }
    });

    // Avançar
    const botaoProxima = document.getElementById("proxima");

    if (botaoProxima) {
        botaoProxima.addEventListener("click", () => {
            if (respostas[questaoAtual] === null) {
                alert("Escolha uma alternativa antes de avançar!");
                return;
            }

            questaoAtual++;
            mostrarQuestao();
        });
    }

    // Finalizar
    const botaoFinalizar = document.getElementById("finalizar");

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", finalizarSimulado);
    }
}

// Finaliza o simulado
function finalizarSimulado() {
    if (respostas[questaoAtual] === null) {
        alert("Escolha uma alternativa antes de finalizar!");
        return;
    }

    const semResposta = respostas.filter(r => r === null).length;

    if (semResposta > 0) {
        alert(`Ainda existem ${semResposta} questão(ões) sem resposta.`);
        return;
    }

    if (!confirm("Tem certeza de que deseja finalizar o desafio?")) {
        return;
    }

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

// Tela de resultado e conquistas
function mostrarResultado(acertos, erros, nota) {
    let conquista = "";

    if (acertos === questoes.length) {
        conquista = "🏆 LENDA DA MATEMÁTICA! Desempenho perfeito!";
    } else if (nota >= 7) {
        conquista = "🥇 MESTRE DOS CÁLCULOS! Excelente trabalho!";
    } else if (nota >= 5) {
        conquista = "🥈 APRENDIZ AVANÇADO! Continue evoluindo!";
    } else {
        conquista = "🎮 JORNADA INICIADA! Treine e tente novamente!";
    }

    let revisaoHTML = "";

    questoes.forEach((questao, indice) => {
        const acertou = respostas[indice] === questao.resposta;

        revisaoHTML += `
            <div class="revisao">
                <h4>
                    Questão ${indice + 1} —
                    ${acertou ? "✅ Acertou" : "❌ Errou"}
                </h4>

                <p>Sua resposta: ${respostas[indice]}</p>
                <p>Resposta correta: ${questao.resposta}</p>
            </div>
        `;
    });

    app.innerHTML = `
        <section class="resultado">
            <h2>🏁 DESAFIO CONCLUÍDO!</h2>

            <div class="pontuacao">
                <h3>Nota: ${nota.toFixed(1).replace(".", ",")}</h3>
                <p>⭐ Acertos: ${acertos}</p>
                <p>❌ Erros: ${erros}</p>
                <p>🎯 Total de questões: ${questoes.length}</p>
            </div>

            <h3>${conquista}</h3>

            <h3 style="margin-top:30px;">📋 Gabarito e revisão</h3>

            ${revisaoHTML}

            <button id="reiniciar">🔄 Jogar novamente</button>
        </section>
    `;

    document.getElementById("reiniciar").addEventListener("click", () => {
        respostas = new Array(questoes.length).fill(null);
        questaoAtual = 0;
        mostrarQuestao();
    });
}

// Carrega o jogo
carregarQuestoes();

