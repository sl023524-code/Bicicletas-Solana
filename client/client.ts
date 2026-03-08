interface Bicicleta {
    id: number;
    nombre: string;
    precio: number;
    marca: string;
}

let bicicletas: Bicicleta[] = [];

// CREATE
export function agregarBicicleta(nombre: string, precio: number, marca: string) {

    const nueva: Bicicleta = {
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

    const tabla = document.getElementById("tablaBicicletas") as HTMLTableSectionElement | null;

    if (!tabla) return;

    tabla.innerHTML = "";

    bicicletas.forEach(b => {

        const fila = `
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

        tabla.innerHTML += fila;
    });
}

// UPDATE
export function editarBicicleta(id: number) {

    const nombre = prompt("Nuevo nombre de la bicicleta");
    const precio = prompt("Nuevo precio");

    bicicletas = bicicletas.map(b => {

        if (b.id === id) {

            return {
                ...b,
                nombre: nombre ?? b.nombre,
                precio: precio ? Number(precio) : b.precio
            };

        }

        return b;

    });

    mostrarBicicletas();
}

// DELETE
export function eliminarBicicleta(id: number) {

    bicicletas = bicicletas.filter(b => b.id !== id);

    mostrarBicicletas();
}

/* Hacer accesibles las funciones desde HTML */
(globalThis as any).editarBicicleta = editarBicicleta;
(globalThis as any).eliminarBicicleta = eliminarBicicleta;
