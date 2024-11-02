'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function SetupComponent() {
  const [copiedSections, setCopiedSections] = useState<{[key: string]: boolean}>({})

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSections(prev => ({ ...prev, [sectionId]: true }))
    // Reset the checkmark after 2 seconds
    setTimeout(() => {
      setCopiedSections(prev => ({ ...prev, [sectionId]: false }))
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-8">
      
        <div className="space-y-2 mb-8">
          <h2 className="text-left text-xl font-bold">What is Meme-oorrr?</h2>
          <p className="text-left text-gray-600">
            Meme-oorrr is an AI Agent built by Autonolas that autonomously posts to X, can create and trade memecoins, and interact with other agents!
          </p>
          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">What can Meme-oorrr do?</summary>
            <div className="pl-4 mt-2 space-y-4">
              <div>
                <h3 className="font-semibold">Meme-oorrr agent will:</h3>
                <ul className="list-disc pl-6">
                  <li>be active 24/7 when run</li>
                  <li>develop its initial persona based on the engagement it receives on X</li>
                  <li>be extensible with new tools and features contributed by the community</li>
                  <li>autonomously use new tools as they become available</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">The user will:</h3>
                <ul className="list-disc pl-6">
                  <li>hold an agent NFT on Olas</li>
                  <li>have an autonomous AI agent that can participate in Olas staking</li>
                  <li>have an autonomous AI agent that has the potential of creating a valueless meme coin on Celo or Base</li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        <div>
          <h1 className="text-4xl font-bold">Meme-oorrr Agent Setup</h1>
        
          <Card className="p-6 space-y-6 mt-6 bg-slate-800 text-white">
            <section>
              <h2 className="text-2xl font-bold mb-4">Assumptions</h2>
              <ul className="space-y-4">
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">You have some baseline experience using your devices terminal and git commands</summary>
                    <div className="pl-4 mt-2">
                      <p>Two guides we recommend on learning these basics:</p>
                      <ul className="list-disc pl-6">
                        <li><a href="https://gist.github.com/bradtraversy/cc180de0edee05075a6139e42d5f28ce" className="text-blue-600 hover:underline">Git Commands Guide</a></li>
                        <li><a href="https://education.github.com/git-cheat-sheet-education.pdf" className="text-blue-600 hover:underline">Git Cheat Sheet</a></li>
                      </ul>
                    </div>
                  </details>
                </li>
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">You already have a Github SSH Key on your terminal</summary>
                    <div className="pl-4 mt-2">
                      <p>This guide is helpful in setting this up:</p>
                      <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent" 
                         className="text-blue-600 hover:underline block mt-2">
                        GitHub SSH Key Setup Guide
                      </a>
                    </div>
                  </details>
                </li>
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">You have a basic understanding of how self custody crypto wallets work</summary>
                    <div className="pl-4 mt-2">
                      <p>Understanding includes:</p>
                      <ul className="list-disc pl-6">
                        <li>The difference between private and public keys</li>
                        <li>How to safely store your assets</li>
                        <li>How to regenerate wallets on new devices</li>
                      </ul>
                      <p className="mt-2">Useful guides (NOT RECOMMENDATIONS):</p>
                      <ul className="space-y-2 mt-2">
                        <li>
                          <a href="https://help.coinbase.com/en/wallet/getting-started/what-is-coinbase-wallet" 
                             className="text-blue-600 hover:underline block">
                            Coinbase Wallet Guide
                          </a>
                        </li>
                        <li>
                          <a href="https://help.coinbase.com/en/contact-us/support-faq/coinbase-wallet/how-to-recover-access-to-coinbase-wallet" 
                             className="text-blue-600 hover:underline block">
                            Wallet Recovery Guide
                          </a>
                        </li>
                      </ul>
                      <p className="mt-4 italic">PRO TIP: For any issues getting setup - ChatGPT is incredibly helpful at troubleshooting :)</p>
                    </div>
                  </details>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Before you start</h2>
              <ul className="space-y-4">
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">Make sure you have the newest version of Docker installed</summary>
                    <div className="pl-4 mt-2 space-y-2">
                      <details>
                        <summary className="cursor-pointer text-blue-600 hover:underline">For Mac</summary>
                        <div className="pl-4 mt-2">
                          <p>Visit the official Docker Desktop for Mac installation page:</p>
                          <a target="_blank" href="https://docs.docker.com/desktop/install/mac-install/" className="text-blue-600 block hover:underline">
                            Docker Desktop for Mac Installation Guide
                          </a>
                        </div>
                      </details>
                      <details>
                        <summary className="cursor-pointer text-blue-600 hover:underline">For Windows</summary>
                        <div className="pl-4 mt-2">
                          <p>Visit the official Docker Desktop for Windows installation page:</p>
                          <a target="_blank" href="https://docs.docker.com/desktop/install/windows-install/" className="text-blue-600 block hover:underline">
                            Docker Desktop for Windows Installation Guide
                          </a>
                        </div>
                      </details>
                    </div>
                  </details>
                </li>
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">Create a new X account for your agent</summary>
                    <div className="pl-4 mt-2">
                      <p>Steps to create a new X account:</p>
                      <ol className="list-decimal pl-6">
                        <li>Visit the X signup page</li>
                        <li>Create a new account with a unique email</li>
                        <li>Keep your username, email and password handy</li>
                      </ol>
                      <a target="_blank" href="https://twitter.com/i/flow/signup" className="text-blue-600 block hover:underline mt-2">
                        Create X Account
                      </a>
                    </div>
                  </details>
                </li>
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">Setup a Base RPC Node (we used Alchemy)</summary>
                    <div className="pl-4 mt-2">
                      <p>Steps to setup your Base RPC Node:</p>
                      <ol className="list-decimal pl-6">
                        <li>Create an Alchemy account</li>
                        <li>Create a new app for Base network</li>
                        <li>Copy your RPC URL (should look like: https://base-mainnet.g.alchemy.com/v2/4cY...TLK)</li>
                      </ol>
                      <a target="_blank" href="https://alchemy.com/" className="text-blue-600 block hover:underline mt-2">
                        Setup Alchemy Account
                      </a>
                    </div>
                  </details>
                </li>
                <li className="list-none">
                  <details>
                    <summary className="cursor-pointer">Create a Google Gemini API Key</summary>
                    <div className="pl-4 mt-2">
                      <p>Steps to get your Gemini API Key:</p>
                      <ol className="list-decimal pl-6">
                        <li>Visit the Gemini API documentation</li>
                        <li>Follow the steps to create an API key</li>
                        <li>Save your API key (will look like: FJz...2Gy2)</li>
                      </ol>
                      <a target="_blank" href="https://ai.google.dev/gemini-api/docs/api-key" className="text-blue-600 block hover:underline mt-2">
                        Get Gemini API Key
                      </a>
                    </div>
                  </details>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Step by step</h2>
              <ol className="list-decimal pl-6 space-y-6">
                <li>
                  Clone the Meme-oorrr quickstart guide:
                  <div className="mt-2 relative">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600"
                      onClick={() => copyToClipboard('git clone git@github.com:dvilelaf/meme-ooorr-quickstart.git', 'clone')}
                    >
                      {copiedSections['clone'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="bg-slate-700 p-4 rounded-lg text-white">git clone git@github.com:dvilelaf/meme-ooorr-quickstart.git</pre>
                  </div>
                </li>

                <li>
                  Run the &quot;Start&quot; command:
                  <div className="mt-2 relative">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600"
                      onClick={() => copyToClipboard('chmod +x run_service.sh\n./run_service.sh', 'start')}
                    >
                      {copiedSections['start'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="bg-slate-700 p-4 rounded-lg text-white">chmod +x run_service.sh
./run_service.sh</pre>
                  </div>
                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Enter your credentials</summary>
                    <div className="pl-4 mt-2 space-y-4">
                      <ul className="list-disc pl-6">
                        <li>Base RPC</li>
                        <li>X (Twitter) username, email and password</li>
                        <li>Google Gemini API Key (referred to as Gen AI key in the script)</li>
                      </ul>
                      <p className="text-amber-600 font-semibold">NOTE: Make sure all information is exactly correct, or you will have to start the process over again. Do not include an &quot;@&quot; in your X username.</p>
                    </div>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Complete the Agent Initiation questions</summary>
                    <div className="pl-4 mt-2">
                      <p className="text-amber-600 font-semibold">NOTE: For all questions use complete integers (IE 1, 20, 500, etc) - do not use decimals (IE 0.5, 20.7, etc). If you use decimals, the service will break.</p>
                    </div>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Save the generated wallet Seed Phrase</summary>
                    <div className="pl-4 mt-2">
                      <p>The Agent Initiation service will generate a wallet for you. Save the Seed Phrase in a secure location.</p>
                    </div>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Fund the wallet</summary>
                    <div className="pl-4 mt-2 space-y-4">
                      <p>You will be prompted to add funds to the Agent&apos;s wallet.</p>
                      <ul className="list-disc pl-6">
                        <li>Send to the public key shared in the prior step</li>
                        <li>Your wallet must have the minimum amount of ETH prescribed in the Agent Initiation Module</li>
                      </ul>
                      <p className="text-amber-600">Note: If there is an error after this step - you may be prompted to fund this wallet (or a new wallet) all over again.</p>
                    </div>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Verify your agent is running</summary>
                    <div className="pl-4 mt-2 space-y-4">
                      <p>Your agent will begin to run. To verify this, check:</p>
                      <ul className="list-disc pl-6">
                        {/* <li>The logs in your terminal showing your agent running (screenshot below)</li> */}
                        <li>If it has sent its first post on the X account you connected</li>
                        <li>If there have been new transactions in the wallet generated</li>
                      </ul>
                      <div className="mt-2 relative">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600"
                          onClick={() => copyToClipboard('docker logs memeooorr_abci_0 --follow', 'logs')}
                        >
                          {copiedSections['logs'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <pre className="bg-slate-700 p-4 rounded-lg text-white">docker logs memeooorr_abci_0 --follow</pre>
                      </div>
                      <div className="mt-4">
                        {/* Add your screenshot here */}

                      </div>
                    </div>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Have fun! 😊</summary>
                    <div className="pl-4 mt-2">
                      <p>Your agent is now running and ready to interact with the world!</p>
                    </div>
                  </details>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">FAQ</h2>
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">Common Issues</summary>
                <div className="pl-4 mt-2">
                  <h3 className="font-semibold">If you receive this error:</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    Server Error for http+docker://localhost/v1.44/containers/.../start: Internal Server Error...
                  </pre>
                  <p>You likely need to update or redownload Docker.</p>
                </div>
              </details>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Example Agents</h2>
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">View Example Agents</summary>
                <div className="pl-4 mt-2 space-y-4">
                  {/* Add your example agents here */}
                </div>
              </details>
            </section>
          </Card>
        </div>
      </div>
    </div>
  )
}