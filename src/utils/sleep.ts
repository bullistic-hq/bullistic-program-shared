export default async function sleep(seconds = 1): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}
