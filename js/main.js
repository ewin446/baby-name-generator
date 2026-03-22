// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 1. 获取DOM元素
  const surnameInput = document.getElementById('surname');
  const birthDateInput = document.getElementById('birth-date');
  const genderSelect = document.getElementById('gender');
  const countSelect = document.getElementById('count');
  const generateBtn = document.getElementById('generate-btn');
  const loading = document.getElementById('loading');
  const loadingText = document.getElementById('loading-text');
  const resultArea = document.getElementById('result-area');
  const nameList = document.getElementById('name-list');
  const filterArea = document.getElementById('filter-area');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const collectionArea = document.getElementById('collection-area');
  const collectionList = document.getElementById('collection-list');
  const collectionCount = document.getElementById('collection-count');
  // 高级设置元素
  const advancedBtn = document.getElementById('advanced-btn');
  const advancedPanel = document.getElementById('advanced-panel');
  const zodiacWeight = document.getElementById('zodiac-weight');
  const zodiacWeightVal = document.getElementById('zodiac-weight-val');
  const seasonWeight = document.getElementById('season-weight');
  const seasonWeightVal = document.getElementById('season-weight-val');
  const elementWeight = document.getElementById('element-weight');
  const elementWeightVal = document.getElementById('element-weight-val');
  const resetWeightBtn = document.getElementById('reset-weight');

  // 初始化日期为今天
  const today = new Date().toISOString().split('T')[0];
  birthDateInput.value = today;

  // 2. 高级设置交互
  advancedBtn.addEventListener('click', () => {
    advancedPanel.style.display = advancedPanel.style.display === 'block' ? 'none' : 'block';
  });

  // 权重滑块实时显示值
  zodiacWeight.addEventListener('input', () => {
    zodiacWeightVal.textContent = `${zodiacWeight.value}%`;
  });
  seasonWeight.addEventListener('input', () => {
    seasonWeightVal.textContent = `${seasonWeight.value}%`;
  });
  elementWeight.addEventListener('input', () => {
    elementWeightVal.textContent = `${elementWeight.value}%`;
  });

  // 重置权重（带随机波动）
  resetWeightBtn.addEventListener('click', () => {
    zodiacWeight.value = randomizeWeight(70);
    seasonWeight.value = randomizeWeight(50);
    elementWeight.value = randomizeWeight(80);
    // 更新显示
    zodiacWeightVal.textContent = `${zodiacWeight.value}%`;
    seasonWeightVal.textContent = `${seasonWeight.value}%`;
    elementWeightVal.textContent = `${elementWeight.value}%`;
    alert("权重已重置为默认值（小幅随机优化）！");
  });

  // 3. 收藏数据存储（本地存储）
  let collection = JSON.parse(localStorage.getItem('nameCollection')) || [];
  updateCollectionUI();

  // 4. 生成名字核心逻辑
  generateBtn.addEventListener('click', () => {
    // 获取输入值
    const surname = surnameInput.value.trim();
    const birthDate = birthDateInput.value;
    const gender = genderSelect.value;
    const count = parseInt(countSelect.value);

    // 验证输入
    if (!validateInput(surname, birthDate, gender)) {
      return;
    }

    // 显示加载动画（随机提示语）
    loadingText.textContent = getRandomLoadingText();
    loading.style.display = 'block';
    // 隐藏结果和筛选
    resultArea.style.display = 'none';
    filterArea.style.display = 'none';
    collectionArea.style.display = 'none';

    // 模拟接口请求延迟（懒加载前置效果）
    setTimeout(() => {
      // 1. 获取对应性别名字库并打乱
      let namePool = [];
      if (gender === 'girl') {
        namePool = [...nameDatabase.girl.classical, ...nameDatabase.girl.modern];
      } else {
        namePool = [...nameDatabase.boy.classical, ...nameDatabase.boy.modern];
      }
      // 打乱名字库
      const shuffledPool = shuffleArray(namePool);
      // 截取指定数量
      const selectedNames = shuffledPool.slice(0, count);

      // 2. 为每个名字生成随机化数据
      const finalNames = selectedNames.map(nameItem => {
        const totalScore = generateRandomScore();
        return {
          fullName: surname + nameItem.name,
          totalScore,
          dimensionScores: generateDimensionScores(totalScore),
          source: nameItem.source,
          meaning: getRandomMeaning(nameItem.meaning),
          adaptation: generateAdaptationDesc(birthDate, surname),
          tags: generateNameTags(gender),
          strokes: nameItem.strokes,
          tone: nameItem.tone,
          rawName: nameItem.name // 原始名字，用于收藏
        };
      });

      // 3. 再次打乱最终结果（排序随机化）
      const randomizedFinalNames = shuffleArray(finalNames);

      // 4. 渲染名字列表
      renderNameList(randomizedFinalNames);

      // 5. 隐藏加载，显示结果和筛选
      loading.style.display = 'none';
      resultArea.style.display = 'block';
      filterArea.style.display = 'flex';
      collectionArea.style.display = 'block';

      // 6. 执行懒加载动画
      lazyLoadNameCards();

      // 7. 绑定筛选事件
      bindFilterEvents(randomizedFinalNames);

    }, 1500); // 模拟1.5秒加载时间
  });

  // 5. 渲染名字列表
  function renderNameList(names) {
    nameList.innerHTML = '';
    names.forEach(name => {
      const tagsHtml = name.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      const card = document.createElement('div');
      card.className = 'name-card';
      card.dataset.score = name.totalScore;
      card.innerHTML = `
        <h4>
          ${name.fullName}
          <span class="collect-btn" data-name="${name.fullName}" data-score="${name.totalScore}">♡</span>
        </h4>
        <div class="score">总分：${name.totalScore}分</div>
        <div class="dimension-scores">
          ${Object.entries(name.dimensionScores).map(([key, val]) => `${key}：${val}分`).join(' | ')}
        </div>
        <div class="source">出处：${name.source}</div>
        <div class="meaning">寓意：${name.meaning}</div>
        <div class="adaptation">适配：${name.adaptation}</div>
        <div class="tags">${tagsHtml}</div>
      `;
      nameList.appendChild(card);

      // 绑定收藏按钮事件
      const collectBtn = card.querySelector('.collect-btn');
      // 检查是否已收藏
      const isCollected = collection.some(item => item.fullName === name.fullName);
      if (isCollected) {
        collectBtn.classList.add('active');
        collectBtn.textContent = '❤';
      }
      // 收藏点击事件
      collectBtn.addEventListener('click', () => {
        const fullName = collectBtn.dataset.name;
        const score = collectBtn.dataset.score;
        if (collectBtn.classList.contains('active')) {
          // 取消收藏
          collection = collection.filter(item => item.fullName !== fullName);
          collectBtn.classList.remove('active');
          collectBtn.textContent = '♡';
          alert(`已取消收藏【${fullName}】`);
        } else {
          // 添加收藏
          collection.push({ fullName, score });
          collectBtn.classList.add('active');
          collectBtn.textContent = '❤';
          alert(getRandomCollectTip());
        }
        // 保存到本地存储
        localStorage.setItem('nameCollection', JSON.stringify(collection));
        // 更新收藏UI
        updateCollectionUI();
      });
    });
  }

  // 6. 绑定筛选事件
  function bindFilterEvents(allNames) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 移除所有active
        filterBtns.forEach(b => b.classList.remove('active'));
        // 添加当前active
        btn.classList.add('active');
        // 获取筛选分数
        const scoreFilter = btn.dataset.score;
        let filteredNames = [];
        if (scoreFilter === 'all') {
          filteredNames = allNames;
        } else {
          const score = parseInt(scoreFilter);
          if (score === 95) {
            filteredNames = allNames.filter(n => parseFloat(n.totalScore) >= 95);
          } else if (score === 92) {
            filteredNames = allNames.filter(n => parseFloat(n.totalScore) >= 92 && parseFloat(n.totalScore) < 95);
          } else if (score === 90) {
            filteredNames = allNames.filter(n => parseFloat(n.totalScore) >= 90 && parseFloat(n.totalScore) < 92);
          }
        }
        // 重新渲染筛选结果
        renderNameList(filteredNames);
        // 重新执行懒加载
        lazyLoadNameCards();
      });
    });
  }

  // 7. 更新收藏UI
  function updateCollectionUI() {
    collectionCount.textContent = `(${collection.length})`;
    collectionList.innerHTML = '';
    collection.forEach(item => {
      const card = document.createElement('div');
      card.className = 'collection-card';
      card.innerHTML = `
        <div class="name-info">
          <span>${item.fullName}</span>
          <span style="color: #ff7d00; font-size: 12px;">${item.score}分</span>
        </div>
        <span class="delete-btn" data-name="${item.fullName}">删除</span>
      `;
      collectionList.appendChild(card);

      // 绑定删除事件
      const deleteBtn = card.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        const fullName = deleteBtn.dataset.name;
        collection = collection.filter(item => item.fullName !== fullName);
        localStorage.setItem('nameCollection', JSON.stringify(collection));
        updateCollectionUI();
        // 同步更新名字列表中的收藏状态
        const collectBtns = document.querySelectorAll(`.collect-btn[data-name="${fullName}"]`);
        collectBtns.forEach(btn => {
          btn.classList.remove('active');
          btn.textContent = '♡';
        });
        alert(`已删除收藏【${fullName}】`);
      });
    });
  }
});
