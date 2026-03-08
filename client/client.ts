import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.Bici;

async function main() {

  const bicicleta = anchor.web3.Keypair.generate();

  console.log("Cuenta bicicleta:", bicicleta.publicKey.toString());

  // CREATE
  await program.methods
    .crearBicicleta("Trek500", "Trek", new anchor.BN(5000))
    .accounts({
      bicicleta: bicicleta.publicKey,
      usuario: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([bicicleta])
    .rpc();

  console.log("Bicicleta creada");

  // UPDATE
  await program.methods
    .actualizarBicicleta("Trek600", "Trek", new anchor.BN(6000))
    .accounts({
      bicicleta: bicicleta.publicKey,
      usuario: provider.wallet.publicKey,
    })
    .rpc();

  console.log("Bicicleta actualizada");

  // DELETE
  await program.methods
    .eliminarBicicleta()
    .accounts({
      bicicleta: bicicleta.publicKey,
      usuario: provider.wallet.publicKey,
    })
    .rpc();

  console.log("Bicicleta eliminada");

}

main();
