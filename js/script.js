document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');
    const menuBtn = document.querySelector('.menu-btn');
    const pageInfo = document.querySelector('.page-info');
    const progress = document.querySelector('.progress');
    const bookContent = document.querySelector('.book-content');
    
    // 模拟电子书内容
    const bookPages = [
        "这是电子书的第一页内容...",
        "这是电子书的第二页内容...",
        "这是电子书的第三页内容...",
        // 可以继续添加更多页
    ];
    
    let currentPage = 0;
    
    // 更新页面内容
    function updatePage() {
        bookContent.innerHTML = `<p>${bookPages[currentPage]}</p>`;
        pageInfo.textContent = `${currentPage + 1}/${bookPages.length}`;
        progress.style.width = `${((currentPage + 1) / bookPages.length) * 100}%`;
    }
    
    // 上一页按钮事件
    prevBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    });
    
    // 下一页按钮事件
    nextBtn.addEventListener('click', function() {
        if (currentPage < bookPages.length - 1) {
            currentPage++;
            updatePage();
        }
    });
    
    // 返回按钮事件
    backBtn.addEventListener('click', function() {
        alert('返回书架功能');
    });
    
    // 菜单按钮事件
    menuBtn.addEventListener('click', function() {
        alert('打开菜单功能');
    });
    
    // 初始化第一页
    updatePage();
    
    // 添加触摸滑动翻页
    let touchStartX = 0;
    let touchEndX = 0;
    
    bookContent.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    bookContent.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX && (touchStartX - touchEndX) > 50) {
            // 向左滑动 - 下一页
            nextBtn.click();
        }
        
        if (touchEndX > touchStartX && (touchEndX - touchStartX) > 50) {
            // 向右滑动 - 上一页
            prevBtn.click();
        }
    }
    function changeFontSize(size) {
        bookContent.style.fontSize = size + 'px';
    }
    function addBookmark() {
        localStorage.setItem('bookmark', currentPage);
    }
    
    function goToBookmark() {
        const bookmark = localStorage.getItem('bookmark');
        if (bookmark) {
            currentPage = parseInt(bookmark);
            updatePage();
        }
    }
});