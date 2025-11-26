/**
 * RESUME-GENERATOR.JS
 * Gerador de Currículo
 * Gerencia a criação, preview e exportação de currículos
 */

// Estado global do currículo - armazena todos os dados inseridos
let curriculo = {
    experiencias: [],
    educacao: [],
    habilidadesTec: [],
    habilidadesSoft: [],
    idiomas: [],
    certificados: [],
    palestras: []
};

// Função para atualizar preview (será definida dentro do DOMContentLoaded)
let atualizarPreview = null;

document.addEventListener('DOMContentLoaded', () => {

    // Referências aos botões de ação
    const btnAddExperiencia = document.getElementById('btnAddExperiencia');
    const btnAddEducacao = document.getElementById('btnAddEducacao');
    const btnAddCertificado = document.getElementById('btnAddCertificado');
    const btnAddPalestra = document.getElementById('btnAddPalestra');
    const btnGerar = document.getElementById('btnGerar');

    // Verifica se os botões existem antes de adicionar eventos
    if (btnAddExperiencia) {
        btnAddExperiencia.addEventListener('click', adicionarExperiencia);
    }
    
    if (btnAddEducacao) {
        btnAddEducacao.addEventListener('click', adicionarEducacao);
    }
    
    if (btnAddCertificado) {
        btnAddCertificado.addEventListener('click', adicionarCertificado);
    }
    
    if (btnAddPalestra) {
        btnAddPalestra.addEventListener('click', adicionarPalestra);
    }
    
    if (btnGerar) {
        btnGerar.addEventListener('click', gerarPDF);
    }

    /**
    * Gera e baixa o PDF a partir do conteúdo de `#previewContent`.
    * Usa a biblioteca html2pdf (inserida em curriculo.html).
     */
    function gerarPDF() {
        const preview = document.getElementById('previewContent');
        if (!preview) {
            alert('Área de preview não encontrada. Atualize a página e tente novamente.');
            return;
        }

        // Nome do arquivo baseado no nome do usuário
        const nome = (document.getElementById('nome')?.value || 'meu-curriculo')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        const fileName = `${nome || 'curriculo'}.pdf`;

        // Opções recomendadas para A4
        const opt = {
            margin:       0.5,
            filename:     fileName,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        try {
            // Clonar o elemento para evitar alterações de DOM durante a renderização
            const clone = preview.cloneNode(true);

            // Remover restrições de altura para capturar todo o conteúdo
            clone.style.maxHeight = 'none';
            clone.style.overflow = 'visible';
            clone.style.height = 'auto';

            // Remover restrições de altura do sidebar e main-content
            const sidebar = clone.querySelector('.sidebar');
            const mainContent = clone.querySelector('.main-content');
            
            if (sidebar) {
                sidebar.style.maxHeight = 'none';
                sidebar.style.overflow = 'visible';
                sidebar.style.height = 'auto';
            }
            
            if (mainContent) {
                mainContent.style.maxHeight = 'none';
                mainContent.style.overflow = 'visible';
                mainContent.style.height = 'auto';
            }

            // Criar um container temporário fora da tela para garantir estilos aplicados
            const wrapper = document.createElement('div');
            wrapper.style.position = 'fixed';
            wrapper.style.left = '-9999px';
            wrapper.style.width = '210mm'; // Largura A4 para melhor renderização
            wrapper.style.minHeight = 'auto';
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);

            // Gera o PDF e remove o wrapper quando concluído
            window.html2pdf().set(opt).from(clone).save().then(() => {
                document.body.removeChild(wrapper);
                alert('Currículo gerado com sucesso!');
            }).catch(err => {
                document.body.removeChild(wrapper);
                console.error('Erro ao gerar PDF:', err);
                alert('Ocorreu um erro ao gerar o PDF. Veja o console para detalhes.');
            });
        } catch (e) {
            console.error(e);
            alert('Ocorreu um erro ao gerar o PDF. Atualize a página e tente novamente.');
        }
    }

    /**
     * Adiciona uma nova experiência profissional ao currículo
     */
    function adicionarExperiencia() {
        const empresa = document.getElementById('empresa').value;
        const cargo = document.getElementById('cargoExp').value;
        const periodo = document.getElementById('periodo').value;
        const descricao = document.getElementById('descricao').value;

        // Valida se os campos obrigatórios foram preenchidos
        if (empresa && cargo && periodo) {
            // Adiciona experiência ao array com um ID único
            const id = Date.now();
            curriculo.experiencias.push({ id, empresa, cargo, periodo, descricao });
            
            // Limpa os campos do formulário
            ['empresa', 'cargoExp', 'periodo', 'descricao'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
            // Remove indicador de edição se houver
            document.getElementById('experienciaEditandoId')?.remove();
            
            // Atualiza o preview
            atualizarPreview();
            
            // Feedback visual
            alert('Experiência adicionada com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    }



    /**
     * Adiciona uma nova formação educacional ao currículo
     */
    function adicionarEducacao() {
        const instituicao = document.getElementById('instituicao').value;
        const curso = document.getElementById('curso').value;
        const periodo = document.getElementById('periodoEdu').value;
        const tipo = document.getElementById('tipoEdu').value;

        // Valida campos obrigatórios
        if (instituicao && curso && periodo) {
            // Adiciona educação ao array com um ID único
            const id = Date.now();
            curriculo.educacao.push({ id, instituicao, curso, periodo, tipo });
            
            // Limpa campos
            ['instituicao', 'curso', 'periodoEdu'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
            // Remove indicador de edição se houver
            document.getElementById('educacaoEditandoId')?.remove();
            
            atualizarPreview();
            alert('Formação adicionada com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    }



    /**
     * Adiciona um novo certificado ao currículo
     */
    function adicionarCertificado() {
        const titulo = document.getElementById('certificadoTitulo').value;
        const instituicao = document.getElementById('certificadoInstituicao').value;
        const ano = document.getElementById('certificadoAno').value;

        if (titulo && instituicao && ano) {
            // Adiciona certificado ao array com um ID único
            const id = Date.now();
            curriculo.certificados.push({ id, titulo, instituicao, ano });
            
            // Limpa campos
            ['certificadoTitulo', 'certificadoInstituicao', 'certificadoAno'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
            // Remove indicador de edição se houver
            document.getElementById('certificadoEditandoId')?.remove();
            
            atualizarPreview();
            alert('Certificado adicionado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    }



    /**
     * Adiciona uma nova palestra/minicurso ao currículo
     */
    function adicionarPalestra() {
        const titulo = document.getElementById('palestraTitulo').value;
        const instituicao = document.getElementById('palestraInstituicao').value;

        if (titulo && instituicao) {
            // Adiciona palestra ao array com um ID único
            const id = Date.now();
            curriculo.palestras.push({ id, titulo, instituicao });
            
            // Limpa campos
            ['palestraTitulo', 'palestraInstituicao'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
            // Remove indicador de edição se houver
            document.getElementById('palestraEditandoId')?.remove();
            
            atualizarPreview();
            alert('Palestra/Minicurso adicionado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    }



    /**
     * Atualiza o preview do currículo em tempo real com layout ATS
     */
    /**
     * Atualiza o preview do currículo em tempo real com layout ATS
     */
    function atualizarPreview() {
        const previewContent = document.getElementById('previewContent');
        if (!previewContent) return;

        // Coleta dados pessoais
        const nome = document.getElementById('nome')?.value || 'SEU NOME';
        const cargo = document.getElementById('cargo')?.value || 'Seu Cargo';
        const email = document.getElementById('email')?.value || 'seu.email@exemplo.com';
        const telefone = document.getElementById('telefone')?.value || '(00) 00000-0000';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const github = document.getElementById('github')?.value || '';
        const site = document.getElementById('site')?.value || '';
        const resumoProfissional = document.getElementById('resumoProfissional')?.value || '';

        // Processa habilidades
        const habilidadesTec = (document.getElementById('habilidadesTec')?.value || '')
            .split(',').map(h => h.trim()).filter(Boolean);
        const habilidadesSoft = (document.getElementById('habilidadesSoft')?.value || '')
            .split(',').map(h => h.trim()).filter(Boolean);
        const idiomas = (document.getElementById('idiomas')?.value || '')
            .split(',').map(i => i.trim()).filter(Boolean);

        // Inicia estrutura ATS
        let html = `
            <h1>${nome.toUpperCase()}</h1>
            <p class="subtitle">${cargo}</p>
            
            <div class="sidebar">
        `;

        // === SIDEBAR: DETAILS ===
        html += `<div class="ats-sidebar-section">
            <h3>DETALHES</h3>
            <p><strong>Email</strong><br>${email}</p>
            <p><strong>Telefone</strong><br>${telefone}</p>`;
        
        if (linkedin) html += `<p><strong>LinkedIn</strong><br>${linkedin}</p>`;
        if (github) html += `<p><strong>GitHub</strong><br>${github}</p>`;
        if (site) html += `<p><strong>Website</strong><br>${site}</p>`;
        
        html += `</div>`;

        // Skills - com placeholder
        html += `<div class="ats-sidebar-section ${habilidadesTec.length === 0 ? 'placeholder' : ''}">
            <h3>HABILIDADES TÉCNICAS</h3>`;
        
        if (habilidadesTec.length > 0) {
            html += `<ul>`;
            habilidadesTec.forEach(skill => {
                html += `<li>${skill}</li>`;
            });
            html += `</ul>`;
        } else {
            html += `<p class="placeholder-text">Suas habilidades técnicas aparecerão aqui</p>`;
        }
        html += `</div>`;

        // Core Competencies - com placeholder
        html += `<div class="ats-sidebar-section ${habilidadesSoft.length === 0 ? 'placeholder' : ''}">
            <h3>HABILIDADES PESSOAIS</h3>`;
        
        if (habilidadesSoft.length > 0) {
            html += `<ul>`;
            habilidadesSoft.forEach(skill => {
                html += `<li>${skill}</li>`;
            });
            html += `</ul>`;
        } else {
            html += `<p class="placeholder-text">Suas habilidades pessoais aparecerão aqui</p>`;
        }
        html += `</div>`;

        // Languages - com placeholder
        html += `<div class="ats-sidebar-section ${idiomas.length === 0 ? 'placeholder' : ''}">
            <h3>IDIOMAS</h3>`;
        
        if (idiomas.length > 0) {
            html += `<ul>`;
            idiomas.forEach(lang => {
                html += `<li>${lang}</li>`;
            });
            html += `</ul>`;
        } else {
            html += `<p class="placeholder-text">Seus idiomas aparecerão aqui</p>`;
        }
        html += `</div>`;

        html += `</div><div class="main-content">`;

        // === MAIN CONTENT ===

        // Profile - com placeholder
        html += `<div class="ats-main-section ${!resumoProfissional ? 'placeholder' : ''}">
            <h2>RESUMO PROFISSIONAL</h2>`;
        
        if (resumoProfissional) {
            html += `<p>${resumoProfissional}</p>`;
        } else {
            html += `<p class="placeholder-text">Seu resumo profissional aparecerá aqui</p>`;
        }
        html += `</div>`;

        // Employment History - com placeholder
        const empresaTmp = document.getElementById('empresa')?.value || '';
        const cargoTmp = document.getElementById('cargoExp')?.value || '';
        const periodoTmp = document.getElementById('periodo')?.value || '';
        const descricaoTmp = document.getElementById('descricao')?.value || '';
        const temExperiencias = curriculo.experiencias.length > 0;
        const hasAnyExpTmp = empresaTmp || cargoTmp || periodoTmp || descricaoTmp;
        const shouldShowExpPlaceholder = !temExperiencias && !hasAnyExpTmp;

        html += `<div class="ats-main-section ${shouldShowExpPlaceholder ? 'placeholder' : ''}">
            <h2>EXPERIÊNCIAS</h2>`;
        
        if (temExperiencias) {
            curriculo.experiencias.forEach(exp => {
                // Converte quebras de linha em <br> para exibição no preview
                const descricaoFormatada = exp.descricao ? exp.descricao.replace(/\n/g, '<br>') : '';
                html += `
                    <div class="ats-job-entry" data-exp-id="${exp.id}">
                        <div class="ats-job-title">
                            <h4>${exp.cargo}</h4>
                            <button type="button" class="btn-edit-item" onclick="editarExperiencia(${exp.id})">✏️ Editar</button>
                        </div>
                        <div class="ats-job-company">${exp.empresa}</div>
                        <div class="ats-job-dates">${exp.periodo}</div>
                        ${exp.descricao ? `<div class="ats-job-description">${descricaoFormatada}</div>` : ''}
                    </div>
                `;
            });
        }

        if (hasAnyExpTmp) {
            // Converte quebras de linha em <br> para exibição no preview
            const descricaoTmpFormatada = descricaoTmp ? descricaoTmp.replace(/\n/g, '<br>') : '';
            html += `
                <div class="ats-job-entry temporary">
                    <div class="ats-job-title">
                        <h4>${cargoTmp || 'Job Title'}</h4>
                    </div>
                    <div class="ats-job-company">${empresaTmp || 'Company'}</div>
                    <div class="ats-job-dates">${periodoTmp || 'Period'}</div>
                    ${descricaoTmp ? `<div class="ats-job-description">${descricaoTmpFormatada}</div>` : ''}
                </div>
            `;
        }

        if (shouldShowExpPlaceholder) {
            html += `<p class="placeholder-text">Suas experiências profissionais aparecerão aqui</p>`;
        }

        html += `</div>`;

        // Education - com placeholder
        const instituicaoTmp = document.getElementById('instituicao')?.value || '';
        const cursoTmp = document.getElementById('curso')?.value || '';
        const periodoEduTmp = document.getElementById('periodoEdu')?.value || '';
        const tipoEduTmp = document.getElementById('tipoEdu')?.value || 'Ensino Superior';
        const temEducacao = curriculo.educacao.length > 0;
        const hasAnyEduTmp = instituicaoTmp || cursoTmp || periodoEduTmp;
        const shouldShowEduPlaceholder = !temEducacao && !hasAnyEduTmp;

        html += `<div class="ats-main-section ${shouldShowEduPlaceholder ? 'placeholder' : ''}">
            <h2>EDUCAÇÃO</h2>`;
        
        if (temEducacao) {
            curriculo.educacao.forEach(edu => {
                html += `
                    <div class="ats-education-entry" data-edu-id="${edu.id}">
                        <h4>${edu.tipo} em ${edu.curso}</h4>
                        <div class="ats-education-company">${edu.instituicao}</div>
                        <div class="ats-education-location">${edu.periodo}</div>
                        <button type="button" class="btn-edit-item" onclick="editarEducacao(${edu.id})">✏️ Editar</button>
                    </div>
                `;
            });
        }

        if (hasAnyEduTmp) {
            html += `
                <div class="ats-education-entry temporary">
                    <h4>${tipoEduTmp} in ${cursoTmp || 'Course'}</h4>
                    <div class="ats-education-company">${instituicaoTmp || 'Institution'}</div>
                    <div class="ats-education-location">${periodoEduTmp || 'Period'}</div>
                </div>
            `;
        }

        if (shouldShowEduPlaceholder) {
            html += `<p class="placeholder-text">Sua formação acadêmica aparecerá aqui</p>`;
        }

        html += `</div>`;

        // Certifications - com placeholder
        const certTituloTmp = document.getElementById('certificadoTitulo')?.value || '';
        const certInstTmp = document.getElementById('certificadoInstituicao')?.value || '';
        const certAnoTmp = document.getElementById('certificadoAno')?.value || '';
        const temCertificados = curriculo.certificados.length > 0;
        const hasAnyCertTmp = certTituloTmp || certInstTmp || certAnoTmp;
        const shouldShowCertPlaceholder = !temCertificados && !hasAnyCertTmp;

        html += `<div class="ats-main-section ${shouldShowCertPlaceholder ? 'placeholder' : ''}">
            <h2>CERTIFICADOS</h2>`;
        
        if (temCertificados) {
            curriculo.certificados.forEach(cert => {
                html += `
                    <div class="ats-certificate-entry" data-cert-id="${cert.id}">
                        <span class="ats-certificate-title">${cert.titulo}</span>
                        <span class="ats-certificate-issuer">${cert.instituicao} — ${cert.ano}</span>
                        <button type="button" class="btn-edit-item" onclick="editarCertificado(${cert.id})">✏️ Editar</button>
                    </div>
                `;
            });
        }

        if (hasAnyCertTmp) {
            html += `
                <div class="ats-certificate-entry temporary">
                    <span class="ats-certificate-title">${certTituloTmp || 'Certificate Title'}</span>
                    <span class="ats-certificate-issuer">${certInstTmp || 'Issuer'} ${certAnoTmp ? '— ' + certAnoTmp : ''}</span>
                </div>
            `;
        }

        if (shouldShowCertPlaceholder) {
            html += `<p class="placeholder-text">Seus certificados aparecerão aqui</p>`;
        }

        html += `</div>`;

        // Presentations - com placeholder
        const palestraTituloTmp = document.getElementById('palestraTitulo')?.value || '';
        const palestraInstTmp = document.getElementById('palestraInstituicao')?.value || '';
        const temPalestras = curriculo.palestras.length > 0;
        const hasAnyPalTmp = palestraTituloTmp || palestraInstTmp;
        const shouldShowPalPlaceholder = !temPalestras && !hasAnyPalTmp;

        html += `<div class="ats-main-section ${shouldShowPalPlaceholder ? 'placeholder' : ''}">
            <h2>PALESTRAS E MINICURSOS</h2>`;
        
        if (temPalestras) {
            curriculo.palestras.forEach(palestra => {
                html += `
                    <div class="ats-certificate-entry" data-pal-id="${palestra.id}">
                        <span class="ats-certificate-title">${palestra.titulo}</span>
                        <span class="ats-certificate-issuer">${palestra.instituicao}</span>
                        <button type="button" class="btn-edit-item" onclick="editarPalestra(${palestra.id})">✏️ Editar</button>
                    </div>
                `;
            });
        }

        if (hasAnyPalTmp) {
            html += `
                <div class="ats-certificate-entry temporary">
                    <span class="ats-certificate-title">${palestraTituloTmp || 'Presentation Title'}</span>
                    <span class="ats-certificate-issuer">${palestraInstTmp || 'Organization'}</span>
                </div>
            `;
        }

        if (shouldShowPalPlaceholder) {
            html += `<p class="placeholder-text">Suas palestras e minicursos aparecerão aqui</p>`;
        }

        html += `</div>`;

        html += `</div>`;

        // Atualiza o conteúdo do preview
        previewContent.innerHTML = html;
    }

    // Atribui a função atualizarPreview ao escopo global
    window.atualizarPreviewGlobal = atualizarPreview;
    
    // Preview em tempo real - atualiza ao digitar
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', atualizarPreview);
    });

    // Inicializa o preview vazio
    atualizarPreview();
});

/**
 * Carrega uma experiência para edição (FUNÇÃO GLOBAL)
 */
window.editarExperiencia = function(id) {
    const exp = curriculo.experiencias.find(e => e.id === id);
    if (exp) {
        document.getElementById('empresa').value = exp.empresa;
        document.getElementById('cargoExp').value = exp.cargo;
        document.getElementById('periodo').value = exp.periodo;
        document.getElementById('descricao').value = exp.descricao;
        
        // Remove a experiência do array para edição
        curriculo.experiencias = curriculo.experiencias.filter(e => e.id !== id);
        
        // Atualiza o preview
        if (window.atualizarPreviewGlobal) {
            window.atualizarPreviewGlobal();
        }
        
        alert('Experiência carregada para edição. Modifique os campos e clique em "+ Adicionar Experiência" novamente.');
    }
};

/**
 * Carrega uma formação para edição (FUNÇÃO GLOBAL)
 */
window.editarEducacao = function(id) {
    const edu = curriculo.educacao.find(e => e.id === id);
    if (edu) {
        document.getElementById('instituicao').value = edu.instituicao;
        document.getElementById('curso').value = edu.curso;
        document.getElementById('periodoEdu').value = edu.periodo;
        document.getElementById('tipoEdu').value = edu.tipo;
        
        // Remove a educação do array para edição
        curriculo.educacao = curriculo.educacao.filter(e => e.id !== id);
        
        if (window.atualizarPreviewGlobal) {
            window.atualizarPreviewGlobal();
        }
        
        alert('Formação carregada para edição. Modifique os campos e clique em "+ Adicionar Formação" novamente.');
    }
};

/**
 * Carrega um certificado para edição (FUNÇÃO GLOBAL)
 */
window.editarCertificado = function(id) {
    const cert = curriculo.certificados.find(c => c.id === id);
    if (cert) {
        document.getElementById('certificadoTitulo').value = cert.titulo;
        document.getElementById('certificadoInstituicao').value = cert.instituicao;
        document.getElementById('certificadoAno').value = cert.ano;
        
        // Remove o certificado do array para edição
        curriculo.certificados = curriculo.certificados.filter(c => c.id !== id);
        
        if (window.atualizarPreviewGlobal) {
            window.atualizarPreviewGlobal();
        }
        
        alert('Certificado carregado para edição. Modifique os campos e clique em "+ Adicionar Certificado" novamente.');
    }
};

/**
 * Carrega uma palestra para edição (FUNÇÃO GLOBAL)
 */
window.editarPalestra = function(id) {
    const pal = curriculo.palestras.find(p => p.id === id);
    if (pal) {
        document.getElementById('palestraTitulo').value = pal.titulo;
        document.getElementById('palestraInstituicao').value = pal.instituicao;
        
        // Remove a palestra do array para edição
        curriculo.palestras = curriculo.palestras.filter(p => p.id !== id);
        
        if (window.atualizarPreviewGlobal) {
            window.atualizarPreviewGlobal();
        }
        
        alert('Palestra carregada para edição. Modifique os campos e clique em "+ Adicionar Palestra/Minicurso" novamente.');
    }
};