import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Bikechain } from "../target/types/bikechain";

describe("bikechain", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Bikechain as Program<Bikechain>;

  const modelo = "Bici montaña";

  let bicicletaPDA;

  it("Crear bicicleta", async () => {

    [bicicletaPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("bicicleta"),
        Buffer.from(modelo),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    await program.methods
      .crearBicicleta(modelo, "Trek", new anchor.BN(4500))
      .accounts({
        bicicleta: bicicletaPDA,
        usuario: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const cuenta = await program.account.bicicleta.fetch(bicicletaPDA);

    console.log("Bicicleta creada:", cuenta);
  });

});
