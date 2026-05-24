$CA = "B2Lc6R6JNqnpHkiBFkT2vN1J1m1BBkyBQzH2BgAXpump"

$p = "src\App.jsx"
$t = Get-Content $p -Raw

# Replace contract address everywhere through the main constant
$t = $t -replace "CONTRACT_ADDRESS:\s*'[^']+'", "CONTRACT_ADDRESS: '$CA'"

# Update live buy / chart links
$t = $t -replace "BUY_LINK:\s*'[^']+'", "BUY_LINK: 'https://dexscreener.com/solana/$CA'"
$t = $t -replace "DEXSCREENER_LINK:\s*'[^']+'", "DEXSCREENER_LINK: 'https://dexscreener.com/solana/$CA'"

# Header text -> CA
$t = $t.Replace("Community-driven. Fee-powered. Health-focused.", "CA: {LINKS.CONTRACT_ADDRESS}")

# Live stats
$t = $t.Replace("{ label: 'Total Fee Donations', value: 'Coming soon', icon: HandHeart },", "{ label: 'Total Fee Donations', value: 'Tracking live', icon: HandHeart },")
$t = $t.Replace("{ label: 'Holders', value: 'Coming soon', icon: Wallet },", "{ label: 'Holders', value: 'Live on Dexscreener', icon: Wallet },")
$t = $t.Replace("{ label: 'Volume', value: 'Coming soon', icon: Coins },", "{ label: 'Volume', value: 'Live on Dexscreener', icon: Coins },")
$t = $t.Replace("{ label: 'Transparency Reports', value: 'Pending', icon: FileText },", "{ label: 'Transparency Reports', value: 'First report pending', icon: FileText },")

# Live wording
$t = $t.Replace("Launch Dashboard", "Live Dashboard")
$t = $t.Replace("Active after launch", "LIVE")
$t = $t.Replace("Launch pending", "LIVE")
$t = $t.Replace("Vault pending", "Vault live")
$t = $t.Replace("Will `$HBANK trend after launch?", "Will `$HBANK trend live?")
$t = $t.Replace("HealthBank is built around a simple fee-routing concept with public reporting planned after launch.", "HealthBank is live on Solana with a fee-routing concept and public reporting updates.")
$t = $t.Replace("HealthBank will publish wallet addresses, transaction links and reports so the community can verify donation activity.", "HealthBank publishes wallet addresses, transaction links and reports so the community can verify donation activity.")
$t = $t.Replace("Final fee settings, liquidity structure and token configuration will be published before launch.", "Live token settings and transaction data can be verified through the published contract address and public Solana explorers.")
$t = $t.Replace("Simple, transparent placeholders", "Live token overview")
$t = $t.Replace("Launch, route, report", "Live, route, report")
$t = $t.Replace("token launch, fee-routing reports", "live token, fee-routing reports")
$t = $t.Replace("Launch links", "Live links")
$t = $t.Replace("HealthBank should publish public wallet addresses, transaction links and transparency reports after launch.", "Users can verify activity through the published contract address, public Solana explorers and transparency reports as they are released.")

Set-Content $p $t -Encoding UTF8

Write-Host "Done. HealthBank is now LIVE with CA:" $CA