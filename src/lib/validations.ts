import { z } from 'zod';

const requiredString = z.string();

const auth = z.object({
  access_id: requiredString.min(1, {message: 'Access ID is required!!'}),
  password: requiredString.min(1, {message: 'Password is required!!'}),
  otp: requiredString.min(1, {message: 'OTP is required!!'}),
  passphrase: requiredString.min(1, {message: 'Passphrase is required!!'}),
});

export const loginSchema = auth.pick({access_id: true, password: true})
export type loginValues = z.infer<typeof loginSchema>;

export const otpSchema = auth.pick({otp: true})
export type otpValues = z.infer<typeof otpSchema>;

export const passphraseSchema = auth.pick({passphrase: true})
export type passphraseValues = z.infer<typeof passphraseSchema>;