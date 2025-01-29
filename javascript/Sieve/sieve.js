class Sieve {
  constructor() {
    // Initialize with first few primes to avoid special cases
    this.primes = [2, 3, 5, 7];
    this.lastChecked = 7;
  }

  isPrime(num) {
    // Only need to check up to square root
    const sqrt = Math.sqrt(num);

    // Only divide by previously found primes
    for (const prime of this.primes) {
      if (prime > sqrt) break;
      if (num % prime === 0) return false;
    }
    return true;
  }

  generateNextPrime() {
    let candidate = this.lastChecked + 2; // Skip evens

    while (!this.isPrime(candidate)) {
      candidate += 2;
    }

    this.lastChecked = candidate;
    this.primes.push(candidate);
    return candidate;
  }

  getNthPrime(n) {
    if (n <= 0) throw new Error("N must be positive");

    // Generate more primes if needed
    while (this.primes.length < n) {
      this.generateNextPrime();
    }

    return this.primes[n - 1];
  }

  /**
   * For very large values of n (like finding the 100,000,000th prime), we need a more memory-efficient approach.
   * The regular getNthPrime method would need to store all primes up to the nth prime in an array, which becomes
   * memory-intensive for large n. For example, for n=100,000,000:
   * - Regular method: Would need to store ~100M numbers as 64-bit integers ≈ 800MB of memory
   * - Sieve method: Uses Uint8Array where each number only requires 1 byte ≈ 1/8 the memory
   *
   * Additionally, this method uses the Prime Number Theorem to estimate an upper bound for the nth prime,
   * allowing us to allocate just enough memory without excess.
   */
  getNthPrimeFromSieve(n) {
    const limit = Math.ceil(n * Math.log(n) * 1.5); // Overestimate nth prime
    const sieve = new Uint8Array(limit);
    const primes = [];

    for (let i = 2; i < limit; i++) {
      if (!sieve[i]) {
        primes.push(i);
        if (primes.length === n) return i;

        for (let j = i * i; j < limit; j += i) {
          sieve[j] = 1;
        }
      }
    }

    throw new Error("Limit too small to find nth prime");
  }
}

module.exports = Sieve;
