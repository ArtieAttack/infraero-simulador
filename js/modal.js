// =============================================
// CONTROLE DE MODAIS
// =============================================

import { trilhasData } from './data.js';

// Função para abrir modal de vídeo
export function abrirModalVideo(numero) {
  console.log('Abrindo modal de vídeo para trilha:', numero);
  const trilha = trilhasData[numero];
  const modal = document.getElementById('modalVideo');

  if (!trilha || !modal) {
    console.error('Trilha ou modal não encontrado:', { trilha, modal });
    return;
  }

  // Verificar se o vídeo tem URL válida
  if (!trilha.video.url || trilha.video.url.trim() === '') {
    console.warn('Trilha sem vídeo - URL vazia:', numero);
    // Para trilhas sem vídeo, iniciar simulado diretamente
    console.log('Iniciando simulado diretamente para trilha sem vídeo:', numero);
    setTimeout(() => {
      window.iniciarSimulado(numero);
    }, 100);
    return;
  }

  // Atualizar conteúdo do modal
  document.getElementById('videoTitulo').textContent = trilha.video.titulo;
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = trilha.video.url;

  // Atualizar botão de iniciar simulado
  const btnIniciarSimulado = document.getElementById('btnIniciarSimulado');

  // Remover listener anterior se existir
  btnIniciarSimulado.replaceWith(btnIniciarSimulado.cloneNode(true));
  const novoBtnIniciarSimulado = document.getElementById('btnIniciarSimulado');

  novoBtnIniciarSimulado.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Iniciando simulado para trilha:', numero);
    window.iniciarSimulado(numero);
  });

  // Aplicar classe de cor do modal
  modal.className = `modal-video ativo ${trilha.classe}`;

  // Mostrar modal
  document.body.style.overflow = 'hidden';
  console.log('Modal de vídeo aberto');
}

// Função para fechar modal de vídeo
export function fecharModalVideo() {
  const modal = document.getElementById('modalVideo');
  const video = document.getElementById('videoPlayer');

  if (modal) {
    modal.classList.remove('ativo');
    video.pause();
    document.body.style.overflow = 'auto';
  }
}

// Função para fechar modal do simulado
export function fecharModalSimulado() {
  const modal = document.getElementById('modalSimulado');
  if (modal) {
    modal.classList.remove('ativo');
    document.body.style.overflow = 'auto';

    // Resetar modal para próxima vez
    document.getElementById('questaoContainer').style.display = 'block';
    document.getElementById('resultadoContainer').style.display = 'none';
    document.querySelector('.progresso').style.display = 'flex';

    // Remover classe especial do footer
    const footer = document.querySelector('.simulado-footer');
    if (footer) {
      footer.classList.remove('resultado-ativo');
    }

    // Limpar classes de resultado do body
    const simuladoBody = document.querySelector('.simulado-body');
    if (simuladoBody) {
      simuladoBody.classList.remove('resultado-modo', 'resultado-compacto');
    }

    // Esconder botões de resultado
    const btnProximaArea = document.getElementById('btnProximaArea');
    const btnTenteNovamente = document.getElementById('btnTenteNovamente');

    if (btnProximaArea) {
      btnProximaArea.style.display = 'none';
    }
    if (btnTenteNovamente) {
      btnTenteNovamente.style.display = 'none';
    }
  }
}
