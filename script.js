/**
 * SBTI 人格测试网站
 * 核心交互逻辑
 */

// ===== 人格数据定义 =====
const PERSONALITIES = [
    { type: 'IMSB', emoji: '😎', description: '你是个超级自恋的家伙，觉得自己帅到没朋友，走到哪都是人群焦点。镜子是你最好的朋友，每天必看三百遍。' },
    { type: 'BOSS', emoji: '👑', description: '天生的领导者，霸气侧漏。你的人生信条是：要么听我的，要么滚。开会永远坐C位，做决策从不犹豫。' },
    { type: 'MUM', emoji: '👩', description: '操心命晚期，患者遍布全宇宙。朋友感冒你要管，同事吃饭你要问，你不是妈妈但胜似妈妈。' },
    { type: 'FAKE', emoji: '🎭', description: '社交达人，表情管理大师。面对不同人切换不同人设，演技堪比奥斯卡，就是有时候连自己都骗。' },
    { type: 'Dior-s', emoji: '🛍️', description: '奢侈品鉴定师，吃土也要精致。月底吃土月中浪，钱包空空衣柜满满，你就是当代贫民窟时尚博主。' },
    { type: 'DEAD', emoji: '💀', description: '行走的僵尸，网络幽灵。线上社牛线下社恐，凌晨三点最精神，白天像没充电的手机。' },
    { type: 'ZZZZ', emoji: '😴', description: '睡眠质量全球第一秒睡专业户，闹钟？你不认识。躺下就能做梦，醒来就忘，简称人形充电宝。' },
    { type: 'GOGO', emoji: '🚀', description: '充电五分钟蹦跶两小时，永远停不下来的永动机。旅游健身社交工作，你的日程表比老板还满。' },
    { type: 'FUCK', emoji: '🖕', description: '佛系叛逆者，不服就干。你的字典里没有"将就"两个字，活出自我才是王道，别人的看法？切~' },
    { type: 'CTRL', emoji: '🎮', description: '键盘侠转世，网速堪比5G。打字速度破纪录，杠人技术一流，线下唯唯诺诺线上重拳出击。' },
    { type: 'HHHH', emoji: '😂', description: '行走的弹幕机，行走的复读机。你的人生就是一场大型综艺，走到哪笑到哪，没有你接不住的梗。' },
    { type: 'SEXY', emoji: '🔥', description: '魅力四射，回头率百分之二百。回头看看谁在看我，审美在线品味在线，走到哪都是风景线。' },
    { type: 'OJBK', emoji: '👌', description: '人间清醒，得过且过。没有什么是一顿烧烤解决不了的，如果有，那就两顿。你就是传说中的反焦虑达人。' },
    { type: 'JOKE-R', emoji: '🤡', description: '社死制造机，自嘲专家。自己的糗事讲得比相声还精彩，你就是朋友聚会的开心果本果。' },
    { type: 'POOR', emoji: '😭', description: '钱包比脸还干净，月光族代言人。花呗额度比工资还高，你是当代年轻人消费观的典型代表。' },
    { type: 'OH-NO', emoji: '😱', description: '被害妄想症重度患者，事情还没发生就先想最坏结果。你杞人忧天的本事可以写进教科书。' },
    { type: 'MONK', emoji: '🧘', description: '佛系本佛，与世无争。不争不抢不吵不闹，岁月静好随遇而安，你是朋友圈的清流担当。' },
    { type: 'SHIT', emoji: '💩', description: '今天也是水逆的一天。你的人生就是一部倒霉剧集，每一天都有新惊喜，每一天都在渡劫。' },
    { type: 'THAN-K', emoji: '🙏', description: '感恩达人，万物皆可感谢。发自内心地感谢每一个帮助过你的人，你是朋友圈最暖心的存在。' },
    { type: 'MALO', emoji: '😈', description: '坏坏惹人爱，皮一下很开心。你的坏不是真的坏，是一种让人又爱又恨的魅力，你就是可爱的小恶魔。' },
    { type: 'ATM-er', emoji: '💳', description: '行走的人形取款机，散财童子转世。朋友聚餐你买单，请客送礼你全包，就是这么大方任性。' },
    { type: 'THIN-K', emoji: '🤔', description: '想太多星人，思想家附体。简单的事你能想复杂，复杂的事你能想哲学，你是朋友圈的深夜哲学家。' },
    { type: 'SOLO', emoji: '🎸', description: '孤独摇滚乐手，独行侠本侠。一个人吃饭一个人看电影，一个人也能嗨翻天，你就是独立自主的代名词。' },
    { type: 'LOVE-R', emoji: '💕', description: '恋爱脑重度患者，TA就是全世界。为爱可以付出一切，可以不要面包只要爱情，你是言情小说的主角。' },
    { type: 'WOC!', emoji: '😤', description: '愤怒的小鸟，暴走模式常开。一点就炸是你的标签，你是朋友圈的定时炸弹，也是正义的化身。' },
    { type: 'DRUNK', emoji: '🍺', description: '夜店小王子，酒神转世。今朝有酒今朝醉，明天的事明天再说，喝完这杯还有三杯等着你。' },
    { type: 'IMFW', emoji: '💘', description: '海王海后本王，鱼塘塘主。养鱼技术一流，备胎环绕地球一圈，你就是传说中的社交蝴蝶。' }
];

// ===== 维度数据 =====
const DIMENSIONS = [
    { name: '自我认知', key: 'self' },
    { name: '情感表达', key: 'emotion' },
    { name: '态度倾向', key: 'attitude' },
    { name: '行动模式', key: 'action' },
    { name: '社交风格', key: 'social' }
];

// ===== 测试问题 =====
const QUESTIONS = [
    { text: '周末你更想做什么？', options: ['在家躺着玩手机', '出去社交聚会', '一个人去咖啡厅', '去健身房运动'] },
    { text: '朋友找你借钱，你会？', options: ['毫不犹豫借', '犹豫半天借一点', '找借口拒绝', '问他要利息'] },
    { text: '在群里聊天时，你通常是？', options: ['话最多的那个', '偶尔插几句', '只看不说话', '默默潜水偷看'] },
    { text: '看到前任的新对象，你会？', options: ['祝福祝福', '假装没看见', '默默对比一下', '发动态内涵'] },
    { text: '点外卖时你会？', options: ['纠结半小时', '只点熟悉的店', '随便选一个', '让朋友帮你选'] },
    { text: '你的微信置顶是？', options: ['工作群', '家人', '暗恋对象', '没有置顶'] },
    { text: '熬夜到几点？', options: ['通宵也没问题', '最多12点', '1点最多了', '10点就困'] },
    { text: '你买奶茶会？', options: ['全糖加料', '正常糖', '三分糖', '无糖纯茶'] },
    { text: '被老板当众批评，你会？', options: ['当场反驳', '默默忍着', '背后吐槽', '假装没听见'] },
    { text: '你手机相册里最多的是？', options: ['自拍', '风景照', '截图', '别人的照片'] },
    { text: '你常用的表情包风格？', options: ['可爱萌系', '沙雕搞笑', '冷淡简约', '没有表情包'] },
    { text: '听到八卦你会？', options: ['主动打听', '听但不传播', '假装不感兴趣', '第一个告诉别人'] },
    { text: '你更注重外在还是内在？', options: ['外在第一', '内在更重要', '都要', '都不重要'] },
    { text: '你存款有多少？', options: ['六位数以上', '五位数', '四位数', '负数'] },
    { text: '你属于哪种消费观？', options: ['月光的快乐', '存钱才有安全感', '该花就花', '只买必需品'] },
    { text: '你睡眠质量如何？', options: ['秒睡到天亮', '偶尔失眠', '经常失眠', '需要药物助眠'] },
    { text: '在KTV你会？', options: ['麦霸本霸', '偶尔唱一首', '只听不唱', '假装上厕所溜走'] },
    { text: '你更相信？', options: ['眼见为实', '直觉判断', '别人说的', '科学数据'] },
    { text: '遇到困难你会？', options: ['自己扛', '找朋友帮忙', '找家人求助', '逃避问题'] },
    { text: '你是一个怎样的人？', options: ['自信爆棚', '普通自信', '有点自卑', '自卑又自傲'] },
    { text: '你更看重什么？', options: ['事业成功', '感情生活', '自由快乐', '健康平安'] },
    { text: '你生气时会？', options: ['当场发火', '生闷气', '冷战', '找人说'] },
    { text: '你觉得自己是？', options: ['社交达人', '正常社交', '社恐一枚', '分裂型选手'] },
    { text: '你的口头禅是？', options: ['太牛了', '无所谓', '真的吗', '笑死'] },
    { text: '你对未来的态度是？', options: ['规划清晰', '走一步看一步', '迷茫中', '不想未来'] },
    { text: '你更爱谁？', options: ['爱自己', '爱家人', '爱另一半', '爱所有人'] },
    { text: '你每天刷手机多久？', options: ['超过5小时', '3-5小时', '1-3小时', '很少看手机'] },
    { text: '你理想中的生活是？', options: ['轰轰烈烈', '平平淡淡', '自由职业', '环游世界'] },
    { text: '你觉得金钱重要吗？', options: ['非常重要', '重要但不是全部', '够用就行', '不重要'] },
    { text: '你对待感情的态度是？', options: ['认真专一', '随缘就好', '不敢付出', '海王本王'] },
    { text: '你觉得自己最大的优点是？', options: ['善良', '聪明', '有趣', '有钱'] }
];

// ===== 全局状态 =====
let currentQuestion = 0;
let answers = new Array(QUESTIONS.length).fill(null);
let resultScores = {};

// ===== DOM 元素 =====
const mainPage = document.getElementById('mainPage');
const testPage = document.getElementById('testPage');
const resultPage = document.getElementById('resultPage');
const personalityGrid = document.getElementById('personalityGrid');
const progressFill = document.getElementById('progressFill');
const currentQEl = document.getElementById('currentQ');
const totalQEl = document.getElementById('totalQ');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const startTestBtn = document.getElementById('startTest');
const restartTestBtn = document.getElementById('restartTest');

// ===== 初始化 =====
function init() {
    renderPersonalityGrid();
    setupEventListeners();
    setupScrollAnimation();
    totalQEl.textContent = QUESTIONS.length;
}

// ===== 渲染27种人格卡片 =====
function renderPersonalityGrid() {
    personalityGrid.innerHTML = PERSONALITIES.map(p => `
        <div class="personality-card" data-type="${p.type}">
            <span class="personality-type">${p.type}</span>
            <span class="personality-emoji">${p.emoji}</span>
        </div>
    `).join('');
}

// ===== 设置事件监听 =====
function setupEventListeners() {
    startTestBtn.addEventListener('click', startTest);
    restartTestBtn.addEventListener('click', restartTest);
    prevBtn.addEventListener('click', goToPrevQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    
    document.getElementById('copyLink').addEventListener('click', copyShareLink);
    document.getElementById('shareTwitter').addEventListener('click', shareToTwitter);
    document.getElementById('shareWeibo').addEventListener('click', shareToWeibo);
}

// ===== 滚动动画 =====
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 200);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .personality-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== 开始测试 =====
function startTest() {
    currentQuestion = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    resultScores = {};
    
    mainPage.classList.add('hidden');
    testPage.classList.remove('hidden');
    resultPage.classList.add('hidden');
    
    renderQuestion();
    updateProgress();
}

// ===== 重新测试 =====
function restartTest() {
    resultPage.classList.add('hidden');
    testPage.classList.remove('hidden');
    startTest();
}

// ===== 渲染问题 =====
function renderQuestion() {
    const q = QUESTIONS[currentQuestion];
    questionText.textContent = q.text;
    currentQEl.textContent = currentQuestion + 1;
    
    optionsContainer.innerHTML = q.options.map((opt, i) => `
        <div class="option ${answers[currentQuestion] === i ? 'selected' : ''}" data-index="${i}">
            <span class="option-indicator"></span>
            <span class="option-text">${opt}</span>
        </div>
    `).join('');
    
    optionsContainer.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => selectOption(parseInt(option.dataset.index)));
    });
    
    updateNavButtons();
}

// ===== 选择选项 =====
function selectOption(index) {
    answers[currentQuestion] = index;
    renderQuestion();
}

// ===== 更新导航按钮 =====
function updateNavButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = answers[currentQuestion] === null;
    
    if (currentQuestion === QUESTIONS.length - 1 && answers[currentQuestion] !== null) {
        nextBtn.textContent = '查看结果';
    } else {
        nextBtn.innerHTML = `下一题 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }
}

// ===== 更新进度条 =====
function updateProgress() {
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// ===== 上一题 =====
function goToPrevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        updateProgress();
    }
}

// ===== 下一题 =====
function goToNextQuestion() {
    if (answers[currentQuestion] === null) return;
    
    if (currentQuestion < QUESTIONS.length - 1) {
        currentQuestion++;
        renderQuestion();
        updateProgress();
    } else {
        showResult();
    }
}

// ===== 计算结果 =====
function calculateResult() {
    // 简化的评分算法
    const scores = {};
    PERSONALITIES.forEach(p => scores[p.type] = 0);
    
    // 根据答案计算分数
    answers.forEach((answer, index) => {
        if (answer === null) return;
        
        // 每个问题的权重分配
        const weights = [
            ['SOLO', 'SEXY', 'THIN-K', 'GOGO'],
            ['ATM-er', 'MUM', 'CTRL', 'BOSS'],
            ['HHHH', 'MONK', 'FAKE', 'DEAD'],
            ['IMSB', 'JOKE-R', 'POOR', 'ZZZZ'],
            ['Dior-s', 'OJBK', 'DRUNK', 'LOVE-R'],
            ['BOSS', 'MUM', 'IMSB', 'ZZZZ'],
            ['DRUNK', 'DEAD', 'GOGO', 'ZZZZ'],
            ['SEXY', 'OJBK', 'THIN-K', 'MONK'],
            ['BOSS', 'MUM', 'CTRL', 'FAKE'],
            ['IMSB', 'SEXY', 'Dior-s', 'LOVE-R'],
            ['HHHH', 'SEXY', 'THAN-K', 'MONK'],
            ['CTRL', 'HHHH', 'MUM', 'BOSS'],
            ['IMSB', 'Dior-s', 'THIN-K', 'MUM'],
            ['POOR', 'ATM-er', 'BOSS', 'OJBK'],
            ['POOR', 'Dior-s', 'BOSS', 'SEXY'],
            ['ZZZZ', 'DEAD', 'DRUNK', 'GOGO'],
            ['HHHH', 'SEXY', 'DEAD', 'SOLO'],
            ['THIN-K', 'BOSS', 'CTRL', 'HHHH'],
            ['BOSS', 'MUM', 'ATM-er', 'CTRL'],
            ['IMSB', 'BOSS', 'THIN-K', 'MONK'],
            ['BOSS', 'LOVE-R', 'GOGO', 'MONK'],
            ['FUCK', 'WOC', 'MONK', 'MUM'],
            ['SEXY', 'CTRL', 'DEAD', 'SOLO'],
            ['HHHH', 'JOKE-R', 'MONK', 'THIN-K'],
            ['THIN-K', 'BOSS', 'OH-NO', 'OJBK'],
            ['LOVE-R', 'MUM', 'IMSB', 'BOSS'],
            ['CTRL', 'SEXY', 'DEAD', 'MONK'],
            ['GOGO', 'BOSS', 'SOLO', 'MONK'],
            ['ATM-er', 'BOSS', 'THIN-K', 'OJBK'],
            ['LOVE-R', 'IMSB', 'IMFW', 'BOSS'],
            ['THAN-K', 'MUM', 'IMSB', 'BOSS']
        ];
        
        const weight = weights[index % weights.length];
        if (weight && weight[answer]) {
            scores[weight[answer]] += 10;
        }
    });
    
    // 添加一些随机性让结果更有趣
    PERSONALITIES.forEach(p => {
        scores[p.type] += Math.floor(Math.random() * 5);
    });
    
    return scores;
}

// ===== 显示结果 =====
function showResult() {
    testPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    
    const scores = calculateResult();
    
    // 找出最高分的人格
    let maxScore = 0;
    let resultType = 'IMSB';
    
    Object.entries(scores).forEach(([type, score]) => {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    });
    
    const personality = PERSONALITIES.find(p => p.type === resultType) || PERSONALITIES[0];
    
    // 渲染结果
    document.getElementById('resultType').textContent = personality.type;
    document.getElementById('resultBadge').textContent = personality.emoji;
    document.getElementById('resultDescription').textContent = personality.description;
    
    // 渲染维度分析
    const dimensionsGrid = document.getElementById('dimensionsGrid');
    dimensionsGrid.innerHTML = DIMENSIONS.map(dim => {
        const value = Math.floor(Math.random() * 40) + 60; // 60-100
        return `
            <div class="dimension-item">
                <div class="dimension-name">${dim.name}</div>
                <div class="dimension-bar">
                    <div class="dimension-fill" style="width: 0%"></div>
                </div>
                <div class="dimension-value">${value}%</div>
            </div>
        `;
    }).join('');
    
    // 生成分享链接
    const shareLink = `${window.location.origin}${window.location.pathname}?result=${personality.type}`;
    document.getElementById('shareLink').value = shareLink;
    
    // 动画显示维度条
    setTimeout(() => {
        document.querySelectorAll('.dimension-fill').forEach(bar => {
            const valueEl = bar.parentElement.parentElement.querySelector('.dimension-value');
            const targetValue = parseInt(valueEl.textContent);
            bar.style.width = `${targetValue}%`;
        });
    }, 500);
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 复制链接 =====
function copyShareLink() {
    const link = document.getElementById('shareLink').value;
    navigator.clipboard.writeText(link).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2000);
    });
}

// ===== Twitter 分享 =====
function shareToTwitter() {
    const type = document.getElementById('resultType').textContent;
    const text = `刚刚测了一下SBTI人格测试，我是${type}型人格！你也来试试吧：`;
    const url = document.getElementById('shareLink').value;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

// ===== 微博分享 =====
function shareToWeibo() {
    const type = document.getElementById('resultType').textContent;
    const text = `刚刚测了一下SBTI人格测试，我是${type}型人格！你也来试试吧`;
    window.open(`http://service.weibo.com/share/share.php?title=${encodeURIComponent(text)}`, '_blank');
}

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', init);
