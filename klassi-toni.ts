import { Logger, getLogger, getProvider, getContract, getAddressFromPK, FreedomSwaps, Matic } from "./deps.ts"
import { spassABI } from "./mod.ts"

export class KlassiToni {

    public static instance: KlassiToni

    public static async getInstance(providerURL: string, pkTestWallet: string, token: string): Promise<KlassiToni> {
        if (KlassiToni.instance == undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger, providerURL)
            const erc20Contract = await getContract(token, spassABI, provider, pkTestWallet)
            KlassiToni.instance = new KlassiToni(logger, provider, erc20Contract)
        }
        return KlassiToni.instance
    }

    private logger: Logger
    private provider: any
    private erc20Contract: any

    public constructor(logger: Logger, provider: any, erc20Contract: any) {
        this.logger = logger
        this.provider = provider
        this.erc20Contract = erc20Contract
    }

    public async showTokenBalanceOf(walletAddress: string) {
        this.logger.info(await this.erc20Contract.balanceOf(walletAddress))
    }

    public async getLightSpeedInMetersPerSecond() {
        return this.erc20Contract.getLightSpeedInMetersPerSecond()
    }

    public async getProportion() {
        return this.erc20Contract.getProportion()
    }

    public async getFibonacciSequence(amountOfEntries: number) {
        return this.erc20Contract.getFibbonacciSequence(amountOfEntries)
    }

    public async keepDivineRatio(providerURL: string, pkTestWallet: string, factor: number) {
        const keepAmount = factor * await this.getProportion()
        const walletAddress = getAddressFromPK(pkTestWallet, this.provider)
        const balance = await this.erc20Contract.balanceOf(walletAddress)

        const sellAmount = balance - keepAmount
        if (sellAmount > 0) {
            this.logger.info(`selling ${sellAmount} of ${this.erc20Contract.target}`)
            const tokenIn = this.erc20Contract.target
            const tokenOut = Matic
            const amountIn = sellAmount
            const poolFee = 10000
            const slippage = 3
            const freedomSwaps = await FreedomSwaps.getInstance(providerURL)
            await freedomSwaps.swap(tokenIn, tokenOut, amountIn, poolFee, slippage, pkTestWallet)
        } else {
            this.logger.info(`relaxing`)
        }
    }
}