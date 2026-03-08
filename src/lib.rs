use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod bici {
    use super::*;

    // CREATE
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

    // UPDATE
    pub fn actualizar_bicicleta(
        ctx: Context<ActualizarBicicleta>,
        modelo: String,
        marca: String,
        precio: u64,
    ) -> Result<()> {

        let bicicleta = &mut ctx.accounts.bicicleta;

        bicicleta.modelo = modelo;
        bicicleta.marca = marca;
        bicicleta.precio = precio;

        Ok(())
    }

    // DELETE
    pub fn eliminar_bicicleta(
        _ctx: Context<EliminarBicicleta>
    ) -> Result<()> {
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

#[derive(Accounts)]
pub struct ActualizarBicicleta<'info> {

    #[account(mut)]
    pub bicicleta: Account<'info, Bicicleta>,

    pub usuario: Signer<'info>,
}

#[derive(Accounts)]
pub struct EliminarBicicleta<'info> {

    #[account(mut, close = usuario)]
    pub bicicleta: Account<'info, Bicicleta>,

    #[account(mut)]
    pub usuario: Signer<'info>,
}

#[account]
pub struct Bicicleta {
    pub owner: Pubkey,
    pub modelo: String,
    pub marca: String,
    pub precio: u64,
}
