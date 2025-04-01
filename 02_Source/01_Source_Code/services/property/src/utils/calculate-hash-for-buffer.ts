export async function calculateHashForBuffer(data: Buffer) {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(data);
  return hasher.digest("hex");
}
