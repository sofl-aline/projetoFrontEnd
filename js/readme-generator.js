/**
 * README-GENERATOR.JS
 * Gerador de README.md
 * Gerencia a criação, preview e download de arquivos README
 */

document.addEventListener('DOMContentLoaded', () => {

    // Atualiza preview em tempo real ao digitar
    const campos = [
        'inputTitulo', 'inputDescricaoCurta', 'inputDescricaoCompleta',
        'inputFuncionalidades', 'inputEstruturaProjeto',
        'inputTecnologias', 'inputLicenca', 'inputComoInstalar', 'inputComoRodar',
        'inputMelhorias', 'inputNomeAutor', 'inputEmailAutor', 'inputGithubAutor', 'inputLinkedinAutor', 'inputPortfolioAutor'
    ];
    
    campos.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', gerarPreview);
            el.addEventListener('change', gerarPreview);
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
    const titulo = document.getElementById('inputTitulo')?.value.trim() || '';
    const descricaoCurta = document.getElementById('inputDescricaoCurta')?.value.trim() || '';
    const descricaoCompleta = document.getElementById('inputDescricaoCompleta')?.value.trim() || '';
    const funcionalidades = document.getElementById('inputFuncionalidades')?.value.trim() || '';
    const estruturaProjeto = document.getElementById('inputEstruturaProjeto')?.value.trim() || '';
    const tecnologias = document.getElementById('inputTecnologias')?.value.trim() || '';
    const licenca = document.getElementById('inputLicenca')?.value.trim() || '';
    const comoInstalar = document.getElementById('inputComoInstalar')?.value.trim() || '';
    const comoRodar = document.getElementById('inputComoRodar')?.value.trim() || '';
    const melhorias = document.getElementById('inputMelhorias')?.value.trim() || '';
    const nomeAutor = document.getElementById('inputNomeAutor')?.value.trim() || '';
    const emailAutor = document.getElementById('inputEmailAutor')?.value.trim() || '';
    const githubAutor = document.getElementById('inputGithubAutor')?.value.trim() || '';
    const linkedinAutor = document.getElementById('inputLinkedinAutor')?.value.trim() || '';
    const portfolioAutor = document.getElementById('inputPortfolioAutor')?.value.trim() || '';

    // Processa tecnologias (separa por vírgula e remove espaços)
    const tecnologiasArray = tecnologias 
        ? tecnologias.split(',').map(s => s.trim()).filter(Boolean) 
        : [];

    // Processa funcionalidades (separa por quebra de linha)
    const funcionalidadesArray = funcionalidades
        ? funcionalidades.split('\n').map(s => s.trim()).filter(Boolean)
        : [];

    // Processa melhorias (separa por quebra de linha)
    const melhoriaArray = melhorias
        ? melhorias.split('\n').map(s => s.trim()).filter(Boolean)
        : [];

    // Gera markdown estruturado
    let md = '';
    
    // Adiciona título como H1
    if (titulo) md += `# ${titulo}\n\n`;
    
    // Adiciona descrição curta
    if (descricaoCurta) md += `${descricaoCurta}\n\n`;
    
    // Adiciona descrição completa
    if (descricaoCompleta) md += `## 📋 Descrição\n\n${descricaoCompleta}\n\n`;
    
    // Adiciona seção de funcionalidades
    if (funcionalidadesArray.length) {
        md += `## ✨ Funcionalidades\n\n`;
        funcionalidadesArray.forEach(f => md += `- ${f}\n`);
        md += `\n`;
    }
    
    // Adiciona seção de estrutura do projeto
    if (estruturaProjeto) {
        md += `## 📁 Estrutura do Projeto\n\n\`\`\`\n${estruturaProjeto}\n\`\`\`\n\n`;
    }
    
    // Adiciona seção de tecnologias
    if (tecnologiasArray.length) {
        md += `## 🛠️ Tecnologias\n\n`;
        tecnologiasArray.forEach(t => md += `- ${t}\n`);
        md += `\n`;
    }
    
    // Adiciona seção de instalação
    if (comoInstalar) {
        md += `## 📦 Como Instalar\n\n\`\`\`bash\n${comoInstalar}\n\`\`\`\n\n`;
    }
    
    // Adiciona seção de como rodar
    if (comoRodar) {
        md += `## 🚀 Como Rodar\n\n\`\`\`bash\n${comoRodar}\n\`\`\`\n\n`;
    }
    
    // Adiciona seção de melhorias futuras
    if (melhoriaArray.length) {
        md += `## 🔮 Melhorias Futuras\n\n`;
        melhoriaArray.forEach(m => md += `- ${m}\n`);
        md += `\n`;
    }
    
    // Adiciona seção de autor
    if (nomeAutor || emailAutor || githubAutor || linkedinAutor || portfolioAutor) {
        md += `## 👨‍💻 Autor\n\n`;
        if (nomeAutor) md += `**${nomeAutor}**\n\n`;
        
        const links = [];
        if (emailAutor) links.push(`📧 [Email](mailto:${emailAutor})`);
        if (githubAutor) links.push(`🐙 [GitHub](${githubAutor})`);
        if (linkedinAutor) links.push(`💼 [LinkedIn](${linkedinAutor})`);
        if (portfolioAutor) links.push(`🌐 [Portfólio](${portfolioAutor})`);
        
        if (links.length) {
            md += links.join(' | ') + '\n\n';
        }
    }
    
    // Adiciona licença
    if (licenca) md += `## 📄 Licença\n\n${licenca}\n`;

    // Retorna markdown ou mensagem padrão
    return md || 'Preencha o formulário à esquerda para gerar o README.';
}

/**
 * Gera o preview visual do README em formato Markdown
 * Exibe o texto bruto com formatação de código
 */
function gerarPreview() {
    const preview = document.getElementById('previewArea');
    if (!preview) return;

    // Limpa conteúdo anterior
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const md = montarREADME();

    // Container para botões (lado a lado)
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
    `;
    preview.appendChild(buttonContainer);

    // Adiciona botão para copiar direto do preview
    const copyButton = document.createElement('button');
    copyButton.textContent = '📋 Copiar Markdown';
    copyButton.className = 'btn-secondary';
    copyButton.style.cssText = `
        flex: 1;
        padding: 8px 12px;
        font-size: 14px;
    `;
    copyButton.addEventListener('click', copiarREADME);
    buttonContainer.appendChild(copyButton);

    // Adiciona botão para baixar README
    const downloadButton = document.createElement('button');
    downloadButton.textContent = '⬇️ Baixar README';
    downloadButton.className = 'btn-secondary';
    downloadButton.style.cssText = `
        flex: 1;
        padding: 8px 12px;
        font-size: 14px;
    `;
    downloadButton.addEventListener('click', baixarREADME);
    buttonContainer.appendChild(downloadButton);

    // Cria container com formatação de código Markdown
    const preContainer = document.createElement('div');
    preContainer.className = 'markdown-preview';
    preContainer.style.cssText = `
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 16px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    `;

    // Renderiza o markdown com destaque sintático básico
    const lines = md.split('\n');
    const htmlLines = lines.map(linha => {
        let html = linha;
        
        // Escape de caracteres especiais HTML
        html = html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        // Aplica cores para diferentes elementos Markdown
        if (html.startsWith('# ')) {
            // Títulos H1
            html = `<span style="color: #d63384; font-weight: bold;">${html}</span>`;
        } else if (html.startsWith('## ')) {
            // Títulos H2
            html = `<span style="color: #6610f2; font-weight: bold;">${html}</span>`;
        } else if (html.startsWith('- ')) {
            // Listas
            html = `<span style="color: #198754;">${html}</span>`;
        } else if (html.startsWith('**') && html.endsWith('**')) {
            // Texto em negrito
            html = `<span style="color: #0d6efd; font-weight: bold;">${html}</span>`;
        }
        
        return html;
    });

    preContainer.innerHTML = htmlLines.join('\n');
    preview.appendChild(preContainer);
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