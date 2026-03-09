use anchor_lang::prelude::*;

declare_id!("Bici1111111111111111111111111111111111111");

#[program]
pub mod bicicletas_solana {
    use super::*;

    pub fn crear_bicicleta(
        ctx: Context<CrearBicicleta>,
        nombre: String,
        precio: u64,
    ) -> Result<()> {

        let bicicleta = &mut ctx.accounts.bicicleta;

        bicicleta.nombre = nombre;
        bicicleta.precio = precio;
        bicicleta.usuario = *ctx.accounts.usuario.key;

        Ok(())
    }

    pub fn actualizar_bicicleta(
        ctx: Context<ActualizarBicicleta>,
        nombre: String,
        precio: u64,
    ) -> Result<()> {

        let bicicleta = &mut ctx.accounts.bicicleta;

        bicicleta.nombre = nombre;
        bicicleta.precio = precio;

        Ok(())
    }

    pub fn eliminar_bicicleta(
        _ctx: Context<EliminarBicicleta>,
    ) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(nombre: String)]
pub struct CrearBicicleta<'info> {

    #[account(
        init,
        payer = usuario,
        space = 8 + 100 + 8 + 32,
        seeds = [b"bicicleta", usuario.key().as_ref(), nombre.as_bytes()],
        bump
    )]
    pub bicicleta: Account<'info, Bicicleta>,

    #[account(mut)]
    pub usuario: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ActualizarBicicleta<'info> {

    #[account(
        mut,
        seeds = [b"bicicleta", usuario.key().as_ref(), bicicleta.nombre.as_bytes()],
        bump
    )]
    pub bicicleta: Account<'info, Bicicleta>,

    pub usuario: Signer<'info>,
}

#[derive(Accounts)]
pub struct EliminarBicicleta<'info> {

    #[account(
        mut,
        close = usuario,
        seeds = [b"bicicleta", usuario.key().as_ref(), bicicleta.nombre.as_bytes()],
        bump
    )]
    pub bicicleta: Account<'info, Bicicleta>,

    #[account(mut)]
    pub usuario: Signer<'info>,
}

#[account]
pub struct Bicicleta {

    pub nombre: String,
    pub precio: u64,
    pub usuario: Pubkey,
}
