import isProd from "./isProd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function logIfDebug(...args: Array<any>): void {
  if (!isProd() && process.env.DEBUG === "true") {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}
