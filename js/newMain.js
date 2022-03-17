(() => {
    let yOffset = 0;
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 씬(scroll-section))
    let enterNewScene = false; // 새로운 씬 진입시점

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                messageA_opacity: [0, 1],
            },
        },
        {
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            },
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            },
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            },
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            // 씬 개수만큼
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; // 5 * 윈도우 창 높이
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; //  각 섹션크기에 적용
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        // 계산된 비율 * (opacity 범위 + 시작값)
        rv = scrollRatio * (values[1] - values[0]) + values[0];
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                // console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                // console.log('1 play');
                calcValues();
                break;
            case 2:
                // console.log('3 play');
                calcValues();
                break;
            case 3:
                // console.log('4 play');
                calcValues();
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        // 활성화 시킬 씬
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        // 이전씬과 다음씬이 걸쳤을 때 prevScrollHeight은 currentHeight 합쳐져야하고
        // ( prevScrollHeight + currentHeight) < yOffset 보다 커지면 다음 씬으로 바꿔주기
        // prevScrollHeight > yOffset 바로 이전 씬으로 돌려주기
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일))
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        // 위에 라인 살짝 걸치고 변경되는 이유
        // 상단 메뉴 영역때문~!

        // 씬이 바뀌는 찰나의 순간에 return
        if (enterNewScene) return;

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

    setLayout();
})();
