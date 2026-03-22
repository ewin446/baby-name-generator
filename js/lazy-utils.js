// 1. 名字数据库（含多版本寓意、笔画、声调）
const nameDatabase = {
  girl: {
    classical: [
      {
        name: "沛恩",
        source: "《诗经·大雅》",
        meaning: [
          "沛雨甘霖，恩泽绵长；如春雨般滋润人心，充满仁爱与慈悲。",
          "沛然有泽，恩深义重；寓意福泽深厚，懂得感恩与包容。",
          "沛水长流，恩光普照；一生福运相伴，待人宽厚善良。"
        ],
        strokes: "7+10=17画（吉数）",
        tone: "4-1声，声调错落，读音优美"
      },
      {
        name: "清妍",
        source: "《洛神赋》",
        meaning: [
          "清姿妍丽，宛若秋水；寓意容貌秀美，品性清雅脱俗。",
          "清澄如水，妍华自来；一生纯净善良，才华出众。",
          "清风拂面，妍态万千；性格开朗，气质如兰。"
        ],
        strokes: "11+7=18画（吉数）",
        tone: "1-2声，读音轻柔，朗朗上口"
      },
      {
        name: "书瑶",
        source: "《全唐诗》",
        meaning: [
          "书香门第，瑶华灼灼；寓意知书达理，如美玉般珍贵。",
          "书韵飘香，瑶光闪耀；才华横溢，前程光明。",
          "书通二酉，瑶台仙品；学识渊博，气质高雅。"
        ],
        strokes: "4+14=18画（吉数）",
        tone: "1-2声，声调平和，悦耳动听"
      }
    ],
    modern: [
      {
        name: "一诺",
        source: "现代简约风格",
        meaning: [
          "一诺千金，言出必行；寓意诚实守信，品格端正。",
          "一生一诺，初心不改；坚守本心，行稳致远。",
          "诺字为信，一生坦荡；待人真诚，受人信赖。"
        ],
        strokes: "1+16=17画（吉数）",
        tone: "1-4声，声调起伏，记忆点强"
      },
      {
        name: "沐希",
        source: "现代清新风格",
        meaning: [
          "沐光而行，希望常在；一生充满阳光，积极向上。",
          "沐泽四方，希翼美好；福泽深厚，未来可期。",
          "沐风沐雨，希心不改；坚韧不拔，心怀希望。"
        ],
        strokes: "7+7=14画（吉数）",
        tone: "4-1声，读音轻快，清新自然"
      }
    ]
  },
  boy: {
    classical: [
      {
        name: "景行",
        source: "《诗经·小雅》",
        meaning: [
          "高山景行，明德惟馨；寓意品德高尚，行为端正。",
          "景星庆云，行稳致远；前程似锦，步步踏实。",
          "景从云集，行成于思；受人敬仰，善于思考。"
        ],
        strokes: "12+6=18画（吉数）",
        tone: "3-2声，声调沉稳，大气磅礴"
      },
      {
        name: "修远",
        source: "《离骚》",
        meaning: [
          "路漫漫其修远兮，吾将上下而求索；寓意志存高远，不懈追求。",
          "修身立德，远瞩高瞻；品德高尚，眼界开阔。",
          "修文习武，远怀天下；文武双全，心怀家国。"
        ],
        strokes: "9+7=16画（吉数）",
        tone: "1-3声，读音铿锵，富有力量"
      }
    ],
    modern: [
      {
        name: "睿泽",
        source: "现代大气风格",
        meaning: [
          "睿智聪慧，福泽绵长；寓意头脑灵活，一生有福。",
          "睿思敏捷，泽被四方；才华出众，乐于助人。",
          "睿知天下，泽润万物；眼界开阔，心胸宽广。"
        ],
        strokes: "14+8=22画（吉数）",
        tone: "4-2声，声调沉稳，大气不凡"
      },
      {
        name: "亦辰",
        source: "现代简约风格",
        meaning: [
          "亦刚亦柔，辰光万里；性格温润，前程光明。",
          "亦步亦趋，辰星闪耀；脚踏实地，光芒四射。",
          "亦有鸿志，辰宿列张；心怀大志，格局宏大。"
        ],
        strokes: "6+7=13画（吉数）",
        tone: "4-2声，读音顺口，简约大气"
      }
    ]
  }
};

// 2. 随机化工具函数
// 2.1 生成精细化总分（90.0-98.9，1位小数）
function generateRandomScore() {
  const baseScore = Math.floor(Math.random() * 90) + 900; // 900-989
  return (baseScore / 10).toFixed(1);
}

// 2.2 生成维度评分（与总分自洽）
function generateDimensionScores(totalScore) {
  const total = parseFloat(totalScore);
  const dimensionScores = {};
  // 四个维度，每个维度在总分±3范围内随机，且不超出90-98
  const dimensions = ['pronunciation', 'structure', 'culture', 'balance'];
  dimensions.forEach(dim => {
    let score = total + (Math.random() * 6 - 3); // ±3波动
    score = Math.max(90, Math.min(98, score)); // 限制范围
    dimensionScores[dim] = score.toFixed(1);
  });
  return {
    读音韵律: dimensionScores.pronunciation,
    字形结构: dimensionScores.structure,
    文化内涵: dimensionScores.culture,
    整体平衡: dimensionScores.balance
  };
}

// 2.3 随机选择寓意版本
function getRandomMeaning(meanings) {
  return meanings[Math.floor(Math.random() * meanings.length)];
}

// 2.4 生成适配性描述（生肖/季节/五行）
function generateAdaptationDesc(birthDate, surname) {
  const date = new Date(birthDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  // 简化生肖计算
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const zodiac = zodiacs[(year - 1900) % 12];
  // 季节计算
  const seasons = ['冬', '春', '夏', '秋'];
  const season = seasons[Math.floor(month / 3)];
  // 五行随机
  const elements = ['木', '火', '土', '金', '水'];
  const element = elements[Math.floor(Math.random() * 5)];
  // 适配模板随机
  const templates = [
    `与${zodiac}年出生相合，添福添运，姓氏${surname}适配度${(90 + Math.random() * 8).toFixed(1)}%`,
    `${season}季出生适配度${(91 + Math.random() * 7).toFixed(1)}%，五行${element}属性相合`,
    `生肖${zodiac}喜用字根，笔画搭配和谐，一生顺遂安康`,
    `${season}季宜用${element}属性字，此名匹配度${(92 + Math.random() * 6).toFixed(1)}%`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// 2.5 生成随机名字标签
function generateNameTags(gender) {
  const girlTags = ['温婉', '悦耳', '诗意', '小众', '易记', '雅致', '清新'];
  const boyTags = ['大气', '沉稳', '朗朗上口', '励志', '经典', '独特', '阳刚'];
  const tags = gender === 'girl' ? girlTags : boyTags;
  // 随机选1-2个标签
  const shuffledTags = shuffleArray(tags);
  return shuffledTags.slice(0, Math.floor(Math.random() * 2) + 1);
}

// 2.6 随机加载提示语
function getRandomLoadingText() {
  const tips = [
    "正在为您生成个性化好名字...",
    "结合生辰命理，精选高分好名✨",
    "翻阅经典典籍，为宝宝定制专属名字...",
    "测算五行平衡，匹配最佳用字🔮",
    "根据生肖特征，筛选适配好名🐲",
    "优化名字声调，确保朗朗上口🎵"
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

// 2.7 随机收藏反馈语
function getRandomCollectTip() {
  const tips = [
    "已加入收藏✨",
    "收藏成功❤️",
    "这个名字超赞👍",
    "好名字值得收藏🌟",
    "收藏啦～方便后续查看📝"
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

// 2.8 数组随机打乱（用于结果排序/标签选择）
function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// 2.9 高级权重小幅随机波动（默认值±2）
function randomizeWeight(base) {
  return Math.max(0, Math.min(100, base + Math.floor(Math.random() * 5) - 2));
}

// 3. 懒加载函数（名字卡片渐入动画）
function lazyLoadNameCards() {
  const cards = document.querySelectorAll('.name-card:not(.loaded)');
  cards.forEach((card, index) => {
    // 分批加载，模拟懒加载效果
    setTimeout(() => {
      card.classList.add('loaded');
    }, index * 50); // 每个卡片延迟50ms加载，形成渐入效果
  });
}

// 4. 验证输入
function validateInput(surname, birthDate, gender) {
  if (!surname || surname.length !== 1) {
    alert("请输入单字姓氏！");
    return false;
  }
  if (!birthDate) {
    alert("请选择出生日期！");
    return false;
  }
  if (!gender) {
    alert("请选择宝宝性别！");
    return false;
  }
  return true;
}
