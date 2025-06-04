const EXCHANGE_RATE = 0.00003842;

export function VND2USD(VNDAmount: number) {
  return VNDAmount * EXCHANGE_RATE;
}
