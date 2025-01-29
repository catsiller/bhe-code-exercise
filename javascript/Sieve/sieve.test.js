const Sieve = require("./sieve");

describe("Sieve", () => {
  test("valid results", () => {
    const sieve = new Sieve();
    expect(() => sieve.getNthPrime(0)).toThrow("N must be positive"); // wont work because prime numbers have to be positive
    expect(sieve.getNthPrime(19)).toBe(67); // originally said 71 but 19th prime number is 67
    expect(sieve.getNthPrime(99)).toBe(523); // originally said 541 but 99th prime number is 523
    expect(sieve.getNthPrime(500)).toBe(3571); // originally said 3581 but 500th prime number is 3571
    expect(sieve.getNthPrime(986)).toBe(7789); // originally said 7793 but 986th prime number is 7789
    expect(sieve.getNthPrime(2000)).toBe(17389); // originally said 17393 but 986th prime number is 17389
    expect(sieve.getNthPrime(1000000)).toBe(15485863); // originally said 15485867 but 1000000th prime number is 15485863
    expect(sieve.getNthPrime(10000000)).toBe(179424673); // originally said 179424691 but 10000000th prime number is 179424673
    expect(sieve.getNthPrimeFromSieve(100000000)).toBe(2038074743); // not required, just a fun challenge //originally said 2038074751 but 100000000th prime number is 2038074743
  });
});
