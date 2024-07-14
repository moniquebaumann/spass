import { KlassiToni } from "https://deno.land/x/spass/mod.ts";

const providerURL = Deno.args[0] 
const pkTestWallet = Deno.args[1]
const tokenUnderTest = Deno.args[2] // e.g. 0x33b5624f20b41e2bc6d71fd039e3bd05524c1d82 // Spass on Polygon POS

const klassiToni = await KlassiToni.getInstance(providerURL, pkTestWallet, tokenUnderTest)
await klassiToni.showTokenBalanceOf("0xF5b1dB5B330DACb20BcFE5bAa99025399Dbb996B")

const divineProportion = await klassiToni.getProportion()
console.log(divineProportion)

const amountOfEntries = 9
const fibonacciSequence = await klassiToni.getFibonacciSequence(amountOfEntries)
console.log(fibonacciSequence)

const factor = BigInt(1)
await klassiToni.keepDivineRatio(providerURL, pkTestWallet, factor)