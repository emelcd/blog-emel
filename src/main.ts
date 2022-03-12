import { html, render, TemplateResult } from 'lit-html'
import './style.css'

const $ = document.querySelector.bind(document)
const app = $<HTMLElement>('#app')!

enum Language {
  English = 'en',
  Spanish = 'es',
}


const templateNav = (lang: Language) => {
  lang = app.getAttribute('lang') as Language
  return html`
<nav @click=${toggleMenu} class="navbar is-black ">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">

      <img src="https://bulma.io/images/bulma-logo-white.png" alt="Bulma: a modern CSS framework based on Flexbox"
        width="112" height="28">

    </a>
    <div class="navbar-burger" data-target="mainBurger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="mainBurger" class="navbar-menu ">
    <div class="navbar-start">
      <a class="navbar-item" href="https://bulma.io/">
        Home
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown">
          <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">
            Modifiers
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="bd-tw-button button is-black" data-social-network="Twitter" data-social-action="tweet"
              data-social-target="https://bulma.io" target="_blank"
              href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
              <span class="icon">
                <i class="fa-solid fa-palette"></i> </span>
              <span>
                Theme
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button is-info" href="https://github.com/jgthms/bulma/releases/download/0.9.3/bulma-0.9.3.zip">
              <span class="icon">
                <i class="fas fa-language"></i> </span>
              <span>Lang</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
  `
}


const templateAbout = () => {
  return html`
  
  <div id="about" class="container is-flex is-justify-content-center is-align-items-center is-widescreen">
    <div class="card card-size  ">
  
      <div class="right-arrow is-clickable">
  
        <i class="fa-solid fa-angles-right is-size-4"></i>
      </div>
      <div class="left-arrow  is-clickable">
  
        <i class="fa-solid fa-angles-left is-size-4"></i>
      </div>
  
      <div class="card-image">
        <figure class="image ">
          <img src="/me.jpg" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img class="is-rounded" src="/avatar.jpeg" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">Miguel López</p>
            <p class="subtitle is-6">@emel</p>
          </div>
        </div>
  
        <div class="content is-family-monospace">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
  
        </div>
        <div class="is-flex is-justify-content-space-around">
  
          <div class="icon has-text-info ">
            <i class="fa-brands fa-linkedin is-size-2"></i>
          </div>
          <div class="icon ">
            <i class="fa-brands fa-github is-size-2"></i>
          </div>
          <div class="icon has-text-danger ">
            <i class="fa-solid fa-file-pdf is-size-2"></i>
          </div>
        </div>
      </div>
  
  
      <progress id="myBar" class="progress is-small is-info" max="100" value="0"></progress>
    </div>
  
  </div>
  </div>
  `
}

var i = 0;
function move() {
  const elem = document.getElementById("myBar")! as HTMLProgressElement
  if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 33);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        setTimeout(() => {
          elem.classList.remove('is-info')
          elem.classList.add('is-success')
        }, 1000)
      } else {
        width++;
        elem.value = width
      }
    }
  }
}
window.addEventListener("load", move);


function toggleMenu(this: HTMLElement) {
  const target = this.dataset.target || "mainBurger"
  const menu = $(`#${target}`)
  menu && menu.classList.toggle('is-active')
}



/* CREATE A MUTATION OBSERVER FOR app */
const appObserver = new MutationObserver((m) => {
  m.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      const element = mutation.target as HTMLElement
      const langValue = element.getAttribute('lang') as Language
      langValue === Language.English
        ? render(templateNav(Language.English), app)
        : render(templateNav(Language.Spanish), app)
    }
  })
})

appObserver.observe(app, {
  attributes: true,
  attributeFilter: ['lang'],
})



const mainTemplate = html`
  ${templateNav(Language.English)}
  ${templateAbout()}
`
render(mainTemplate, app)