/**
 * UI.JS
 * Funções de interface do usuário
 * Gerencia interações visuais e feedback ao usuário
 */

/**
 * Exibe uma notificação toast (pode ser melhorada)
 * @param {string} mensagem - Texto da mensagem
 * @param {string} tipo - 'sucesso', 'erro', 'aviso', 'info'
 */
function exibirNotificacao(mensagem, tipo = 'sucesso') {
    // Implementação básica com alert
    // TODO: Implementar toast notifications mais elegantes
    alert(mensagem);
}

/**
 * Mostra um indicador de carregamento
 */
function mostrarCarregamento() {
    // TODO: Implementar spinner/loading visual
    console.log('Carregando...');
}

/**
 * Esconde o indicador de carregamento
 */
function esconderCarregamento() {
    console.log('Carregamento concluído');
}

/**
 * Valida um campo de formulário
 * @param {HTMLElement} campo - Elemento input a ser validado
 * @returns {boolean} - True se válido
 */
function validarCampoFormulario(campo) {
    if (!campo.value || campo.value.trim() === '') {
        campo.style.borderColor = 'red';
        return false;
    }
    campo.style.borderColor = '';
    return true;
}

/**
 * Limpa todos os campos de um formulário
 * @param {string[]} idsDosCampos - Array com IDs dos campos a limpar
 */
function limparCampos(idsDosCampos) {
    idsDosCampos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.value = '';
        }
    });
}

/**
 * Adiciona animação de feedback ao clicar em botão
 * @param {HTMLElement} botao - Elemento botão
 */
function animarBotao(botao) {
    botao.style.transform = 'scale(0.95)';
    setTimeout(() => {
        botao.style.transform = 'scale(1)';
    }, 100);
}