import './style.scss';

export default function modal() {
    const modal = document.createElement('div');
    const overlay = document.createElement('div');
    const info = document.createElement('div');
    
    modal.className = 'modal';
    overlay.className = 'overlay';
    info.className = 'info';
    
    modal.innerHTML = '<div class="close-button">Close</div><p>Hi! This is a virtual keyboard for Windows. <br> Use "Shift + Alt" to change language.</p>';
    info.innerHTML = '<div class="open-button"><i class="fas fa-info-circle"></i></div>';
    
    document.querySelector('body').appendChild(modal);
    document.querySelector('body').appendChild(overlay);
    document.querySelector('main').prepend(info);
    
    
    const closeButton = document.querySelector(".close-button");
    const openButton = document.querySelector(".open-button");
     
    closeButton.addEventListener("click", () => {
       modal.classList.toggle("open");
       overlay.classList.toggle("open");
    });
     
    openButton.addEventListener("click", () => {
       modal.classList.toggle("open");
       overlay.classList.toggle("open");
    });
}