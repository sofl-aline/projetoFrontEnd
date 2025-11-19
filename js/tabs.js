/**
 * TABS.JS
 * Sistema de abas/tabs
 * Gerencia a navegação entre diferentes seções do formulário
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de aba
    const tabs = document.querySelectorAll('.tab');
    
    // Adiciona evento de clique em cada aba
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Obtém o identificador da seção a ser exibida
            const secaoAtiva = tab.getAttribute('data-tab');
            
            // Remove classe 'active' de todas as abas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Adiciona classe 'active' na aba clicada
            tab.classList.add('active');
            
            // Encontra o container pai das abas
            const tabContainer = tab.closest('.form-content');
            
            if (tabContainer) {
                // Esconde todas as seções dentro deste container
                const secoes = tabContainer.querySelectorAll('.form-section');
                secoes.forEach(s => {
                    s.style.display = 'none';
                });
                
                // Mostra apenas a seção correspondente à aba clicada
                const secaoSelecionada = tabContainer.querySelector(`#secao${secaoAtiva.charAt(0).toUpperCase() + secaoAtiva.slice(1)}`);
                if (secaoSelecionada) {
                    secaoSelecionada.style.display = 'block';
                }
            }
        });
    });
});