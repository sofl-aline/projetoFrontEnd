// curriculum.js
// Objetivo: ouvir eventos do formulário, criar preview dinâmico e permitir copiar/baixar README

document.addEventListener('DOMContentLoaded', () => {
  const btnGerar = document.getElementById('btnGerar');
  const btnCopiar = document.getElementById('btnCopiar');
  const btnBaixar = document.getElementById('btnBaixar');

  btnGerar.addEventListener('click', gerarPreview);
  btnCopiar.addEventListener('click', copiarREADME);
  btnBaixar.addEventListener('click', baixarREADME);

  // também atualiza em tempo real quando o usuário digita (opcional)
  ['inputNome','inputTitulo','inputResumo','inputHabilidades','inputContato'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', gerarPreview);
  });

  // cria preview inicial vazio
  gerarPreview();
});

// Cria o conteúdo do README a partir dos inputs
function montarREADME() {
  const nome = document.getElementById('inputNome').value.trim();
  const titulo = document.getElementById('inputTitulo').value.trim();
  const resumo = document.getElementById('inputResumo').value.trim();
  const habilidades = document.getElementById('inputHabilidades').value.trim();
  const contato = document.getElementById('inputContato').value.trim();

  const habilidadesArray = habilidades ? habilidades.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Gera markdown simples
  let md = '';
  if (nome) md += `# ${nome}\n\n`;
  if (titulo) md += `**${titulo}**\n\n`;
  if (resumo) md += `${resumo}\n\n`;
  if (habilidadesArray.length) {
    md += `## Habilidades\n`;
    habilidadesArray.forEach(h => md += `- ${h}\n`);
    md += `\n`;
  }
  if (contato) md += `## Contato\n${contato}\n`;

  return md || 'Preencha o formulário à esquerda para gerar o README.';
}

// Função que monta visualmente o preview usando appendChild
function gerarPreview() {
  const preview = document.getElementById('previewArea');
  // limpa conteúdo anterior
  while (preview.firstChild) preview.removeChild(preview.firstChild);

  const md = montarREADME();

  // Render simples: converte linhas de markdown para elementos HTML básicos
  const linhas = md.split('\n');
  linhas.forEach((linha) => {
    if (!linha) return; // pula linhas vazias
    let el;
    if (linha.startsWith('# ')) {
      el = document.createElement('h1');
      el.textContent = linha.replace('# ', '');
    } else if (linha.startsWith('## ')) {
      el = document.createElement('h2');
      el.textContent = linha.replace('## ', '');
    } else if (linha.startsWith('- ')) {
      // lista: se o último elemento não for UL, cria um
      let last = preview.lastElementChild;
      if (!last || last.tagName.toLowerCase() !== 'ul') {
        const ul = document.createElement('ul');
        preview.appendChild(ul);
        last = ul;
      }
      const li = document.createElement('li');
      li.textContent = linha.replace('- ', '');
      preview.lastElementChild.appendChild(li);
      return; // já adicionou o item
    } else {
      el = document.createElement('p');
      el.textContent = linha;
    }
    preview.appendChild(el);
  });
}

// Copiar conteúdo markdown para a área de transferência
function copiarREADME() {
  const md = montarREADME();
  navigator.clipboard.writeText(md).then(() => {
    alert('README copiado para a área de transferência!');
  }, () => {
    alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
  });
}

// Baixar arquivo README.md
function baixarREADME() {
  const md = montarREADME();
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'README.md';
  // usa appendChild para cumprir requisito
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
