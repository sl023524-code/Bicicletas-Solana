import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BicicletasSolana } from "../target/types/bicicletas_solana";

describe("bicicletas-solana", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BicicletasSolana as Program<BicicletasSolana>;

  const wallet = provider.wallet;

  const nombre = "Bicicleta MTB";
  const precio = new anchor.BN(9000);

  let bicicletaPDA: anchor.web3.PublicKey;

  it("Crear bicicleta", async () => {

    [bicicletaPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("bicicleta"),
        wallet.publicKey.toBuffer(),
        Buffer.from(nombre),
      ],
      program.programId
    );

    await program.methods
      .crearBicicleta(nombre, precio)
      .accounts({
        bicicleta: bicicletaPDA,
        usuario: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Bicicleta creada:", bicicletaPDA.toString());
  });


  it("Leer bicicletas", async () => {

    const bicicletas = await program.account.bicicleta.all();

    bicicletas.forEach((bici) => {

      console.log("Dirección:", bici.publicKey.toString());
      console.log("Nombre:", bici.account.nombre);
      console.log("Precio:", bici.account.precio.toNumber());

    });

  });


  it("Actualizar bicicleta", async () => {

    await program.methods
      .actualizarBicicleta(nombre, new anchor.BN(8500))
      .accounts({
        bicicleta: bicicletaPDA,
        usuario: wallet.publicKey,
      })
      .rpc();

    console.log("Bicicleta actualizada");

  });


  it("Eliminar bicicleta", async () => {

    await program.methods
      .eliminarBicicleta()
      .accounts({
        bicicleta: bicicletaPDA,
        usuario: wallet.publicKey,
      })
      .rpc();

    console.log("Bicicleta eliminada");

  });

});
