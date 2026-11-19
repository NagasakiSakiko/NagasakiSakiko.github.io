(() => {
  const STYLE_ID = 'site-notify-style'
  const CONTAINER_ID = 'site-notify-container'

  const ensureStyle = () => {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      #${CONTAINER_ID}{position:fixed;top:50px;left:20px;z-index:10000;display:grid;gap:10px;pointer-events:none}
      .site-notify{width:min(360px,calc(100vw - 40px));padding:14px 16px;border-radius:12px;background:var(--card-bg,#fff);color:var(--font-color,#4c4948);box-shadow:0 8px 30px rgba(0,0,0,.18);border-left:4px solid #49b1f5;opacity:0;transform:translateY(-10px);transition:opacity .22s ease,transform .22s ease;pointer-events:auto}
      .site-notify.is-visible{opacity:1;transform:translateY(0)}
      .site-notify.is-leaving{opacity:0;transform:translateY(-10px)}
      .site-notify__title{font-weight:700;margin-bottom:4px}
      .site-notify__message{font-size:14px;line-height:1.55}
      @media (max-width:600px){#${CONTAINER_ID}{top:16px;left:12px}.site-notify{width:calc(100vw - 24px)}}
      @media (prefers-reduced-motion:reduce){.site-notify{transition:none}}
    `
    document.head.appendChild(style)
  }

  const ensureContainer = () => {
    let container = document.getElementById(CONTAINER_ID)
    if (!container) {
      container = document.createElement('div')
      container.id = CONTAINER_ID
      container.setAttribute('aria-live', 'polite')
      document.body.appendChild(container)
    }
    return container
  }

  window.siteNotify = ({ title = '', message = '', duration = 5000 } = {}) => {
    ensureStyle()
    const toast = document.createElement('div')
    toast.className = 'site-notify'
    toast.setAttribute('role', 'status')

    const heading = document.createElement('div')
    heading.className = 'site-notify__title'
    heading.textContent = title

    const body = document.createElement('div')
    body.className = 'site-notify__message'
    body.textContent = message

    toast.append(heading, body)
    ensureContainer().appendChild(toast)
    requestAnimationFrame(() => toast.classList.add('is-visible'))

    const close = () => {
      toast.classList.remove('is-visible')
      toast.classList.add('is-leaving')
      window.setTimeout(() => toast.remove(), 240)
    }

    toast.addEventListener('click', close, { once: true })
    window.setTimeout(close, duration)
  }
})()
