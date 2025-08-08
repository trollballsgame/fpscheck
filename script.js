window.onload = () => {
    function gebqs (selector) {
         return document.querySelector(selector);
     }
     function displaytext (text) {
          gebqs('#display').innerText = text;
            console.log(`displayed ${text}`)
      }
      function getDeviceType() {
        const userAgent = navigator.userAgent;
         if (/Mobi|Android/i.test(userAgent)) {
               return "Mobile";
        } else if (/Tablet|iPad/i.test(userAgent)) {
              return "Tablet";
         } else {
                return "Desktop";
          }
        }   
    console.log(`User Agent: ${navigator.userAgent}`);
    console.log(`Device Type: ${getDeviceType()}`);
    displaytext(`player settings: ${getDeviceType()}`);
    const gebid = (id) => document.getElementById(id)
    const gebcn = (cn) => document.getElementsByClassName(cn)

    const text = gebid('text')
    const div = gebid('div')
    const sp = gebid('sp')
    const sm = gebid('sm')
    const fpsDisplay = gebid('fps')
    const dts = gebcn('devtools')

    let smoothing = 0.2
    let targetX = 0
    let currentX = 0

    function lerp(start, end, t) {
        return start + (end - start) * t
    }

    document.addEventListener("mousemove", function (e) {
        targetX = e.clientX
        text.textContent = `X: ${e.clientX} Y: ${e.clientY}`
    })

    let inputBuffer = ''

    document.addEventListener('keydown', (e) => {
        inputBuffer += e.key;
        inputBuffer = inputBuffer.slice(-10)

        if (inputBuffer === 'devtools56') {
            console.log('dev tools activated.')
            text.style.display = 'block'
            document.body.style.backgroundColor = 'black'
            div.style.backgroundColor = 'lime'
            for (let el of dts) {
                el.style.display = 'inline-block'
            }
        }

        if (inputBuffer === 'removedts5') {
            console.log('dev tools turned off.')
            text.style.display = 'none'
            document.body.style.backgroundColor = 'white'
            div.style.backgroundColor = 'black'
            for (let el of dts) {
                el.style.display = 'none'
            }
        }
    })

    sp.onclick = () => {
        smoothing += 0.02
        smoothing = Math.min(1, smoothing)
        console.log(`smoothing changed to ${smoothing.toFixed(2)}`)
    }

    sm.onclick = () => {
        smoothing -= 0.02
        smoothing = Math.max(0.01, smoothing)
        console.log(`smoothing changed to ${smoothing.toFixed(2)}`)
    }

    let lastTime = performance.now()
    let frames = 0
    let smoothedFPS = 60
    
    function tick() {
        const now = performance.now()
        frames++
    
        if (now - lastTime >= 250) {
            const rawFPS = frames * 4
            frames = 0
            lastTime = now
    
            smoothedFPS = lerp(smoothedFPS, rawFPS, 0.25);
            fpsDisplay.textContent = `FPS: ${Math.round(smoothedFPS)}`
    
            if (smoothedFPS > 50) {
                fpsDisplay.style.color = 'lime'
            } else if (smoothedFPS > 30) {
                fpsDisplay.style.color = 'orange'
            } else {
                fpsDisplay.style.color = 'red'
            }
        }
    
        currentX = lerp(currentX, targetX, smoothing)
        div.style.left = currentX + 'px'
    
        requestAnimationFrame(tick)
    }
    
    tick()
}
