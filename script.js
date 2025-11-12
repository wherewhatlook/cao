// 信封动画功能
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.querySelector('.envelope');
    const envelopeAnimation = document.getElementById('envelopeAnimation');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (envelope && envelopeAnimation) {
        // 点击信封触发动画
        envelope.addEventListener('click', function() {
            // 添加打开动画类
            this.classList.add('open');
        });
        
        // 点击确定按钮后显示主内容
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                // 隐藏信封动画
                envelopeAnimation.style.opacity = '0';
                
                // 完全隐藏信封动画后显示主内容
                setTimeout(() => {
                    envelopeAnimation.style.display = 'none';
                    
                    // 显示主内容区域
                    const main = document.querySelector('main');
                    if (main) {
                        main.style.display = 'block';
                        // 触发主内容区域的淡入效果
                        main.style.opacity = '0';
                        main.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            main.style.transition = 'opacity 1s ease, transform 1s ease';
                            main.style.opacity = '1';
                            main.style.transform = 'translateY(0)';
                            
                            // 播放背景音乐
                            const backgroundMusic = document.getElementById('background-music');
                            if (backgroundMusic) {
                                // 尝试播放音乐
                                const playPromise = backgroundMusic.play();
                                
                                if (playPromise !== undefined) {
                                    playPromise.catch(error => {
                                        // 自动播放被阻止，添加用户交互来播放音乐
                                        console.log("自动播放被阻止:", error);
                                        // 创建一个提示用户点击页面以播放音乐的元素
                                        const playHint = document.createElement('div');
                                        playHint.id = 'music-play-hint';
                                        playHint.innerHTML = '点击页面播放音乐';
                                        playHint.style.position = 'fixed';
                                        playHint.style.bottom = '20px';
                                        playHint.style.right = '20px';
                                        playHint.style.backgroundColor = '#ff9eb5';
                                        playHint.style.color = 'white';
                                        playHint.style.padding = '10px 15px';
                                        playHint.style.borderRadius = '20px';
                                        playHint.style.cursor = 'pointer';
                                        playHint.style.zIndex = '9999';
                                        playHint.style.fontSize = '14px';
                                        
                                        document.body.appendChild(playHint);
                                        
                                        // 添加点击事件来播放音乐
                                        playHint.addEventListener('click', function() {
                                            backgroundMusic.volume = 0.3;
                                            backgroundMusic.play();
                                            document.body.removeChild(playHint);
                                        });
                                        
                                        // 也可以点击页面任何地方播放音乐
                                        document.body.addEventListener('click', function playMusicOnce() {
                                            backgroundMusic.volume = 0.3;
                                            backgroundMusic.play();
                                            document.body.removeEventListener('click', playMusicOnce);
                                            if (document.getElementById('music-play-hint')) {
                                                document.body.removeChild(document.getElementById('music-play-hint'));
                                            }
                                        });
                                    });
                                }
                            }
                        }, 300);
                    }
                }, 500);
            });
        }
    }
});

// 汉堡菜单功能
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// 添加页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 为每个部分添加进入视图时的动画
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// 添加到所有需要动画的元素的CSS类
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);