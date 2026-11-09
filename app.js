
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


// Resoluções comentadas das 16 questões
const resolucoes = [

    // Questão 1
    `1. Preço inicial: R$ 2.500,00.
    <br>2. Primeiro desconto: 2500 × 0,80 = R$ 2.000,00.
    <br>3. Segundo desconto: 2000 × 0,90 = R$ 1.800,00.
    <br><strong>Resposta: R$ 1.800,00.</strong>`,

    // Questão 2
    `1. Somamos as horas: 2 + 3 + 5 = 10 horas.
    <br>2. Dividimos o valor total pelas horas: 1200 ÷ 10 = R$ 120,00 por hora.
    <br>3. Carlos trabalhou 2 horas: 2 × 120 = R$ 240,00.
    <br><strong>Resposta: R$ 240,00.</strong>`,

    // Questão 3
    `1. Identificamos a proporção: 180 km correspondem a 15 litros.
    <br>2. Montamos a regra de três: 180/15 = 300/x.
    <br>3. Multiplicamos em cruz: 180x = 4500.
    <br>4. x = 4500 ÷ 180 = 25.
    <br><strong>Resposta: 25 litros.</strong>`,

    // Questão 4
    `1. Simplificamos as raízes: √72 = 6√2 e √50 = 5√2.
    <br>2. Substituímos na expressão: (6√2 + 5√2) ÷ √2.
    <br>3. Somamos: 11√2 ÷ √2 = 11.
    <br><strong>Resposta: 11.</strong>`,

    // Questão 5
    `1. Escrevemos 150 milhões em algarismos: 150.000.000.
    <br>2. Colocamos a vírgula após o primeiro algarismo: 1,5.
    <br>3. A vírgula foi deslocada 8 casas.
    <br><strong>Resposta: 1,5 × 10⁸ km.</strong>`,

    // Questão 6
    `1. Aplicamos o produto notável: (a + b)² = a² + 2ab + b².
    <br>2. Substituímos a = x e b = 4.
    <br>3. Desenvolvemos: x² + 2 · x · 4 + 4².
    <br>4. Simplificamos: x² + 8x + 16.
    <br><strong>Resposta: x² + 8x + 16.</strong>`,

    // Questão 7
    `1. Elevamos o coeficiente: 2³ = 8.
    <br>2. Multiplicamos os expoentes de x: (x²)³ = x⁶.
    <br>3. Multiplicamos os expoentes de y: y³.
    <br>4. Juntamos os resultados.
    <br><strong>Resposta: 8x⁶y³.</strong>`,

    // Questão 8
    `I. Temos uma diferença de quadrados: 25x² - 49.
    <br>25x² = (5x)² e 49 = 7².
    <br>Logo: (5x - 7)(5x + 7).
    <br><br>II. Temos um trinômio quadrado perfeito:
    <br>x² + 10x + 25 = x² + 2 · x · 5 + 5².
    <br>Logo: (x + 5)².
    <br><strong>As duas fatorações estão corretas.</strong>`,

    // Questão 9
    `1. Existe uma taxa fixa de R$ 8,00.
    <br>2. Cada quilômetro custa R$ 3,00.
    <br>3. Para x quilômetros, o custo variável é 3x.
    <br>4. Somamos a taxa fixa: y = 3x + 8.
    <br><strong>Resposta: y = 3x + 8.</strong>`,

    // Questão 10
    `1. A função é f(x) = 2x + 3.
    <br>2. Para x = 0: f(0) = 2 · 0 + 3 = 3.
    <br>3. Para x = 1: f(1) = 5.
    <br>4. Para x = 2: f(2) = 7.
    <br>5. Para x = 3: f(3) = 9.
    <br><strong>Imagem: {3, 5, 7, 9}.</strong>`,

    // Questão 11
    `1. Retiramos os parênteses: 5x² + 3x - 7 - 2x² + 4x - 5.
    <br>2. Agrupamos os termos semelhantes.
    <br>3. Subtraímos: 5x² - 2x² = 3x².
    <br>4. Somamos: 3x + 4x = 7x.
    <br>5. Somamos: -7 - 5 = -12.
    <br><strong>Resposta: 3x² + 7x - 12.</strong>`,

    // Questão 12
    `1. O ângulo central mede o mesmo que o arco: 120°.
    <br>2. O ângulo inscrito mede a metade do arco: 120° ÷ 2 = 60°.
    <br>3. Na transversal, ângulos adjacentes suplementares somam 180°.
    <br>4. Portanto: 180° - 125° = 55°.
    <br><strong>Resposta: 120°, 60° e 55°.</strong>`,

    // Questão 13
    `1. Os triângulos formados pelas alturas e sombras são semelhantes.
    <br>2. Montamos a proporção: 2/1,5 = h/9.
    <br>3. Multiplicamos em cruz: 1,5h = 18.
    <br>4. h = 18 ÷ 1,5 = 12.
    <br><strong>Resposta: 12 metros.</strong>`,

    // Questão 14
    `1. Utilizamos a relação métrica: cateto² = hipotenusa × projeção.
    <br>2. Substituímos os valores: c² = 25 × 9.
    <br>3. Calculamos: c² = 225.
    <br>4. Extraímos a raiz: c = √225 = 15.
    <br><strong>Resposta: 15 metros.</strong>`,

    // Questão 15
    `PRISMA:
    <br>1. Área da base quadrada: 4 × 4 = 16 cm².
    <br>2. Volume: 16 × 10 = 160 cm³.
    <br>3. Vista superior: quadrado.
    <br><br>CILINDRO:
    <br>1. Volume: V = π × r² × h.
    <br>2. V = 3,14 × 2² × 10.
    <br>3. V = 3,14 × 4 × 10 = 125,6 cm³.
    <br>4. Vista superior: círculo.
    <br><strong>Resposta: 160 cm³ e 125,6 cm³.</strong>`,

    // Questão 16
    `1. Total de estudantes: 40.
    <br>2. Futebol: 16 ÷ 40 = 0,4 = 40%.
    <br>3. Vôlei ou basquete: 10 + 8 = 18 estudantes.
    <br>4. Probabilidade: 18 ÷ 40 = 0,45 = 45%.
    <br><strong>Resposta: 40% e 45%.</strong>`
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

                <p><strong>Sua resposta:</strong> ${respostas[indice]}</p>
                <p><strong>Resposta correta:</strong> ${questao.resposta}</p>

                <div class="resolucao">
                    <h4>📖 Resolução passo a passo</h4>
                    <p>${resolucoes[indice]}</p>
                </div>
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

            <h3 style="margin-top:30px;">📚 Gabarito comentado</h3>

            <p style="margin:15px 0 25px;">
                Confira suas respostas e estude cada resolução!
            </p>

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

