export type AuthRequest = Request & {
  user?: { id: string; email: string; name?: string; admin?: boolean };
};
