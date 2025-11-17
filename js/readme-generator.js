/**
 * README-GENERATOR.JS
 * Gerador de README.md
 * Gerencia a criação, preview e download de arquivos README
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos botões
    const btnGerar = document.getElementById('btnGerar');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnBaixar = document.getElementById('btnBaixar');

    // Adiciona eventos aos botões
    if (btnGerar) btnGerar.addEventListener('click', gerarPreview);
    if (btnCopiar) btnCopiar.addEventListener('click', copiarREADME);
    if (btnBaixar) btnBaixar.addEventListener('click', baixarREADME);

    // Atualiza preview em tempo real ao digitar
    ['inputNome', 'inputTitulo', 'inputResumo', 'inputHabilidades', 'inputContato'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', gerarPreview);
        }
    });

    // Gera preview inicial vazio
    gerarPreview();
});

/**
 * Monta o conteúdo do README em formato Markdown
 * @returns {string} - Conteúdo do README em Markdown
 */
function montarREADME() {
    // Coleta valores dos campos
    const nome = document.getElementById('inputNome')?.value.trim() || '';
    const titulo = document.getElementById('inputTitulo')?.value.trim() || '';
    const resumo = document.getElementById('inputResumo')?.value.trim() || '';
    const habilidades = document.getElementById('inputHabilidades')?.value.trim() || '';
    const contato = document.getElementById('inputContato')?.value.trim() || '';

    // Processa habilidades (separa por vírgula e remove espaços)
    const habilidadesArray = habilidades 
        ? habilidades.split(',').map(s => s.trim()).filter(Boolean) 
        : [];

    // Gera markdown estruturado
    let md = '';
    
    // Adiciona nome como título principal
    if (nome) md += `# ${nome}\n\n`;
    
    // Adiciona título profissional em negrito
    if (titulo) md += `**${titulo}**\n\n`;
    
    // Adiciona resumo/sobre
    if (resumo) md += `${resumo}\n\n`;
    
    // Adiciona seção de habilidades
    if (habilidadesArray.length) {
        md += `## Habilidades\n`;
        habilidadesArray.forEach(h => md += `- ${h}\n`);
        md += `\n`;
    }
    
    // Adiciona informações de contato
    if (contato) md += `## Contato\n${contato}\n`;

    // Retorna markdown ou mensagem padrão
    return md || 'Preencha o formulário à esquerda para gerar o README.';
}

/**
 * Gera o preview visual do README
 * Converte Markdown para HTML de forma simples
 */
function gerarPreview() {
    const preview = document.getElementById('previewArea');
    if (!preview) return;

    // Limpa conteúdo anterior
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const md = montarREADME();

    // Renderização simples: converte linhas de markdown para HTML
    const linhas = md.split('\n');
    linhas.forEach((linha) => {
        if (!linha) return; // Ignora linhas vazias
        
        let el;
        
        // Identifica tipo de linha e cria elemento apropriado
        if (linha.startsWith('# ')) {
            // Título H1
            el = document.createElement('h1');
            el.textContent = linha.replace('# ', '');
        } else if (linha.startsWith('## ')) {
            // Título H2
            el = document.createElement('h2');
            el.textContent = linha.replace('## ', '');
        } else if (linha.startsWith('- ')) {
            // Item de lista
            let last = preview.lastElementChild;
            
            // Se o último elemento não for UL, cria um
            if (!last || last.tagName.toLowerCase() !== 'ul') {
                const ul = document.createElement('ul');
                preview.appendChild(ul);
                last = ul;
            }
            
            // Cria item da lista
            const li = document.createElement('li');
            li.textContent = linha.replace('- ', '');
            preview.lastElementChild.appendChild(li);
            return; // Já adicionou, não precisa continuar
        } else {
            // Parágrafo normal
            el = document.createElement('p');
            el.textContent = linha;
        }
        
        // Adiciona elemento ao preview
        preview.appendChild(el);
    });
}

/**
 * Copia o conteúdo README para a área de transferência
 */
function copiarREADME() {
    const md = montarREADME();
    
    // Usa a API moderna de clipboard
    navigator.clipboard.writeText(md).then(() => {
        alert('README copiado para a área de transferência!');
    }, () => {
        alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
    });
}

/**
 * Baixa o README como arquivo .md
 */
function baixarREADME() {
    const md = montarREADME();
    
    // Cria um Blob com o conteúdo Markdown
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Cria elemento <a> temporário para download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    
    // Usa appendChild conforme requisito
    document.body.appendChild(a);
    a.click();
    
    // Remove elemento e libera memória
    a.remove();
    URL.revokeObjectURL(url);
}