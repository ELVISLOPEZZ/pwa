const coffees = [
    {
        title: "Café Espresso",
        description: "Café negro fuerte e intenso, ideal para empezar el día.",
        details: "Origen: Italia. Preparación a alta presión. Contiene 30ml de pura energía y una crema compacta en la superficie.",
        image: "../images/expreso.jpeg"
    },
    {
        title: "Café Capuchino",
        description: "Deliciosa combinación de espresso, leche vaporizada y espuma.",
        details: "Origen: Italia. Se sirve tradicionalmente en partes iguales: 1/3 espresso, 1/3 leche vaporizada y 1/3 espuma cremosa.",
        image: "../images/cafe-capuchino.jpeg"
    },
    {
        title: "Café Latte",
        description: "Suave mezcla de café espresso con abundante leche cremosa.",
        details: "Origen: Europa. Contiene una sola toma de espresso y una cantidad generosa de leche sedosa con una ligera capa de espuma.",
        image: "../images/cafe-latte.jpg"
    },
    {
        title: "Café Americano",
        description: "Café espresso diluido con agua caliente, suave y aromático.",
        details: "Origen: Segunda Guerra Mundial. Ideal para quienes buscan un café largo sin la intensidad directa de un espresso puro.",
        image: "../images/cafe-americano.jpeg"
    },
    {
        title: "Café Mocha",
        description: "Exquisita mezcla de espresso, chocolate caliente y leche.",
        details: "Origen: Yemen/Estados Unidos. Perfecto para los amantes del dulce, combinando la fuerza del café con la dulzura del cacao.",
        image: "../images/cafe-mocha.jpeg"
    },
    {
        title: "Café Macchiato",
        description: "Café espresso 'manchado' con una pequeña cantidad de leche espumada.",
        details: "Origen: Italia. Diseñado para quienes disfrutan el cuerpo fuerte del espresso pero buscan suavizar ligeramente su acidez.",
        image: "../images/cafe-macchiato.jpeg"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const coffeeIndex = params.get('id');

    if (coffeeIndex !== null && coffees[coffeeIndex]) {
        const coffee = coffees[coffeeIndex];

        document.getElementById('detail-title').textContent = coffee.title;
        document.getElementById('detail-desc').textContent = coffee.description;
        document.getElementById('detail-extra').textContent = coffee.details;
        document.getElementById('detail-img').src = coffee.image;
    } else {
        document.getElementById('detail-title').textContent = "Café no encontrado";
        document.getElementById('detail-desc').textContent = "Lo sentimos, la información solicitada no está disponible.";
    }
});