import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BicicletasSolana } from "../target/types/bicicletas_solana";

describe("bicicletas-solana", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BicicletasSolana as Program<BicicletasSolana>;

  const bicicleta = anchor.web3.Keypair.generate();

  it("Crear bicicleta", async () => {

    await program.methods
      .crearBicicleta("Bici montaña", "Trek", new anchor.BN(4500))
      .accounts({
        bicicleta: bicicleta.publicKey,
        usuario: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([bicicleta])
      .rpc();

    const cuenta = await program.account.bicicleta.fetch(bicicleta.publicKey);

    console.log("Bicicleta creada:", cuenta);
  });

});
