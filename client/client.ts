interface Bicicleta {
    id: number;
    nombre: string;
    precio: number;
    marca: string;
}

let bicicletas: Bicicleta[] = [];

// CREATE
export function agregarBicicleta(nombre: string, precio: number, marca: string) {
    const nueva = {
        id: Date.now(),
        nombre,
        precio,
        marca
    };

    bicicletas.push(nueva);
    mostrarBicicletas();
}

// READ
export function mostrarBicicletas() {
    const tabla = document.getElementById("tablaBicicletas") as HTMLElement;
    tabla.innerHTML = "";

    bicicletas.forEach(b => {
        tabla.innerHTML += `
        <tr>
            <td>${b.id}</td>
            <td>${b.nombre}</td>
            <td>${b.precio}</td>
            <td>${b.marca}</td>
            <td>
                <button onclick="editarBicicleta(${b.id})">Editar</button>
                <button onclick="eliminarBicicleta(${b.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

// UPDATE
export function editarBicicleta(id: number) {
    const nombre = prompt("Nuevo nombre");
    const precio = prompt("Nuevo precio");

    bicicletas = bicicletas.map(b =>
        b.id === id
            ? { ...b, nombre: nombre || b.nombre, precio: Number(precio) || b.precio }
            : b
    );

    mostrarBicicletas();
}

// DELETE
export function eliminarBicicleta(id: number) {
    bicicletas = bicicletas.filter(b => b.id !== id);
    mostrarBicicletas();
}
