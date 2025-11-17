/**
 * MAIN.JS
 * Script principal - Inicialização geral
 * Gerencia funcionalidades compartilhadas entre todas as páginas
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Aplicação DevDocs iniciada!');
    
    // Identifica qual página está carregada
    const paginaAtual = window.location.pathname.split('/').pop();
    console.log('📄 Página atual:', paginaAtual);
    
    // Inicializa funcionalidades específicas baseadas na página
    inicializarPagina(paginaAtual);
});

/**
 * Inicializa funcionalidades específicas de cada página
 * @param {string} pagina - Nome do arquivo HTML da página atual
 */
function inicializarPagina(pagina) {
    switch(pagina) {
        case 'curriculum_cv.html':
            console.log('✅ Inicializando gerador de currículo...');
            // Lógica específica do currículo será gerenciada por resume-generator.js
            break;
            
        case 'curriculum.html':
            console.log('✅ Inicializando gerador de README...');
            // Lógica específica do README será gerenciada por readme-generator.js
            break;
            
        case 'index.html':
        default:
            console.log('✅ Página inicial carregada');
            break;
    }
}

/**
 * Função utilitária para mostrar mensagens ao usuário
 * @param {string} mensagem - Texto da mensagem
 * @param {string} tipo - Tipo de mensagem: 'sucesso', 'erro', 'aviso'
 */
function mostrarMensagem(mensagem, tipo = 'sucesso') {
    // Implementação básica com alert (pode ser melhorada com toasts)
    alert(mensagem);
}

/**
 * Função utilitária para validar campos vazios
 * @param {string} valor - Valor a ser validado
 * @returns {boolean} - True se o campo não estiver vazio
 */
function validarCampo(valor) {
    return valor && valor.trim() !== '';
}