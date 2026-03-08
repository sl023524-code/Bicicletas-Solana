import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

describe("bikechain", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Bikechain as Program;

  it("Crear bicicleta", async () => {

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

    const cuenta = await program.account.bicicleta.fetch(bicicletaPDA);

    console.log("Bicicleta:", cuenta);

  });

});
