🚴 BikeChain — Gestión de Bicicletas en Solana

BikeChain es un programa on-chain desarrollado en Rust con Anchor sobre la blockchain de Solana.
Permite a dueños de tiendas administrar su catálogo de bicicletas de forma descentralizada, segura e inmutable.

📌 ¿Qué hace el proyecto?

BikeChain implementa un sistema CRUD completo para administrar una tienda de bicicletas:

Crear una tienda vinculada a la wallet del dueño

Registrar bicicletas con modelo, marca y precio

Actualizar información de una bicicleta

Eliminar bicicletas del catálogo

Activar o desactivar bicicletas disponibles para venta

Cada tienda y cada bicicleta se guardan como cuentas PDA en Solana, garantizando que:

✅ No existan duplicados
✅ Solo el dueño pueda modificar su tienda
✅ Los datos queden registrados en blockchain

🏗️ Arquitectura
Owner (Wallet)
    │
    └── Tienda (PDA)
            │
            ├── Bicicleta A (PDA)
            ├── Bicicleta B (PDA)
            └── Bicicleta C (PDA)
📦 Structs principales
Tienda
Campo	Tipo	Descripción
owner	Pubkey	Wallet del dueño
nombre	String	Nombre de la tienda
bicicletas	Vec<Pubkey>	Lista de bicicletas registradas
Bicicleta
Campo	Tipo	Descripción
tienda	String	Nombre de la tienda
modelo	String	Modelo de la bicicleta
marca	String	Marca
precio	u64	Precio
disponible	bool	Disponible para venta
⚙️ Instrucciones del programa
Instrucción	Descripción
crear_tienda(nombre)	Crea la tienda vinculada al owner
registrar_bicicleta(modelo, marca, precio)	Registra una bicicleta
eliminar_bicicleta(modelo)	Elimina la bicicleta
alternar_disponibilidad(modelo)	Activa o desactiva venta
actualizar_precio(modelo, precio)	Cambia el precio
🔐 PDAs (Program Derived Addresses)

Las cuentas se generan con seeds.

Tienda
["tienda", nombre_tienda, owner_pubkey]
Bicicleta
["bicicleta", modelo_bicicleta, owner_pubkey]

Esto garantiza que:

✔ Cada dueño tenga su propia tienda
✔ No existan bicicletas duplicadas
✔ Solo el owner pueda modificar los datos

🚀 Cómo usar el proyecto

1️⃣ Abre
👉 Solana Playground

2️⃣ Haz fork del repositorio en
👉 GitHub

3️⃣ Pega el código en

src/lib.rs

4️⃣ Conecta tu wallet (Devnet)

5️⃣ Haz clic en:

Build
Deploy
🧪 Ejemplo de uso

Flujo para administrar bicicletas:

1 crear_tienda("BikeStore")

2 registrar_bicicleta("XTR-500", "Trek", 4500)

3 alternar_disponibilidad("XTR-500")

4 actualizar_precio("XTR-500", 5200)

5 eliminar_bicicleta("XTR-500")
🛠️ Tecnologías
Tecnología	Uso
Solana	Blockchain
Anchor Framework	Framework de programas
Rust	Lenguaje del smart contract
👤 Autor

Proyecto desarrollado por Sebas como parte de su aprendizaje en desarrollo blockchain con Solana.
