/**
 * RESUME-GENERATOR.JS
 * Gerador de Currículo
 * Gerencia a criação, preview e exportação de currículos
 */

document.addEventListener('DOMContentLoaded', () => {
    // Estado global do currículo - armazena todos os dados inseridos
    const curriculo = {
        experiencias: [],
        educacao: [],
        habilidadesTec: [],
        habilidadesSoft: [],
        idiomas: [],
        certificados: [],
        palestras: []
    };

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
        btnGerar.addEventListener('click', () => {
            alert('Função de gerar PDF será implementada!');
        });
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
            // Adiciona experiência ao array
            curriculo.experiencias.push({ empresa, cargo, periodo, descricao });
            
            // Limpa os campos do formulário
            ['empresa', 'cargoExp', 'periodo', 'descricao'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
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
            curriculo.educacao.push({ instituicao, curso, periodo, tipo });
            
            // Limpa campos
            ['instituicao', 'curso', 'periodoEdu'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
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
            curriculo.certificados.push({ titulo, instituicao, ano });
            
            // Limpa campos
            ['certificadoTitulo', 'certificadoInstituicao', 'certificadoAno'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
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
            curriculo.palestras.push({ titulo, instituicao });
            
            // Limpa campos
            ['palestraTitulo', 'palestraInstituicao'].forEach(id => {
                const campo = document.getElementById(id);
                if (campo) campo.value = '';
            });
            
            atualizarPreview();
            alert('Palestra/Minicurso adicionado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    }

    /**
     * Atualiza o preview do currículo em tempo real
     */
    function atualizarPreview() {
        const previewContent = document.getElementById('previewContent');
        if (!previewContent) return;

        // Coleta dados pessoais
        const nome = document.getElementById('nome')?.value || 'Seu Nome';
        const cargo = document.getElementById('cargo')?.value || 'Seu Cargo';
        const email = document.getElementById('email')?.value || 'seu.email@exemplo.com';
        const telefone = document.getElementById('telefone')?.value || '(00) 00000-0000';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const github = document.getElementById('github')?.value || '';
        const site = document.getElementById('site')?.value || '';
        const resumoProfissional = document.getElementById('resumoProfissional')?.value || '';

        // Processa habilidades (separa por vírgula)
        const habilidadesTec = document.getElementById('habilidadesTec')?.value
            .split(',').map(h => h.trim()).filter(Boolean) || [];
        const habilidadesSoft = document.getElementById('habilidadesSoft')?.value
            .split(',').map(h => h.trim()).filter(Boolean) || [];
        const idiomas = document.getElementById('idiomas')?.value
            .split(',').map(i => i.trim()).filter(Boolean) || [];

        // Monta o HTML do preview
        let html = `
            <h2>${nome}</h2>
            <h3>${cargo}</h3>
            <p>📧 ${email}</p>
            <p>📱 ${telefone}</p>
            ${linkedin ? `<p>🔗 LinkedIn: ${linkedin}</p>` : ''}
            ${github ? `<p>💻 GitHub: ${github}</p>` : ''}
            ${site ? `<p>🌐 Site: ${site}</p>` : ''}
        `;

        // Adiciona resumo profissional
        if (resumoProfissional) {
            html += `
                <h3>Resumo Profissional</h3>
                <p>${resumoProfissional}</p>
            `;
        }

        // Adiciona experiências profissionais
        if (curriculo.experiencias.length > 0) {
            html += '<h3>Experiência Profissional</h3>';
            curriculo.experiencias.forEach(exp => {
                html += `
                    <div class="experiencia">
                        <h4>${exp.cargo} - ${exp.empresa}</h4>
                        <p>${exp.periodo}</p>
                        ${exp.descricao ? `<p>${exp.descricao}</p>` : ''}
                    </div>
                `;
            });
        }

        // Adiciona formação acadêmica
        if (curriculo.educacao.length > 0) {
            html += '<h3>Formação Acadêmica</h3>';
            curriculo.educacao.forEach(edu => {
                html += `
                    <div class="educacao">
                        <h4>${edu.tipo} em ${edu.curso}</h4>
                        <p>${edu.instituicao} - ${edu.periodo}</p>
                    </div>
                `;
            });
        }

        // Adiciona habilidades técnicas
        if (habilidadesTec.length > 0) {
            html += '<h3>Habilidades Técnicas</h3>';
            html += '<p>' + habilidadesTec.join(', ') + '</p>';
        }

        // Adiciona habilidades pessoais
        if (habilidadesSoft.length > 0) {
            html += '<h3>Habilidades Pessoais</h3>';
            html += '<p>' + habilidadesSoft.join(', ') + '</p>';
        }

        // Adiciona idiomas
        if (idiomas.length > 0) {
            html += '<h3>Idiomas</h3>';
            html += '<p>' + idiomas.join(', ') + '</p>';
        }

        // Adiciona certificados
        if (curriculo.certificados.length > 0) {
            html += '<h3>Certificações</h3>';
            curriculo.certificados.forEach(cert => {
                html += `
                    <div class="certificado">
                        <h4>${cert.titulo}</h4>
                        <p>${cert.instituicao} - ${cert.ano}</p>
                    </div>
                `;
            });
        }

        // Adiciona palestras e minicursos
        if (curriculo.palestras.length > 0) {
            html += '<h3>Palestras e Minicursos</h3>';
            curriculo.palestras.forEach(palestra => {
                html += `
                    <div class="palestra">
                        <h4>${palestra.titulo}</h4>
                        <p>${palestra.instituicao}</p>
                    </div>
                `;
            });
        }

        // Atualiza o conteúdo do preview
        previewContent.innerHTML = html;
    }

    // Preview em tempo real - atualiza ao digitar
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', atualizarPreview);
    });

    // Inicializa o preview vazio
    atualizarPreview();
});