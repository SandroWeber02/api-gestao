import { Perfil, Usuario } from "@prisma/client";
import { prisma } from "../../config/database";

type CreateUsuarioInput = {
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil;
};

export async function findUsuarioByEmail(email: string): Promise<Usuario | null> {
  return prisma.usuario.findUnique({ where: { email } });
}

export async function findUsuarioById(id: string): Promise<Usuario | null> {
  return prisma.usuario.findUnique({ where: { id } });
}

export async function createUsuario(data: CreateUsuarioInput): Promise<Usuario> {
  return prisma.usuario.create({ data });
}
