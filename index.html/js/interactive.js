// 大运河文化之旅 - 交互功能脚本

document.addEventListener('DOMContentLoaded', function() {
    // 菜单项点击交互效果
    initMenuInteraction();
    
    // 内容卡片交互效果
    initCardInteraction();
    
    // 图片放大功能
    initImageZoom();
    
    // 滚动效果
    initScrollEffects();
    
    // 主题切换功能
    initThemeToggle();
    
    // 返回顶部按钮
    initBackToTop();
    
    // 背景音乐控制
    initMusicControl();
});

// 菜单项点击交互效果
function initMenuInteraction() {
    const menuItems = document.querySelectorAll('.menu ul li');
    
    menuItems.forEach(item => {
        // 检查是否包含链接
        const link = item.querySelector('a');
        
        // 如果是链接项，只添加波纹效果，不处理内容切换
        if (link) {
            item.addEventListener('click', function(e) {
                // 添加点击波纹效果
                createRippleEffect(this, e);
                
                // 不阻止默认行为，让链接正常工作
                // 但添加一个短暂的延迟，让波纹效果可见
                setTimeout(() => {
                    // 链接会自然跳转
                }, 200);
            });
        } else {
            // 非链接项（如"运河文化"）的处理
            item.addEventListener('click', function(e) {
                // 移除所有活动状态
                menuItems.forEach(i => i.classList.remove('active'));
                
                // 添加当前活动状态
                this.classList.add('active');
                
                // 添加点击波纹效果
                createRippleEffect(this, e);
                
                // 根据菜单项显示对应内容
                const itemText = this.textContent.trim();
                showContentByMenu(itemText);
            });
        }
    });
    
    // 确保运河文化菜单项默认为活动状态
    const canalCultureItem = Array.from(menuItems).find(item => 
        item.textContent.trim() === '运河文化'
    );
    
    if (canalCultureItem) {
        canalCultureItem.classList.add('active');
        // 触发点击事件以显示相关内容
        setTimeout(() => {
            canalCultureItem.click();
        }, 100);
    }
}

// 创建点击波纹效果
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 根据菜单项显示对应内容
function showContentByMenu(menuText) {
    const contentCards = document.querySelectorAll('.parent > div');
    
    // 简单的菜单项与内容映射
    switch(menuText) {
        case '网站首页':
            showAllCards(contentCards);
            break;
        case '运河历史':
            highlightCard(contentCards, 2); // 建筑遗产
            break;
        case '运河文化':
            // 显示所有卡片，因为整个页面都是关于运河文化的内容
            showAllCards(contentCards);
            break;
    }
}

// 显示所有卡片
function showAllCards(cards) {
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.filter = 'none';
    });
}

// 高亮特定卡片
function highlightCard(cards, index) {
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1.05)';
            card.style.filter = 'none';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            card.style.zIndex = '10';
        } else {
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
            card.style.filter = 'grayscale(50%)';
            card.style.boxShadow = 'none';
            card.style.zIndex = '1';
        }
        card.style.transition = 'all 0.5s ease';
    });
}

// 高亮多个卡片
function highlightCards(cards, indices) {
    cards.forEach((card, i) => {
        if (indices.includes(i)) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1.03)';
            card.style.filter = 'none';
            card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            card.style.zIndex = '5';
        } else {
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
            card.style.filter = 'grayscale(50%)';
            card.style.boxShadow = 'none';
            card.style.zIndex = '1';
        }
        card.style.transition = 'all 0.5s ease';
    });
}

// 内容卡片交互效果
function initCardInteraction() {
    const cards = document.querySelectorAll('.parent > div');
    
    cards.forEach(card => {
        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// 图片放大功能
function initImageZoom() {
    const images = document.querySelectorAll('.parent img');
    
    images.forEach(img => {
        // 添加鼠标悬停效果
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            this.style.cursor = 'zoom-in';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 点击放大功能
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            createImageModal(this.src, this.alt);
        });
    });
}

// 创建图片模态框
function createImageModal(src, alt) {
    // 检查是否已存在模态框
    if (document.querySelector('.image-modal')) {
        return;
    }
    
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.style.cursor = 'zoom-out';
    
    // 创建放大图片
    const modalImg = document.createElement('img');
    modalImg.src = src;
    modalImg.alt = alt;
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.objectFit = 'contain';
    modalImg.style.transform = 'scale(0)';
    modalImg.style.transition = 'transform 0.3s ease';
    
    // 添加关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '40px';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = '0.3s';
    
    // 添加图片标题
    const caption = document.createElement('div');
    caption.textContent = alt || '大运河文化图片';
    caption.style.position = 'absolute';
    caption.style.bottom = '20px';
    caption.style.left = '0';
    caption.style.width = '100%';
    caption.style.textAlign = 'center';
    caption.style.color = 'white';
    caption.style.fontSize = '18px';
    
    // 组装模态框
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(caption);
    document.body.appendChild(modal);
    
    // 显示动画
    setTimeout(() => {
        modalImg.style.transform = 'scale(1)';
    }, 10);
    
    // 关闭模态框事件
    function closeModal() {
        modalImg.style.transform = 'scale(0)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
}

// 滚动效果
function initScrollEffects() {
    const header = document.querySelector('.header-content');
    const menu = document.querySelector('.menu');
    const cards = document.querySelectorAll('.parent > div');
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 菜单固定效果
        if (scrollPosition > 200) {
            menu.style.position = 'fixed';
            menu.style.top = '0';
            menu.style.zIndex = '100';
            menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            menu.style.position = '';
            menu.style.top = '';
            menu.style.zIndex = '';
            menu.style.boxShadow = '';
        }
        
        // 卡片渐入效果
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    // 初始化卡片状态
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 触发初始滚动检查
    window.dispatchEvent(new Event('scroll'));
}

// 主题切换功能
function initThemeToggle() {
    // 创建主题切换按钮
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.left = '20px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.backgroundColor = '#f0f0f0';
    themeToggle.style.display = 'flex';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.fontSize = '24px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    themeToggle.style.zIndex = '100';
    themeToggle.style.transition = 'all 0.3s ease';
    
    // 添加悬停效果
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    // 点击切换主题
    themeToggle.addEventListener('click', function() {
        const body = document.body;
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // 切换到日间模式
            body.classList.remove('dark-mode');
            this.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
            
            // 恢复原始样式
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--card-bg-1', 'antiquewhite');
            document.documentElement.style.setProperty('--card-bg-2', '#EEDCCB');
            document.documentElement.style.setProperty('--card-bg-3', '#EED7C9');
        } else {
            // 切换到夜间模式
            body.classList.add('dark-mode');
            this.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
            
            // 设置夜间模式样式
            document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--card-bg-1', '#2d2d2d');
            document.documentElement.style.setProperty('--card-bg-2', '#333333');
            document.documentElement.style.setProperty('--card-bg-3', '#3a3a3a');
        }
        
        // 应用主题变化
        applyThemeStyles();
    });
    
    // 添加到页面
    document.body.appendChild(themeToggle);
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeToggle.click();
    }
}

// 应用主题样式
function applyThemeStyles() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const body = document.body;
    const header = document.querySelector('.header-content');
    const menu = document.querySelector('.menu');
    const cards = document.querySelectorAll('.parent > div');
    
    if (isDarkMode) {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#f0f0f0';
        header.style.color = '#f0f0f0';
        menu.style.backgroundColor = '#222222';
        
        cards[0].style.backgroundColor = '#2d2d2d';
        cards[1].style.backgroundColor = '#333333';
        cards[2].style.backgroundColor = '#3a3a3a';
        
        cards.forEach(card => {
            card.style.color = '#f0f0f0';
        });
    } else {
        body.style.backgroundColor = '';
        body.style.color = '';
        header.style.color = '';
        menu.style.backgroundColor = '';
        
        cards[0].style.backgroundColor = '';
        cards[1].style.backgroundColor = '';
        cards[2].style.backgroundColor = '';
        
        cards.forEach(card => {
            card.style.color = '';
        });
    }
}

// 返回顶部按钮
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '20px';
    backToTop.style.right = '80px'; // 调整位置，为音乐控制按钮让出空间
    backToTop.style.width = '50px';
    backToTop.style.height = '50px';
    backToTop.style.borderRadius = '50%';
    backToTop.style.backgroundColor = '#753F2D';
    backToTop.style.color = 'white';
    backToTop.style.display = 'flex';
    backToTop.style.justifyContent = 'center';
    backToTop.style.alignItems = 'center';
    backToTop.style.fontSize = '24px';
    backToTop.style.cursor = 'pointer';
    backToTop.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    backToTop.style.zIndex = '100';
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
    backToTop.style.transition = 'all 0.3s ease';
    
    // 添加悬停效果
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#8B4F3D';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.backgroundColor = '';
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 添加到页面
    document.body.appendChild(backToTop);
    
    // 滚动显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
}

// 背景音乐控制
function initMusicControl() {
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    const backgroundMusic = document.getElementById('background-music');
    
    // 初始化音乐状态
    let isPlaying = false;
    
    // 设置音乐音量
    backgroundMusic.volume = 0.3; // 设置为30%音量
    
    // 点击音乐控制按钮
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            // 暂停音乐
            backgroundMusic.pause();
            musicIcon.textContent = '🎵';
            musicControl.classList.remove('music-playing');
            isPlaying = false;
        } else {
            // 播放音乐
            // 处理浏览器自动播放策略
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // 自动播放成功
                    musicIcon.textContent = '🔇';
                    musicControl.classList.add('music-playing');
                    isPlaying = true;
                })
                .catch(error => {
                    // 自动播放被阻止，显示提示
                    console.log('音乐自动播放被阻止:', error);
                    showMusicPlayPrompt();
                });
            }
        }
    });
    
    // 显示音乐播放提示
    function showMusicPlayPrompt() {
        // 创建提示元素
        const prompt = document.createElement('div');
        prompt.style.position = 'fixed';
        prompt.style.top = '50%';
        prompt.style.left = '50%';
        prompt.style.transform = 'translate(-50%, -50%)';
        prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        prompt.style.color = 'white';
        prompt.style.padding = '20px';
        prompt.style.borderRadius = '10px';
        prompt.style.zIndex = '1001';
        prompt.style.textAlign = 'center';
        prompt.innerHTML = `
            <p>浏览器已阻止音乐自动播放</p>
            <p>请点击音乐按钮手动播放</p>
            <button id="close-prompt" style="margin-top: 10px; padding: 5px 15px; background: #753F2D; color: white; border: none; border-radius: 5px; cursor: pointer;">确定</button>
        `;
        
        // 添加到页面
        document.body.appendChild(prompt);
        
        // 关闭提示
        document.getElementById('close-prompt').addEventListener('click', function() {
            document.body.removeChild(prompt);
        });
        
        // 3秒后自动关闭
        setTimeout(() => {
            if (document.body.contains(prompt)) {
                document.body.removeChild(prompt);
            }
        }, 3000);
    }
    
    // 音乐播放结束时重新开始
    backgroundMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
    
    // 尝试自动播放（可能会被浏览器阻止）
    document.addEventListener('click', function initAudio() {
        if (!isPlaying) {
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    musicIcon.textContent = '🔇';
                    musicControl.classList.add('music-playing');
                    isPlaying = true;
                })
                .catch(error => {
                    console.log('音乐播放失败:', error);
                });
            }
            
            // 移除事件监听器，只需要尝试一次
            document.removeEventListener('click', initAudio);
        }
    }, { once: true });
}