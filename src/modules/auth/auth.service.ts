import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Perfil, Usuario } from "@prisma/client";
import { env } from "../../config/env";
import { createUsuario, findUsuarioByEmail, findUsuarioById } from "./auth.repository";
import { LoginInput, RegisterInput } from "./auth.schema";

type PublicUsuario = Omit<Usuario, "senha">;

type AuthTokenPayload = {
  id: string;
  email: string;
  perfil: Perfil;
};

function sanitizeUsuario(usuario: Usuario): PublicUsuario {
  const { senha: _senha, ...safeUsuario } = usuario;
  return safeUsuario;
}

export async function registerService(input: RegisterInput): Promise<PublicUsuario> {
  const existingUsuario = await findUsuarioByEmail(input.email);

  if (existingUsuario) {
    throw new Error("Email já está em uso");
  }

  const senhaHash = await bcrypt.hash(input.senha, 10);

  const usuario = await createUsuario({
    nome: input.nome,
    email: input.email,
    senha: senhaHash,
    perfil: input.perfil,
  });

  return sanitizeUsuario(usuario);
}

export async function loginService(input: LoginInput): Promise<{ token: string }> {
  const usuario = await findUsuarioByEmail(input.email);

  if (!usuario) {
    throw new Error("Email ou senha inválidos");
  }

  const senhaCorreta = await bcrypt.compare(input.senha, usuario.senha);

  if (!senhaCorreta) {
    throw new Error("Email ou senha inválidos");
  }

  const payload: AuthTokenPayload = {
    id: usuario.id,
    email: usuario.email,
    perfil: usuario.perfil,
  };

  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });

  return { token };
}

export async function meService(userId: string): Promise<PublicUsuario> {
  const usuario = await findUsuarioById(userId);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return sanitizeUsuario(usuario);
}
