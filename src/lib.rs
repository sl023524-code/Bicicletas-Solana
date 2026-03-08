use anchor_lang::prelude::*;

declare_id!("Bici1111111111111111111111111111111111111");

#[program]
pub mod bikechain {
    use super::*;

    pub fn crear_bicicleta(
        ctx: Context<CrearBicicleta>,
        modelo: String,
        marca: String,
        precio: u64,
    ) -> Result<()> {

        let bicicleta = &mut ctx.accounts.bicicleta;

        bicicleta.owner = *ctx.accounts.usuario.key;
        bicicleta.modelo = modelo;
        bicicleta.marca = marca;
        bicicleta.precio = precio;
        bicicleta.disponible = true;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(modelo: String)]
pub struct CrearBicicleta<'info> {

    #[account(
        init,
        payer = usuario,

        space = 8 + 32 + 50 + 50 + 8 + 1,

        seeds = [
            b"bicicleta",
            modelo.as_bytes(),
            usuario.key().as_ref()
        ],
        bump
    )]

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
    pub disponible: bool,
}
