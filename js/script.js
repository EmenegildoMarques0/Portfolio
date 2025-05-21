// Alternar modo claro/escuro
const toggleThemeBtn = document.getElementById('toggle-theme');
const body = document.body;

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark');
    toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Salvar preferência no localStorage
function saveThemePref(isDark) {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Carregar preferência
function loadThemePref() {
  const pref = localStorage.getItem('theme');
  if (pref === 'dark') setTheme(true);
  else setTheme(false);
}

// Alternar ao clicar
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark');
    setTheme(isDark);
    saveThemePref(isDark);
  });
}

// Inicializar tema
loadThemePref();

// Feedback simples no formulário de contato
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada! (Funcionalidade de envio deve ser integrada a um serviço como Formspree ou EmailJS)');
    contactForm.reset();
  });
}

// Seleção de elementos
const navLinks = document.querySelectorAll('.nav-bar a');
const header = document.querySelector('.header-dark');
const navBar = document.querySelector('.nav-bar');
const showTopBtn = document.querySelector('.show-top-btn');
const expToggles = document.querySelectorAll('.exp-toggle');

// Função para esconder o topo
function hideTop() {
    header.classList.add('hide');
    navBar.classList.add('hide');
    showTopBtn.classList.add('show');
}

// Função para mostrar o topo
function showTop() {
    header.classList.remove('hide');
    navBar.classList.remove('hide');
    showTopBtn.classList.remove('show');
}

// Criar e adicionar o botão de mostrar topo
if (!document.querySelector('.show-top-btn')) {
    const btn = document.createElement('button');
    btn.className = 'show-top-btn';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i> Mostrar topo';
    document.body.appendChild(btn);
    btn.addEventListener('click', showTop);
}

// Adicionar event listeners para os links de navegação
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Verificar se é um link interno
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Esconder o topo após um pequeno delay
                setTimeout(hideTop, 100);
                
                // Scroll suave para o elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Adicionar event listeners para os toggles de experiência
expToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Atualizar estado do toggle
        toggle.setAttribute('aria-expanded', !isExpanded);
        toggle.classList.toggle('active');
        
        // Atualizar conteúdo
        content.classList.toggle('active');
        
        // Atualizar altura máxima do conteúdo
        if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    });
});

// Adicionar event listener para o botão de mostrar topo
showTopBtn.addEventListener('click', showTop);

// Adicionar event listener para scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostrar/esconder botão de voltar ao topo
    if (scrollTop > 300) {
        showTopBtn.classList.add('show');
    } else {
        showTopBtn.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Adicionar event listener para teclado
document.addEventListener('keydown', (e) => {
    // Tecla Escape para mostrar o topo
    if (e.key === 'Escape') {
        showTop();
    }
});

// Adicionar event listener para touch
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const touchDiff = touchStartY - touchEndY;
    
    // Swipe para cima para esconder o topo
    if (touchDiff > 50) {
        hideTop();
    }
    // Swipe para baixo para mostrar o topo
    else if (touchDiff < -50) {
        showTop();
    }
}, { passive: true }); 