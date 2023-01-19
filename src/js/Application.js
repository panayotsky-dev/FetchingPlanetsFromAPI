import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }
//  https://swapi.boom.dev/api/planets
  constructor() {
    super(); 
    this._loading = document.querySelector(".progress");
     this._startLoading()
    

    

    this.emit(Application.events.READY);
  }
  _startLoading(){
    this._loading.style.visibility = "visible"; 
    this._load();
  }
  async _load(){     
      
    let fetchedPlanets = [];    
    let API_URL = 'https://swapi.boom.dev/api/planets'
    
    //fetching initial api url ( first page)
    fetch(API_URL)
      .then(response => response.json())
      .then((data) => {        
        data.results.forEach(element => {
          fetchedPlanets.push(element)
          this._create(element)
        })     
      })  
      
    // fetching other pages of the api
    for(let i =2;i<=6;i++){
      API_URL = 'https://swapi.boom.dev/api/planets?page=' + i;
      fetch(API_URL)
      .then(response => response.json())
      .then((data) => {
        data.results.forEach(element => {
          fetchedPlanets.push(element)
          this._create(element)
         
        })    
        
      }) 
      
    } 
  //   Object.keys
  
    // fetchedPlanets.forEach(({name, terrain, population}) => console.log(name,terrain,population));
    this._stopLoading()
    //v2
    // const API_URL = "https://swapi.boom.dev/api/planets"
    // let planets = [];
    // const response = await fetch(API_URL)
    // let {next, results } = await response.json();

    // planets = [...results]
    
    // while (next !== null) {
    //   const response = await fetch(next)
    //   const result = await response.json();
    //   planets = [...planets, ...result.results]
    //   next = result.next;
    // }

    // planets.forEach(({name, terrain, population}) => this._create(name,terrain,population) )
    // this._stopLoading();

  }
 
  _stopLoading(){
    this._loading.style.visibility = "hidden"; 
  }
_create({name,terrain,population}){
    
    let box = document.createElement('div')
    box.classList.add('box')
      box.innerHTML = this._render({
        name:name,
        terrain:terrain,
        population:population,
      })
    document.querySelector('.main').appendChild(box)
}






  _render({ name, terrain, population }) {      
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
