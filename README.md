🚴 BikeChain — Gestión de Bicicletas en Solana

BikeChain es un programa on-chain desarrollado en Rust con Anchor sobre la blockchain de Solana.
Permite a una tienda administrar su catálogo de bicicletas de forma descentralizada, transparente e inmutable.

📌 ¿Qué hace el proyecto?

BikeChain implementa un sistema CRUD completo para administrar bicicletas en una tienda:

Crear bicicletas registradas por el dueño de la tienda

Consultar todas las bicicletas registradas

Actualizar el precio o información de una bicicleta

Eliminar bicicletas del catálogo

Cada bicicleta se guarda como una cuenta derivada (PDA) en la blockchain, lo que garantiza que:

Cada bicicleta tenga una dirección única

Solo el propietario pueda modificarla

Los datos permanezcan almacenados en la blockchain

🏗️ Arquitectura
Owner (Wallet)
    │
    └── Bicicleta A (PDA)
    └── Bicicleta B (PDA)
    └── Bicicleta C (PDA)

El owner (wallet) es quien controla las operaciones del catálogo de bicicletas.

📦 Struct principal
Bicicleta
Campo	Tipo	Descripción
nombre	String	Nombre de la bicicleta
precio	u64	Precio de la bicicleta
usuario	Pubkey	Wallet del dueño que registró la bicicleta
⚙️ Instrucciones (Funciones del programa)
Instrucción	Descripción
crear_bicicleta(nombre, precio)	Registra una nueva bicicleta
listar_bicicletas()	Consulta todas las bicicletas registradas
actualizar_bicicleta(nombre, precio)	Actualiza el precio o datos
eliminar_bicicleta(nombre)	Elimina la bicicleta del sistema
🔐 PDAs (Program Derived Addresses)

Las cuentas de bicicletas se generan usando seeds:

["bicicleta", owner_pubkey, nombre_bicicleta]

Esto garantiza que:

Cada bicicleta tiene una dirección única

Un usuario no puede registrar dos bicicletas con el mismo nombre

Solo el owner puede modificar o eliminar su bicicleta

🚀 Cómo usar el proyecto (Solana Playground)

Abrir Solana Playground

Subir o copiar el contenido del archivo lib.rs

Conectar tu wallet en Devnet

Hacer clic en:

Build
Deploy

Usar los tests o el cliente para interactuar.

Ejemplo de flujo
1. crear_bicicleta("Bicicleta MTB", 9000)
2. listar_bicicletas()
3. actualizar_bicicleta("Bicicleta MTB", 8500)
4. eliminar_bicicleta("Bicicleta MTB")
🛠️ Tecnologías

Solana — Blockchain de alta velocidad

Anchor Framework — Framework para programas Solana

Rust — Lenguaje de programación del programa

📂 Estructura del proyecto
Bicicletas-Solana
│
├── origen
│   └── lib.rs
│
├── cliente
│   └── client.ts
│
├── pruebas
│   └── anchor.test.ts
│
└── README.md
👤 Autor

Proyecto desarrollado como parte de la certificación de desarrollo en Solana.
