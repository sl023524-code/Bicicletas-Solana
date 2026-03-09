import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.BicicletasSolana;
const wallet = provider.wallet;


// CREAR BICICLETA
export const crearBicicleta = async (nombre: string, precio: number) => {

  const [bicicletaPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("bicicleta"),
      wallet.publicKey.toBuffer(),
      Buffer.from(nombre),
    ],
    program.programId
  );

  await program.methods
    .crearBicicleta(nombre, new anchor.BN(precio))
    .accounts({
      bicicleta: bicicletaPDA,
      usuario: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  console.log("Bicicleta creada:", bicicletaPDA.toString());
};



// LISTAR BICICLETAS
export const listarBicicletas = async () => {

  const bicicletas = await program.account.bicicleta.all();

  bicicletas.forEach((bici) => {

    console.log("Dirección:", bici.publicKey.toString());
    console.log("Nombre:", bici.account.nombre);
    console.log("Precio:", bici.account.precio.toNumber());
    console.log("Usuario:", bici.account.usuario.toString());
    console.log("---------------------------");

  });

};



// ACTUALIZAR BICICLETA
export const actualizarBicicleta = async (
  nombre: string,
  precio: number
) => {

  const [bicicletaPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("bicicleta"),
      wallet.publicKey.toBuffer(),
      Buffer.from(nombre),
    ],
    program.programId
  );

  await program.methods
    .actualizarBicicleta(nombre, new anchor.BN(precio))
    .accounts({
      bicicleta: bicicletaPDA,
      usuario: wallet.publicKey,
    })
    .rpc();

  console.log("Bicicleta actualizada");

};



// ELIMINAR BICICLETA
export const eliminarBicicleta = async (nombre: string) => {

  const [bicicletaPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("bicicleta"),
      wallet.publicKey.toBuffer(),
      Buffer.from(nombre),
    ],
    program.programId
  );

  await program.methods
    .eliminarBicicleta()
    .accounts({
      bicicleta: bicicletaPDA,
      usuario: wallet.publicKey,
    })
    .rpc();

  console.log("Bicicleta eliminada");

};
