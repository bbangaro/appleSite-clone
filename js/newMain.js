(() => {
    
    let yOffset = 0;
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 씬(섹션)

    const sceneInfo = [
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
            }
        },
        {
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            }
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; // 윈도우 창 높이
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px` //  각 섹션크기 설정
        }

        if(yOffset > prevScrollHeight) {
            
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
         for (let i = 0; i < currentScene; i++) {
             prevScrollHeight += sceneInfo[i].scrollHeight;
         }
    };

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; 
        scrollLoop();   
    });
    setLayout();
})();