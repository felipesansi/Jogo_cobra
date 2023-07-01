document.addEventListener('DOMContentLoaded', () => {
  // Configurações do jogo
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  const gridSize = 20;
  const gridWidth = canvas.width / gridSize;
  const gridHeight = canvas.height / gridSize;
  const reiniarjogo = document.getElementById('btn_reiniciar');
 
  var  velocidade =8;

  reiniarjogo.addEventListener('click',function(){
    location.reload();
  });
 // Estado do jogo
 let snake = [{ x: 10, y: 10 }];
 let direction = 'right';
 let pontos = 0;
 let tempo = 70; 
 let comida = gerar_comida(); // Comida da cobrinha

 // Função para atualizar o estado do jogo
 function update() {
   // Movimentar a cobrinha
   const head = { x: snake[0].x, y: snake[0].y };
   switch (direction) {
     case 'up':
       head.y -= 1;
       break;
     case 'down':
       head.y += 1;
       break;
     case 'left':
       head.x -= 1;
       break;
     case 'right':
       head.x += 1;
       break;
   }

   // Verificar colisão com as bordas do tabuleiro
   if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
     gameOver();
     return;
   }

   // Verificar colisão com a própria cobrinha
   if (snake.some(segment => segment.x === head.x && segment.y === head.y && segment !== head)) {
     gameOver();
     return;
   }

   // Verificar colisão com a comida
   if (head.x === comida.x && head.y === comida.y) {
     // Aumentar o tamanho da cobrinha
     snake.push({ x: comida.x, y: comida.y });
     // Incrementar o pontos
     pontos++;
     tempo = tempo+ 60;
     
     // Gerar nova comida
     comida = gerar_comida();
   } else {
     // Remover a cauda da cobrinha se não houver colisão com a comida
     snake.pop();
   }

   snake.unshift(head);

   // Limpar o canvas
   context.clearRect(0, 0, canvas.width, canvas.height);

   // Desenhar a cobrinha
   context.fillStyle = 'blue';
   snake.forEach(segment => {
     context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
   });

   // Desenhar a comida
   context.fillStyle = 'green';
   context.fillRect(comida.x * gridSize, comida.y * gridSize, gridSize, gridSize);

   // Atualizar o contador de tempo
   tempo= tempo- 1;
   

   // Verificar se o tempo acabou
   if (tempo<= 0) {
     gameOver();
     return;
   }

   // Atualizar o contador de tempo na tela
   document.getElementById('Tempo').textContent = tempo;

   // Atualizar o contador de pontos (pontos) na tela
   document.getElementById('pontos').textContent = pontos;

   // Agendar a próxima atualização
   setTimeout(update, 1000 / velocidade);
   
  }

  // Função para gerar uma nova posição para a comida
  function gerar_comida() {
    return {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    };
  }

  // Função para lidar com as teclas pressionadas
  function handleKeyPress(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
  }

  // Função para encerrar o jogo
  function gameOver() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Exibir mensagem de fim de jogo
    context.fillStyle = 'green';
    context.font = '60px Arial';
    context.fillText('Você Perdeu! reinicie', canvas.width / 2.7 - 100, canvas.height / 2);
  }

  // Adicionar o evento de pressionar tecla
  document.addEventListener('keydown', handleKeyPress);

  // Iniciar o jogo
  update();
});
 