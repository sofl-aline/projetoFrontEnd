# 📚 Jobly - Gerador de Currículos e README

> Projeto da disciplina de Front End com lógica imperativa

## 🎯 Sobre o Projeto

Jobly é uma aplicação web que permite aos usuários criar:
- **Currículos profissionais** formatados e prontos para exportação
- **Arquivos README.md** para projetos no GitHub

## 🚀 Funcionalidades

### Gerador de Currículo
- Formulário completo com abas organizadas
- Preview em tempo real
- Seções para:
  - Dados pessoais
  - Experiência profissional
  - Formação acadêmica
  - Habilidades técnicas e pessoais
  - Certificações
  - Palestras e minicursos

### Gerador de README
- Interface simples e intuitiva
- Preview em Markdown
- Exportação para arquivo .md
- Copiar para área de transferência

## 📁 Estrutura do Projeto
```bash
/project
│
├── index.html              # Página inicial
├── curriculo.html         # Gerador de currículo
├── readme.html             # Gerador de README
│
├── style/                  # Arquivos CSS organizados
│   ├── globals.css         # Estilos globais e variáveis
│   ├── layout.css          # Layouts e estruturas
│   ├── components.css      # Componentes reutilizáveis
│   └── themes.css          # Temas e cores
│
├── js/                     # Scripts JavaScript
│   ├── main.js             # Script principal
│   ├── tabs.js             # Sistema de abas
│   ├── resume-generator.js # Lógica do gerador de currículo
│   ├── readme-generator.js # Lógica do gerador de README
│   └── ui.js               # Funções de interface
│
└── README.md               # Este arquivo
```


## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis CSS e Grid Layout
- **JavaScript (Vanilla)** - Lógica imperativa sem frameworks

## 💻 Como Usar

1. Clone o repositório ou baixe os arquivos
2. Abra `index.html` em um navegador moderno
3. Escolha entre criar um currículo ou README
4. Preencha o formulário
5. Visualize o preview em tempo real
6. Exporte ou copie o resultado

## 📝 Organização do Código

### CSS Modular
- **globals.css**: Reset, variáveis e estilos base
- **layout.css**: Estruturas de grid e containers
- **components.css**: Botões, cards, formulários, navegação
- **themes.css**: Esquemas de cores e temas

### JavaScript Modular
- **main.js**: Inicialização e funções compartilhadas
- **tabs.js**: Gerenciamento de abas do formulário
- **resume-generator.js**: Lógica completa do gerador de currículo
- **readme-generator.js**: Lógica completa do gerador de README
- **ui.js**: Funções de interface e validações

## 🎨 Características de Design

- Interface limpa e moderna
- Navegação intuitiva com abas
- Preview em tempo real
- Design responsivo
- Feedback visual para ações do usuário

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a:
- Desktop (>1024px)
- Tablet (768px - 1024px)
- Mobile (<768px)

## 🔄 Próximas Melhorias

- [ ] Exportação para PDF
- [ ] Mais templates de currículo
- [ ] Salvamento local (localStorage)
- [ ] Sistema de templates predefinidos
- [ ] Modo escuro

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico da disciplina de Front-End com Lógica Imperativa.

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

## 🔧 Guia de Implementação

### Passo 1: Estruture as Pastas

Crie a seguinte estrutura de diretórios:
```bash
mkdir -p project/style
mkdir -p project/js
mkdir -p project/assets/images
```

### Passo 2: Separe os Arquivos CSS

**Crie `style/globals.css`** - Copie todo o conteúdo da seção "style/globals.css" acima

**Crie `style/layout.css`** - Copie todo o conteúdo da seção "style/layout.css" acima

**Crie `style/components.css`** - Copie todo o conteúdo da seção "style/components.css" acima

**Crie `style/themes.css`** - Copie todo o conteúdo da seção "style/themes.css" acima

### Passo 3: Separe os Arquivos JavaScript

**Crie `js/main.js`** - Copie todo o conteúdo da seção "js/main.js" acima

**Crie `js/tabs.js`** - Copie todo o conteúdo da seção "js/tabs.js" acima

**Crie `js/resume-generator.js`** - Copie todo o conteúdo da seção "js/resume-generator.js" acima

**Crie `js/readme-generator.js`** - Copie todo o conteúdo da seção "js/readme-generator.js" acima

**Crie `js/ui.js`** - Copie todo o conteúdo da seção "js/ui.js" acima

### Passo 4: Atualize os Arquivos HTML

Substitua seus arquivos HTML pelos fornecidos acima, garantindo que os caminhos dos arquivos CSS e JS estejam corretos.

---

## 📚 Documentação dos Módulos

### 🎨 Módulos CSS

#### **globals.css**
- Define variáveis CSS reutilizáveis (cores, tamanhos, espaçamentos)
- Reset CSS para consistência entre navegadores
- Estilos base de tipografia
- Configurações globais do body e html

#### **layout.css**
- Estruturas de containers e grids
- Layouts responsivos
- Posicionamento de elementos principais
- Media queries para diferentes tamanhos de tela

#### **components.css**
- Estilos de navegação (menu e links)
- Cards e containers visuais
- Botões e suas variações
- Formulários e inputs
- Sistema de abas/tabs
- Preview e áreas de exibição
- Rodapé

#### **themes.css**
- Esquemas de cores (azul, verde, escuro)
- Estilos específicos de páginas
- Variações visuais temáticas

### 💻 Módulos JavaScript

#### **main.js**
- **Responsabilidade**: Inicialização geral da aplicação
- **Funções principais**:
  - `inicializarPagina()`: Identifica e inicializa a página atual
  - `mostrarMensagem()`: Exibe mensagens ao usuário
  - `validarCampo()`: Valida se um campo não está vazio

#### **tabs.js**
- **Responsabilidade**: Sistema de navegação por abas
- **Funcionalidade**: Permite alternar entre diferentes seções do formulário de currículo
- **Como funciona**:
  1. Escuta cliques nos botões de aba
  2. Remove classe 'active' de todas as abas
  3. Adiciona 'active' na aba clicada
  4. Esconde todas as seções
  5. Mostra apenas a seção correspondente

#### **resume-generator.js**
- **Responsabilidade**: Geração de currículos
- **Estado**: Mantém objeto `curriculo` com todos os dados inseridos
- **Funções principais**:
  - `adicionarExperiencia()`: Adiciona nova experiência profissional
  - `adicionarEducacao()`: Adiciona formação acadêmica
  - `adicionarCertificado()`: Adiciona certificação
  - `adicionarPalestra()`: Adiciona palestras/minicursos
  - `atualizarPreview()`: Atualiza visualização em tempo real
- **Fluxo de dados**:
  1. Usuário preenche formulário
  2. Clica em "Adicionar"
  3. Dados são validados
  4. Array correspondente é atualizado
  5. Preview é regenerado
  6. Campos são limpos

#### **readme-generator.js**
- **Responsabilidade**: Geração de arquivos README.md
- **Funções principais**:
  - `montarREADME()`: Cria conteúdo em formato Markdown
  - `gerarPreview()`: Converte Markdown para HTML visual
  - `copiarREADME()`: Copia para área de transferência
  - `baixarREADME()`: Gera e baixa arquivo .md
- **Processo de conversão Markdown→HTML**:
  1. Identifica linhas que começam com `#`, `##`, `-`, etc.
  2. Cria elementos HTML correspondentes (h1, h2, li, p)
  3. Adiciona elementos ao preview usando `appendChild()`

#### **ui.js**
- **Responsabilidade**: Funções de interface e feedback visual
- **Funções utilitárias**:
  - `exibirNotificacao()`: Mostra mensagens ao usuário
  - `mostrarCarregamento()`: Exibe loading
  - `validarCampoFormulario()`: Valida campo com feedback visual
  - `limparCampos()`: Limpa múltiplos campos de uma vez
  - `animarBotao()`: Adiciona feedback visual em cliques

---

## 🎓 Conceitos de Front-End Aplicados

### 1. **Separação de Responsabilidades**
- HTML para estrutura
- CSS para apresentação
- JavaScript para comportamento

### 2. **Modularização**
- Código organizado em arquivos específicos
- Cada arquivo tem uma responsabilidade clara
- Facilita manutenção e debug

### 3. **Nomenclatura Semântica**
- Classes e IDs descritivos
- Funções com nomes que indicam sua ação
- Comentários explicativos em todos os arquivos

### 4. **Manipulação Imperativa do DOM**
- Uso de `document.getElementById()`
- `querySelector()` e `querySelectorAll()`
- `appendChild()`, `createElement()`, `removeChild()`
- Eventos com `addEventListener()`

### 5. **Estado da Aplicação**
- Objeto `curriculo` mantém estado global
- Arrays para armazenar múltiplos itens
- Atualização reativa do preview

### 6. **Validação de Formulários**
- Verificação de campos obrigatórios
- Feedback visual imediato
- Prevenção de dados inválidos

### 7. **API do Navegador**
- `navigator.clipboard` para copiar texto
- `Blob` e `URL.createObjectURL()` para download
- `localStorage` (preparado para implementação futura)

---

## 🔍 Como Cada Parte Funciona

### Fluxo do Gerador de Currículo
Usuário acessa curriculo.html
↓
tabs.js inicializa o sistema de abas
↓
resume-generator.js carrega e cria estado inicial
↓
Usuário preenche dados pessoais (Aba "Dados")
↓
Preview atualiza automaticamente (evento 'input')
↓
Usuário muda para aba "Experiência"
↓
Preenche formulário de experiência
↓
Clica em "Adicionar Experiência"
↓
Dados são validados
↓
Array curriculo.experiencias é atualizado
↓
atualizarPreview() reconstrói o HTML do preview
↓
Usuário repete processo para outras seções
↓
Clica em "Gerar Currículo" para exportar (PDF - a implementar)

### Fluxo do Gerador de README
Usuário acessa readme.html
↓
readme-generator.js inicializa
↓
Eventos 'input' são registrados nos campos
↓
Usuário digita informações
↓
A cada tecla, gerarPreview() é chamado
↓
montarREADME() cria string Markdown
↓
String é convertida para HTML visual
↓
Preview é atualizado em tempo real
↓
Usuário pode:

Copiar para clipboard (btnCopiar)
Baixar arquivo .md (btnBaixar)

---

## 🐛 Debugging e Troubleshooting

### Problema: Preview não atualiza

**Solução**: Verifique se:
- Os IDs dos inputs estão corretos
- Os eventos 'input' foram registrados
- A função `atualizarPreview()` está sendo chamada
- Console do navegador não mostra erros

### Problema: Abas não funcionam

**Solução**: Verifique se:
- `tabs.js` está sendo carregado
- Os atributos `data-tab` correspondem aos IDs das seções
- As seções têm os IDs corretos

### Problema: Botões não respondem

**Solução**: Verifique se:
- Os IDs dos botões estão corretos
- Os event listeners foram registrados
- O DOMContentLoaded está executando

---

## 📊 Estrutura de Dados

### Objeto `curriculo` (resume-generator.js)
```javascript
curriculo = {
    experiencias: [
        {
            empresa: "Tech Solutions Inc.",
            cargo: "Desenvolvedor Front-end Sênior",
            periodo: "Jan 2020 - Presente",
            descricao: "Desenvolvimento de interfaces..."
        }
    ],
    educacao: [
        {
            instituicao: "Universidade Federal",
            curso: "Ciência da Computação",
            periodo: "2016 - 2020",
            tipo: "Ensino Superior"
        }
    ],
    certificados: [
        {
            titulo: "AWS Cloud Practitioner",
            instituicao: "Amazon Web Services",
            ano: "2025"
        }
    ],
    palestras: [
        {
            titulo: "Workshop de Git e GitHub",
            instituicao: "UNIESP"
        }
    ]
}
```

---

## 🚀 Próximos Passos de Desenvolvimento

### Melhorias Técnicas

1. **Implementar exportação para PDF**
   - Usar biblioteca como jsPDF ou html2pdf
   - Criar templates de currículo profissionais
   - Permitir escolha entre diferentes layouts

2. **Sistema de persistência**
   - Salvar dados no localStorage
   - Carregar dados salvos ao abrir a página
   - Permitir múltiplos currículos salvos

3. **Validações avançadas**
   - Validação de email
   - Validação de URLs
   - Formatação automática de telefone
   - Limite de caracteres visual

4. **Melhorias de UX**
   - Toast notifications ao invés de alerts
   - Confirmação antes de limpar dados
   - Drag and drop para reordenar itens
   - Botão para remover itens adicionados

5. **Editor de Markdown melhorado**
   - Preview em tempo real lado a lado
   - Syntax highlighting
   - Botões de formatação (negrito, itálico, etc.)
   - Inserção de imagens e links

### Melhorias de Design

1. **Temas**
   - Implementar seletor de tema (claro/escuro)
   - Diferentes esquemas de cores
   - Templates visuais para currículos

2. **Animações**
   - Transições suaves entre abas
   - Animações ao adicionar itens
   - Feedback visual mais rico

3. **Responsividade aprimorada**
   - Melhor experiência em tablets
   - Menu hambúrguer para mobile
   - Layout otimizado para impressão

---

## 💡 Dicas de Estudo

### Para entender melhor o código:

1. **Comece pelo HTML**
   - Entenda a estrutura de cada página
   - Identifique os IDs e classes importantes
   - Veja como os elementos estão organizados

2. **Depois vá para o CSS**
   - Veja como os estilos são aplicados
   - Entenda o sistema de variáveis CSS
   - Teste modificar cores e tamanhos

3. **Por fim, o JavaScript**
   - Leia os comentários com atenção
   - Use `console.log()` para ver o fluxo de dados
   - Teste modificar valores e veja o resultado

4. **Pratique modificando**
   - Adicione novos campos ao formulário
   - Crie novas seções no currículo
   - Experimente diferentes estilos

### Conceitos importantes para dominar:

- **Event-driven programming**: Como eventos disparam ações
- **DOM manipulation**: Como criar, modificar e remover elementos
- **State management**: Como manter e atualizar dados
- **Modularização**: Como organizar código em partes lógicas
- **Responsive design**: Como criar layouts que se adaptam

---

## 📞 Suporte

Se tiver dúvidas sobre alguma parte do código:

1. Leia os comentários no arquivo específico
2. Use o console do navegador para debugar
3. Teste isolar partes do código para entender melhor
4. Consulte a documentação do MDN Web Docs

---

**Bons estudos e bom desenvolvimento! 🚀**

