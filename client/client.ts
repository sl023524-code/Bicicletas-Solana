import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.Bikechain;

async function main() {

  const modelo = "Trek500";

  const [bicicletaPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("bicicleta"),
      Buffer.from(modelo),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  await program.methods
    .crearBicicleta(modelo, "Trek", new anchor.BN(5000))
    .accounts({
      bicicleta: bicicletaPDA,
      usuario: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  console.log("Bicicleta creada en:", bicicletaPDA.toString());
}

main();
