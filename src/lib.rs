use anchor_lang::prelude::*;

declare_id!("Bici1111111111111111111111111111111111111");

#[program]
pub mod bikechain {
    use super::*;

    // CREAR BICICLETA
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

    // ACTUALIZAR BICICLETA
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

    // ELIMINAR BICICLETA
    pub fn eliminar_bicicleta(
        _ctx: Context<EliminarBicicleta>
    ) -> Result<()> {

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

#[derive(Accounts)]
pub struct ActualizarBicicleta<'info> {

    #[account(
        mut,
        seeds = [
            b"bicicleta",
            bicicleta.modelo.as_bytes(),
            usuario.key().as_ref()
        ],
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
        seeds = [
            b"bicicleta",
            bicicleta.modelo.as_bytes(),
            usuario.key().as_ref()
        ],
        bump
    )]

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
    pub disponible: bool,
}
