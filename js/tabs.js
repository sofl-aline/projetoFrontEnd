/**
 * TABS.JS
 * Sistema de abas/tabs
 * Gerencia a navegação entre diferentes seções do formulário
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de aba
    const tabs = document.querySelectorAll('.tab');
    
    // Objeto com referências para todas as seções
    const secoes = {
        dados: document.getElementById('secaoDados'),
        experiencia: document.getElementById('secaoExperiencia'),
        educacao: document.getElementById('secaoEducacao'),
        habilidades: document.getElementById('secaoHabilidades'),
        certificados: document.getElementById('secaoCertificados')
    };

    // Adiciona evento de clique em cada aba
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Obtém o identificador da seção a ser exibida
            const secaoAtiva = tab.getAttribute('data-tab');
            
            // Remove classe 'active' de todas as abas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Adiciona classe 'active' na aba clicada
            tab.classList.add('active');
            
            // Esconde todas as seções
            Object.values(secoes).forEach(s => {
                if (s) s.style.display = 'none';
            });
            
            // Mostra apenas a seção correspondente à aba clicada
            if (secoes[secaoAtiva]) {
                secoes[secaoAtiva].style.display = 'block';
            }
        });
    });
});