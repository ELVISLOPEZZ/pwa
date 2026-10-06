// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('servicesworker.js')
            .then(reg => console.log('Service Worker registrado con éxito:', reg))
            .catch(err => console.log('Fallo al registrar el Service Worker:', err));
    });
}

// Datos de las Cards con diferentes nombres e información extendida
const coffees = [
    {
        title: "Café Espresso",
        description: "Café negro fuerte e intenso, ideal para empezar el día.",
        details: "Origen: Italia. Preparación a alta presión. Contiene 30ml de pura energía y una crema compacta en la superficie.",
        image: "images/expreso.jpeg"
    },
    {
        title: "Café Capuchino",
        description: "Deliciosa combinación de espresso, leche vaporizada y espuma.",
        details: "Origen: Italia. Se sirve tradicionalmente en partes iguales: 1/3 espresso, 1/3 leche vaporizada y 1/3 espuma cremosa.",
        image: "images/Café Capuchino.jpeg"
    },
    {
        title: "Café Latte",
        description: "Suave mezcla de café espresso con abundante leche cremosa.",
        details: "Origen: Europa. Contiene una sola toma de espresso y una cantidad generosa de leche sedosa con una ligera capa de espuma.",
        image: "images/Café Latte.jpg"
    },
    {
        title: "Café Americano",
        description: "Café espresso diluido con agua caliente, suave y aromático.",
        details: "Origen: Segunda Guerra Mundial. Ideal para quienes buscan un café largo sin la intensidad directa de un espresso puro.",
        image: "images/Café Americano.jpeg"
    },
    {
        title: "Café Mocha",
        description: "Exquisita mezcla de espresso, chocolate caliente y leche.",
        details: "Origen: Yemen/Estados Unidos. Perfecto para los amantes del dulce, combinando la fuerza del café con la dulzura del cacao.",
        image: "images/Café Mocha.jpeg"
    },
    {
        title: "Café Macchiato",
        description: "Café espresso 'manchado' con una pequeña cantidad de leche espumada.",
        details: "Origen: Italia. Diseñado para quienes disfrutan el cuerpo fuerte del espresso pero buscan suavizar ligeramente su acidez.",
        image: "images/Café Macchiato.jpeg"
    }
];

const container = document.querySelector('.container');

function renderCards() {
    if (!container) return;
    
    container.innerHTML = ""; // Limpiar contenedor
    
    coffees.forEach((coffee, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}" class="card-img">
            <div class="card-body">
                <h3 class="card-title">${coffee.title}</h3>
                <p class="card-text">${coffee.description}</p>
                <!-- Redirige a la segunda pantalla (detalle.html) enviando el índice -->
                <button class="btn-ver-mas" onclick="window.location.href='javascript/detalle.html?id=${index}'">Ver más</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', renderCards);

