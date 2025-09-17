import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { clusterApiUrl } from '@solana/web3.js'
import { IDL } from './idl/counter'

const PROGRAM_ID = new PublicKey('CodYjPSj9JePDk1wqiKWn4qQJxnKgxV8tY59DSiT1dR7')
const TEST_PDA_SEED = 'test-pda'

function App() {
  const [count, setCount] = useState<number>(0)
  const [isDelegated, setIsDelegated] = useState<boolean>(false)
  const { connection } = useConnection()
  const wallet = useWallet()

  const getProvider = () => {
    if (!wallet.publicKey) return null
    return new AnchorProvider(
      connection,
      wallet as any,
      { commitment: 'confirmed' }
    )
  }

  const handleInitialize = async () => {
    const provider = getProvider()
    if (!provider) return

    try {
      const program = new Program(IDL, PROGRAM_ID, provider)
      const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(TEST_PDA_SEED)],
        program.programId
      )

      await program.methods
        .initialize()
        .accounts({
          counter: pda,
          user: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc()

      setCount(0)
    } catch (error) {
      console.error('Error initializing counter:', error)
    }
  }

  const handleIncrement = async () => {
    const provider = getProvider()
    if (!provider) return

    try {
      const program = new Program(IDL, PROGRAM_ID, provider)
      const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(TEST_PDA_SEED)],
        program.programId
      )

      await program.methods
        .increment()
        .accounts({
          counter: pda,
        })
        .rpc()

      setCount(prev => prev + 1)
    } catch (error) {
      console.error('Error incrementing counter:', error)
    }
  }

  const handleDelegate = async () => {
    const provider = getProvider()
    if (!provider) return

    try {
      const program = new Program(IDL, PROGRAM_ID, provider)
      const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(TEST_PDA_SEED)],
        program.programId
      )

      await program.methods
        .delegate()
        .accounts({
          payer: provider.wallet.publicKey,
          pda: pda,
        })
        .rpc()

      setIsDelegated(true)
    } catch (error) {
      console.error('Error delegating counter:', error)
    }
  }

  const handleCommit = async () => {
    const provider = getProvider()
    if (!provider) return

    try {
      const program = new Program(IDL, PROGRAM_ID, provider)
      const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(TEST_PDA_SEED)],
        program.programId
      )

      await program.methods
        .commit()
        .accounts({
          payer: provider.wallet.publicKey,
          counter: pda,
        })
        .rpc()
    } catch (error) {
      console.error('Error committing counter:', error)
    }
  }

  const handleUndelegate = async () => {
    const provider = getProvider()
    if (!provider) return

    try {
      const program = new Program(IDL, PROGRAM_ID, provider)
      const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(TEST_PDA_SEED)],
        program.programId
      )

      await program.methods
        .incrementAndUndelegate()
        .accounts({
          payer: provider.wallet.publicKey,
          counter: pda,
        })
        .rpc()

      setIsDelegated(false)
    } catch (error) {
      console.error('Error undelegating counter:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white">Magic Counter</CardTitle>
            <Badge variant="outline" className={`${wallet.connected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {wallet.connected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          <CardDescription className="text-gray-400">
            A simple counter powered by Solana and Magic Block
          </CardDescription>
        </CardHeader>
        <Separator className="my-4 bg-white/10" />
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            <div className="text-6xl font-bold text-white">{count}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleInitialize}
                  disabled={!wallet.connected}
                  className="flex-1 bg-purple-500/20 text-white font-semibold border-purple-500/50 hover:bg-purple-500/30 hover:border-purple-500/70 disabled:bg-gray-700/20 disabled:border-gray-600/30 disabled:text-gray-400"
                >
                  Initialize
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleIncrement}
                  disabled={!wallet.connected}
                  className="flex-1 bg-blue-500/20 text-white font-semibold border-blue-500/50 hover:bg-blue-500/30 hover:border-blue-500/70 disabled:bg-gray-700/20 disabled:border-gray-600/30 disabled:text-gray-400"
                >
                  Increment
                </Button>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={isDelegated ? handleUndelegate : handleDelegate}
                  disabled={!wallet.connected}
                  className="flex-1 bg-green-500/20 text-white font-semibold border-green-500/50 hover:bg-green-500/30 hover:border-green-500/70 disabled:bg-gray-700/20 disabled:border-gray-600/30 disabled:text-gray-400"
                >
                  {isDelegated ? 'Undelegate' : 'Delegate'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleCommit}
                  disabled={!wallet.connected || !isDelegated}
                  className="flex-1 bg-amber-500/20 text-white font-semibold border-amber-500/50 hover:bg-amber-500/30 hover:border-amber-500/70 disabled:bg-gray-700/20 disabled:border-gray-600/30 disabled:text-gray-400"
                >
                  Commit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <WalletMultiButton className="bg-purple-500 hover:bg-purple-600 text-white font-semibold" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
