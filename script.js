// 整合所有初始化代码到一个 DOMContentLoaded 事件中
document.addEventListener('DOMContentLoaded', () => {
    // 滚动监听初始化
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function updateActiveNav() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // 移动端菜单初始化
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 滚动时隐藏菜单
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });

    // 初始化流星效果
    createShootingStars();
    setInterval(createShootingStars, 8000);

    // 窗口大小改变时重新生成流星
    window.addEventListener('resize', createShootingStars);
});

// 滚动动画观察器
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 流星效果函数
function createShootingStars() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // 清除现有的流星
    const existingStars = document.querySelectorAll('.shooting-star');
    existingStars.forEach(star => star.remove());

    // 创建新的流星
    const numberOfStars = 8;  // 减少流星数量从20到8
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // 随机起始位置
        const startX = Math.random() * hero.offsetWidth;
        const startY = Math.random() * hero.offsetHeight;
        
        // 随机延迟和持续时间
        const delay = Math.random() * 8;  // 减少最大延迟从15s到8s
        const duration = 2 + Math.random() * 1;  // 减少持续时间范围
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        hero.appendChild(star);
    }
}

// 添加复制功能
const copyBtn = document.querySelector('.copy-btn');
copyBtn?.addEventListener('click', async () => {
    const referralLink = document.querySelector('.referral-link input');
    try {
        await navigator.clipboard.writeText(referralLink.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}); 