import * as anchor from "@coral-xyz/anchor";

describe("bici", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Bici;

  it("Crear bicicleta", async () => {

    const bicicleta = anchor.web3.Keypair.generate();

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
  });

});
