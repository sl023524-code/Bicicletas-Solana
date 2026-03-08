use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod bici {
    use super::*;

    pub fn crear_bicicleta(
        ctx: Context<CrearBicicleta>,
        modelo: String,
        marca: String,
        precio: u64,
    ) -> Result<()> {

        let bicicleta = &mut ctx.accounts.bicicleta;

        bicicleta.owner = ctx.accounts.usuario.key();
        bicicleta.modelo = modelo;
        bicicleta.marca = marca;
        bicicleta.precio = precio;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CrearBicicleta<'info> {

    #[account(init, payer = usuario, space = 8 + 32 + 64 + 64 + 8)]
    pub bicicleta: Account<'info, Bicicleta>,

    #[account(mut)]
    pub usuario: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Bicicleta {
    pub owner: Pubkey,
    pub modelo: String,
    pub marca: String,
    pub precio: u64,
}
