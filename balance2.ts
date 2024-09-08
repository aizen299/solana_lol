
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const supplied = process.argv[2];
if (!supplied) {
  console.error("Please provide a Solana wallet address.");
  process.exit(1);
}

let publicKey;
try {
  publicKey = new PublicKey(supplied);
} catch (err) {
  console.error("Invalid Solana wallet address provided.");
  process.exit(1);
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(
      `Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`
    );
  } catch (err) {
    console.error("Error fetching balance for the provided wallet address.");
    console.error(err.message);
  }
})();