const glide = new Glide(".glide")
const captionEl = document.querySelectorAll('.slide-caption')
const headerEl = document.querySelector('header')
const scrollToTop = document.querySelector('.scrollToTop')
window.onscroll = (e)=>{
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let {height} = headerEl.getBoundingClientRect()
    if(scrollTop - height > 800){
        if(!headerEl.classList.contains('sticky')){
            headerEl.classList.add('sticky')
        }
    }else{
        headerEl.classList.remove('sticky')
    }
    if(scrollTop > 2000){
        scrollToTop.style.display = 'block'
    }else{
        scrollToTop.style.display = 'none'
    }
}
// 轮播事件
// mount.after 轮播挂载之后事件
// run.after 轮播图轮播之后事件
glide.on(['mount.after', 'run.after'], () => {
    const caption = captionEl[glide.index]
    anime({ // 动画函数 anime
        targets: caption.children, // 对哪些元素进行动画
        opacity: [0, 1], // 设置动画效果从透明到不透明
        duration: 400, // 设置动画时间
        easing: 'linear', // 设置动画过渡效果
        delay: anime.stagger(400, { start: 300 }),  // 设置动画过渡的时间 
        translateY: [anime.stagger([40, 10]), 0] //  Y轴之间像素距离比如 h1 -> 40-0, h3 -> 20-0 btn -> 10- 0 
    })
})
// 轮播点击事件
// run.before 轮播图加载之前监听事件
glide.on('run.before',()=>{
    document.querySelectorAll('.slide-caption > *').forEach(el =>{
        el.style.opacity = 0
    })
})
glide.mount()

const isotope = new Isotope('.cases',{
    layoutMode:'fitRows', // 布局的是行内布局 占满自动换下一行
    itemSelector:'.case-item' // 对哪些元素进行布局    
})

const filterBtns = document.querySelector('.filter-btns')
filterBtns.addEventListener('click',e=>{
    let {target} = e
    const filterOption = target.getAttribute('data-filter')
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove('active'))
        target.classList.add('active')
    }
    isotope.arrange({filter:filterOption}) 
})


// 配置项
const staggeringOption ={
    delay:300, // 表示执行时间 延迟 300毫秒
    distance:'50px', // 表示移动的像素是多少
    duration: 500, // 动画执行 500毫秒
    easing: 'ease-in-out', // 动画执行函数
    origin:'bottom' // 表示移动从下面开始 top  left right bottom
}

/* 动态执行js动画 表示 哪个需要动态动画，配置项，执行时间延迟 */
ScrollReveal().reveal(".feature",{...staggeringOption,interval:350})
ScrollReveal().reveal('.service-item',{...staggeringOption,interval:350})

const dataSectionEl = document.querySelector('.data-section')

ScrollReveal().reveal('.data-section',{
    beforeReveal:()=>{ // 执行之前的回调
        anime({ // 动画anime配置
            targets:'.data-piece .num', // 对哪个元素进行动画效果
            innerHTML: el=>{ // 里面的元素
                return [0,el.innerHTML]
            },
            duration: 2000, // 几秒完成动画
            round:1, // 从整数1开始 ， 不写默认从小数开始
            easing:"easeInExpo" // 动画执行的函数
        })
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`
    }
})

// 滚动显示定位
window.addEventListener('scroll',()=>{
    const bottom = dataSectionEl.getBoundingClientRect().bottom
    const top = dataSectionEl.getBoundingClientRect().top
    if(bottom >= 0 && top <= window.innerHeight){
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
})

document.addEventListener('scrollStart',()=>{
    if(headerEl.classList.contains('open')){
        headerEl.classList.remove('open')
    }
})

// 实例对象 对哪些需要滚动的元素进行滚动效果
const scroll = new SmoothScroll("nav a[href*='#'], .scrollToTop a[href*='#']",{
    header:'header', // 固定的导航
    offset:80 // 滚动到该位置多出80像素的位置
})
// 点击导航跳转相应的锚点
const exploreBtnEls = document.querySelectorAll('.explore-btn')
exploreBtnEls.forEach(btn =>{
    btn.addEventListener('click' ,()=>{
        scroll.animateScroll(document.querySelector('#about-us'))
    })
})


// 折叠导航
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click',()=>{
    // if(!headerEl.classList.contains('open')){
    //     headerEl.classList.add('open')
    // }else{
    //     headerEl.classList.remove('open')
    // }
    headerEl.classList.toggle('open')
})