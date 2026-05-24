import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Coins,
  Copy,
  ExternalLink,
  FileText,
  Gauge,
  HandHeart,
  Heart,
  HeartPulse,
  Landmark,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  Vote,
  Wallet,
  X,
} from 'lucide-react'
import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from 'recharts'

const LINKS = {
  CONTRACT_ADDRESS: 'HBANK1111111111111111111111111111111111111',
  CHARITY_VAULT_ADDRESS: 'HVLT1111111111111111111111111111111111111',
  BUY_LINK: '#buy',
  DEXSCREENER_LINK: '#dexscreener',
  TELEGRAM_LINK: '#telegram',
  X_LINK: '#x',
  DOCS_LINK: '#docs',
  CHARITY_WALLET_LINK: '#charity-wallet',
  TRANSPARENCY_REPORT_LINK: '#transparency-report',
}

const charityFunds = [
  { name: 'Health In Harmony Inc', category: 'Charity', allocation: 25 },
  { name: 'Health Alliance for Austin Musicians', category: 'Charity', allocation: 25 },
  { name: 'Health Projects Center', category: 'Charity', allocation: 25 },
  { name: 'Health Career Connection Inc', category: 'Charity', allocation: 25 },
]

const stats = [
  { label: 'Total Fee Donations', value: 'Coming soon', icon: HandHeart },
  { label: 'Charity Funds', value: '4', icon: HeartPulse },
  { label: 'Buy Fee Split', value: '25% each', icon: CircleDollarSign },
  { label: 'Holders', value: 'Coming soon', icon: Wallet },
  { label: 'Volume', value: 'Coming soon', icon: Coins },
  { label: 'Transparency Reports', value: 'Pending', icon: FileText },
]

const howItWorks = [
  {
    title: 'Buy $HBANK',
    text: 'Every purchase contributes to the HealthBank ecosystem and activates the project fee-donation mechanic.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Fees Enter the Charity Vault',
    text: 'Configured buy-side project fees are collected into the HealthBank Charity Vault.',
    icon: Landmark,
  },
  {
    title: 'Fees Split 25/25/25/25',
    text: 'Donation flow is designed to be split equally across four selected health-related charity funds.',
    icon: Gauge,
  },
  {
    title: 'Track It On-Chain',
    text: 'HealthBank will publish wallet addresses, transaction links and reports so the community can verify donation activity.',
    icon: ShieldCheck,
  },
]

const bankBets = [
  {
    id: 'bank',
    title: 'Which bank gets memed next?',
    status: 'Social Round',
    options: ['Green Vault', 'Red Alert'],
    sentiment: 63,
  },
  {
    id: 'vault',
    title: 'Will the Charity Vault hit its next milestone?',
    status: 'Community Round',
    options: ['Pulse Up', 'Flatline'],
    sentiment: 72,
  },
  {
    id: 'trend',
    title: 'Will $HBANK trend after launch?',
    status: 'Meme Round',
    options: ['Send It', 'Emergency Room'],
    sentiment: 58,
  },
  {
    id: 'attention',
    title: 'Which charity gets the most community attention this week?',
    status: 'Charity Round',
    options: ['Fund A', 'Fund B'],
    sentiment: 51,
  },
]

const scoreTiers = [
  ['< 3 days', 'New Patient', '1.0x'],
  ['≥ 3 days', 'Stable Pulse', '1.25x'],
  ['≥ 7 days', 'Healthy Holder', '1.75x'],
  ['≥ 14 days', 'Vault Regular', '2.5x'],
  ['≥ 30 days', 'Prime Account', '3.5x'],
  ['≥ 60 days', 'Max HealthBank', '5.0x'],
]

const tokenomics = [
  ['Token Name', 'HealthBank'],
  ['Ticker', '$HBANK'],
  ['Chain', 'Solana'],
  ['Supply', '1,000,000,000'],
  ['Buy Fee', 'TBD'],
  ['Sell Fee', 'TBD'],
  ['Charity Fee Allocation', '100% of configured buy-side donation fee'],
  ['Charity Split', '25% / 25% / 25% / 25%'],
  ['Liquidity', 'TBD'],
  ['Team', 'TBD'],
  ['Marketing', 'TBD'],
  ['Community', 'TBD'],
]

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Diagnosis',
    items: ['Brand launch', 'Website', 'Socials', 'Community setup', 'Charity Vault concept'],
  },
  {
    phase: 'Phase 2',
    title: 'First Pulse',
    items: ['Token launch', 'Contract address publication', 'Dexscreener tracking', 'First transparency wallet setup'],
  },
  {
    phase: 'Phase 3',
    title: 'Charity Flow',
    items: ['Fee routing', 'Donation tracking', 'Public transaction reporting', 'Charity Vault dashboard'],
  },
  {
    phase: 'Phase 4',
    title: 'Bank Bets',
    items: ['Social prediction rounds', 'Meme votes', 'HealthBank Score', 'Community leaderboard'],
  },
  {
    phase: 'Phase 5',
    title: 'Full HealthBank Mode',
    items: ['Expanded transparency reports', 'Community-selected campaigns', 'More meme-bank mechanics', 'On-chain dashboard upgrades'],
  },
]

const faqs = [
  {
    q: 'Is HealthBank a bank?',
    a: 'No. HealthBank is a memecoin project. It is not a bank, financial institution or medical provider.',
  },
  {
    q: 'Where do the buy fees go?',
    a: 'Configured buy-side donation fees are designed to flow into the HealthBank Charity Vault and be split equally between the four listed charity recipients.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. $HBANK is a memecoin. Nothing on this site is financial, legal or medical advice.',
  },
  {
    q: 'Are Bank Bets real betting?',
    a: 'No. Bank Bets are social voting and meme sentiment mechanics only. They are not gambling or real-money betting.',
  },
  {
    q: 'How can users verify donations?',
    a: 'HealthBank should publish public wallet addresses, transaction links and transparency reports after launch.',
  },
]

const chartColors = ['#2AFF8E', '#6DFFD2', '#E9FF7C', '#FF3FB4']

function shortAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-5)}`
}

function App() {
  const [toast, setToast] = useState('')
  const [selectedBets, setSelectedBets] = useState({})
  const [walletInput, setWalletInput] = useState('')
  const [statement, setStatement] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast(`${label} copied`)
    } catch (error) {
      showToast('Copy failed. Select and copy manually.')
    }
  }

  const generateStatement = () => {
    const value = walletInput.trim() || 'DemoWallet1111111111111111111111111111111111'
    const seed = value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const daysHeld = (seed % 62) + 1
    const score = 600 + (seed % 391)
    const tier = daysHeld >= 60 ? 'Max HealthBank' : daysHeld >= 30 ? 'Prime Account' : daysHeld >= 14 ? 'Vault Regular' : daysHeld >= 7 ? 'Healthy Holder' : daysHeld >= 3 ? 'Stable Pulse' : 'New Patient'

    setStatement({
      wallet: shortAddress(value),
      balance: 'Demo',
      daysHeld: `${daysHeld} days`,
      score,
      impact: 'Demo fee-flow estimate',
      tier,
      status: 'Demo Account',
    })
  }

  const navLinks = [
    ['How it works', '#how-it-works'],
    ['Fee Donations', '#fee-flow'],
    ['Charity Vault', '#charity-vault'],
    ['Bank Bets', '#bank-bets'],
    ['Tokenomics', '#tokenomics'],
    ['Statement', '#statement'],
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white selection:bg-pulse selection:text-ink">
      <BackgroundFX />
      <Header navLinks={navLinks} menuOpen={menuOpen} setMenuOpen={setMenuOpen} copyText={copyText} />
      <Hero copyText={copyText} />
      <Ticker />
      <Stats />
      <HowItWorks />
      <CharityVault copyText={copyText} />
      <FeeFlow />
      <BankBets selectedBets={selectedBets} setSelectedBets={setSelectedBets} />
      <HealthScore />
      <Statement walletInput={walletInput} setWalletInput={setWalletInput} statement={statement} generateStatement={generateStatement} />
      <Tokenomics />
      <Roadmap />
      <Transparency />
      <FAQ />
      <Footer navLinks={navLinks} copyText={copyText} />
      <Toast message={toast} />
    </main>
  )
}

function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(42,255,142,0.18),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(255,63,180,0.12),transparent_30%),linear-gradient(180deg,#05070A_0%,#07110D_54%,#030405_100%)]">
      <div className="absolute inset-0 bg-grid-fade bg-[length:44px_44px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-pulse/10 blur-[120px]" />
      <div className="absolute bottom-10 right-[-120px] h-[420px] w-[420px] rounded-full bg-hot/10 blur-[100px]" />
    </div>
  )
}

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3">
      <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-pulse/25 bg-pulse/10 shadow-glow">
        <Heart className="h-5 w-5 fill-pulse text-pulse" />
        <div className="absolute inset-x-2 bottom-2 h-px bg-mint/70" />
      </div>
      <div>
        <div className="text-lg font-black tracking-tight">HealthBank</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-pulse/80">Solana Meme Bank</div>
      </div>
    </a>
  )
}

function Header({ navLinks, menuOpen, setMenuOpen, copyText }) {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-white/10 bg-ink/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-white/65 transition hover:text-pulse">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={() => copyText(LINKS.CONTRACT_ADDRESS, 'Contract')} className="btn-secondary">
            <Copy className="h-4 w-4" /> CA
          </button>
          <a href={LINKS.BUY_LINK} className="btn-primary">
            Buy $HBANK <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/75">
                {label}
              </a>
            ))}
            <a href={LINKS.BUY_LINK} className="btn-primary justify-center">
              Buy $HBANK <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-4 inline-flex rounded-full border border-pulse/25 bg-pulse/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-pulse">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-7 text-white/62 sm:text-lg">{text}</p>}
    </div>
  )
}

function Hero({ copyText }) {
  return (
    <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/72 shadow-glow">
            <span className="inline-flex h-2 w-2 rounded-full bg-pulse shadow-[0_0_18px_rgba(42,255,142,0.9)]" />
            Community-driven. Fee-powered. Health-focused.
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Buy <span className="text-gradient">$HBANK</span>. Fund the HealthBank.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
            HealthBank turns meme volume into health-focused donations. Purchase fees are designed to flow toward selected health-related charity funds while the community tracks the vault on-chain.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={LINKS.BUY_LINK} className="btn-primary justify-center px-6 py-4 text-base">
              Buy $HBANK <ArrowRight className="h-5 w-5" />
            </a>
            <button onClick={() => copyText(LINKS.CONTRACT_ADDRESS, 'Contract')} className="btn-secondary justify-center px-6 py-4 text-base">
              <Copy className="h-5 w-5" /> Copy Contract
            </button>
            <a href="#charity-vault" className="btn-ghost justify-center px-6 py-4 text-base">
              View Charity Vault
            </a>
          </div>
          <div className="mt-8 rounded-3xl border border-yellow-200/15 bg-yellow-200/[0.06] p-4 text-sm leading-6 text-yellow-50/78">
            $HBANK is a memecoin, not an investment product, bank, medical provider or financial service.
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-pulse/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-pulse/15 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-pulse">HealthBank Account</p>
                <h3 className="mt-2 text-2xl font-black">Launch Dashboard</h3>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-pulse/25 bg-pulse/10">
                <HeartPulse className="h-6 w-6 text-pulse" />
              </div>
            </div>
            <ECGLine />
            <div className="relative mt-5 grid gap-3">
              {[
                ['Network', 'Solana'],
                ['Token', '$HBANK'],
                ['Buy Fee Flow', 'Active after launch'],
                ['Charity Split', '25% each'],
                ['Transparency', 'On-chain reporting planned'],
                ['Status', 'Launch pending'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="text-sm text-white/50">{label}</span>
                  <span className="text-right text-sm font-black text-white">{value}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-pulse/20 bg-[linear-gradient(135deg,rgba(42,255,142,0.18),rgba(109,255,210,0.06),rgba(255,63,180,0.12))] p-5">
              <div className="absolute inset-0 bg-grid-fade bg-[length:24px_24px] opacity-20" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.26em] text-pulse">HEALTHBANK</p>
                  <p className="mt-8 text-2xl font-black tracking-tight">MEME BANK CARD</p>
                  <p className="mt-1 text-sm text-white/62">Fee donations enabled</p>
                </div>
                <Sparkles className="h-7 w-7 text-mint" />
              </div>
              <div className="relative mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                <span>HBANK • SOL</span>
                <span>Vault pending</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ECGLine() {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-pulse/20 bg-black/30 px-2 py-4">
      <svg viewBox="0 0 600 90" className="h-16 w-full">
        <path className="ecg-glow" d="M0 50 H90 L112 50 L128 22 L148 72 L166 50 H246 L260 50 L275 36 L292 64 L314 50 H404 L425 50 L444 18 L467 76 L488 50 H600" fill="none" stroke="rgba(42,255,142,0.22)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <path className="ecg-path" d="M0 50 H90 L112 50 L128 22 L148 72 L166 50 H246 L260 50 L275 36 L292 64 L314 50 H404 L425 50 L444 18 L467 76 L488 50 H600" fill="none" stroke="#2AFF8E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function Ticker() {
  const items = ['Meme volume. Health impact.', 'Buy fees flow into the Charity Vault.', 'Four health funds. Equal split.', 'Deposit memes. Route fees. Track the vault.', 'Built for Solana meme culture.']
  return (
    <div className="border-y border-white/10 bg-white/[0.035] py-3">
      <div className="ticker-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="mx-5 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-white/70">
            <Heart className="h-4 w-4 fill-pulse text-pulse" /> {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }, index) => (
          <motion.div key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="glass-card group p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/48">{label}</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white">{value}</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-pulse/10 text-pulse transition group-hover:scale-105 group-hover:bg-pulse/20">
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="How it works" title="From meme buy to donation flow" text="HealthBank is built around a simple fee-routing concept with public reporting planned after launch." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map(({ title, text, icon: Icon }, index) => (
          <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="glass-card p-6">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-3xl border border-pulse/20 bg-pulse/10 text-pulse">
              <Icon className="h-7 w-7" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/32">0{index + 1}</p>
            <h3 className="mt-3 text-xl font-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/58">{text}</p>
          </motion.div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-center text-sm leading-6 text-white/54">
        Actual fee routing depends on final token configuration, launch infrastructure and public wallet reporting.
      </p>
    </section>
  )
}

function CharityVault({ copyText }) {
  const chartData = useMemo(() => charityFunds.map((fund) => ({ name: fund.name, value: fund.allocation })), [])

  return (
    <section id="charity-vault" className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="Charity Vault"
        title="Four health funds. Equal split."
        text="Purchase fees from $HBANK are designed to flow into four selected health-related charity funds. No affiliation claims. Just transparent community-directed fee donations."
      />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card p-3 sm:p-4">
          <div className="grid gap-3">
            {charityFunds.map((fund, index) => (
              <motion.div key={fund.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-black/25 p-4 transition hover:border-pulse/35 hover:bg-pulse/[0.045] hover:shadow-glow">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-pulse/10 text-pulse shadow-glow">
                  <Heart className="h-7 w-7 fill-pulse text-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-black text-white sm:text-lg">{fund.name}</h3>
                  <div className="mt-2 flex items-center gap-2 text-xs font-black text-hot">
                    <span className="h-2 w-2 rounded-full bg-hot" /> {fund.category}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-lg font-black text-pulse">
                    <Activity className="h-4 w-4" /> {fund.allocation}%
                  </div>
                </div>
                <ChevronRight className="hidden h-5 w-5 text-white/25 transition group-hover:translate-x-1 group-hover:text-pulse sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-pulse">Fee Split</p>
              <h3 className="mt-2 text-2xl font-black">25 / 25 / 25 / 25</h3>
            </div>
            <div className="rounded-full border border-pulse/20 bg-pulse/10 px-4 py-2 text-sm font-black text-pulse">Equal flow</div>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={72} outerRadius={104} paddingAngle={5} cornerRadius={10}>
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} stroke="rgba(255,255,255,0.14)" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#07110D', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, color: '#fff' }}
                  formatter={(value) => [`${value}%`, 'Allocation']}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2">
            {charityFunds.map((fund, index) => (
              <div key={fund.name} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.035] px-4 py-3 text-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: chartColors[index] }} />
                  <span className="truncate text-white/70">{fund.name}</span>
                </div>
                <span className="font-black text-pulse">25%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={LINKS.CHARITY_WALLET_LINK} className="btn-secondary justify-center">
              View Donation Wallet <ExternalLink className="h-4 w-4" />
            </a>
            <a href={LINKS.TRANSPARENCY_REPORT_LINK} className="btn-secondary justify-center">
              Open Report <ExternalLink className="h-4 w-4" />
            </a>
            <button onClick={() => copyText(LINKS.CHARITY_VAULT_ADDRESS, 'Charity Vault address')} className="btn-primary justify-center sm:col-span-2">
              <Copy className="h-4 w-4" /> Copy Charity Vault Address
            </button>
          </div>
          <p className="mt-5 text-xs leading-6 text-white/45">
            Listed organizations are independent donation recipients selected for the HealthBank fee-donation concept. Donation execution, reporting and wallet routing must be verified through public on-chain records.
          </p>
        </div>
      </div>
    </section>
  )
}

function FeeFlow() {
  const steps = ['Buyer buys $HBANK', 'Buy fee is collected', 'Fee enters Charity Vault', 'Vault splits 25% each', 'Funds are sent', 'Community verifies on-chain']
  return (
    <section id="fee-flow" className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="Fee Donations" title="From buy fee to health fund" text="The core meta is simple: meme volume creates fee flow, and fee flow is directed toward health-related charity recipients." />
      <div className="mx-auto max-w-7xl">
        <div className="glass-card overflow-hidden p-5 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-pulse/10 text-sm font-black text-pulse">{index + 1}</div>
                <p className="text-sm font-black leading-6">{step}</p>
                {index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-pulse lg:block" />}
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-pulse/20 bg-pulse/[0.055] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-pulse">Example Flow</p>
              <ul className="mt-5 grid gap-3 text-sm text-white/66">
                {['$HBANK buy occurs', 'Project buy fee is collected', 'Fee vault receives the fee', 'Donation wallet prepares distribution', 'Four recipients receive 25% allocation each'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-pulse" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/38">Implementation note</p>
              <p className="mt-4 text-sm leading-7 text-white/60">
                The fee route is intended to be verifiable through public wallet reporting. Exact automation, timing and distribution logic are subject to final deployment and public token configuration.
              </p>
              <p className="mt-4 text-xs leading-6 text-white/38">
                {/* Connect real donation wallet transactions here using Solana RPC, Helius, Birdeye, or a custom indexer. */}
                On-chain integration placeholder: donation wallet transactions, fee collection events and report links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BankBets({ selectedBets, setSelectedBets }) {
  return (
    <section id="bank-bets" className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="Bank Bets" title="Social rounds. Meme sentiment." text="Bank Bets are community voting mechanics for memes and sentiment. No real-money betting in this demo." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {bankBets.map((bet) => (
          <div key={bet.id} className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex rounded-full border border-hot/25 bg-hot/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-hot">{bet.status}</div>
                <h3 className="mt-4 text-2xl font-black tracking-tight">{bet.title}</h3>
              </div>
              <Vote className="h-7 w-7 text-pulse" />
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-white/38">
                <span>Community sentiment</span>
                <span>{bet.sentiment}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#2AFF8E,#6DFFD2)]" style={{ width: `${bet.sentiment}%` }} />
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {bet.options.map((option) => {
                const active = selectedBets[bet.id] === option
                return (
                  <button key={option} onClick={() => setSelectedBets((prev) => ({ ...prev, [bet.id]: option }))} className={active ? 'btn-primary justify-center' : 'btn-secondary justify-center'}>
                    {active && <CheckCircle2 className="h-4 w-4" />} {option}
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-xs leading-6 text-white/42">Social voting only. No real-money betting, no financial advice and no prediction-market function.</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HealthScore() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="HealthBank Score" title="Build your wallet status" text="HealthBank Score is a community status mechanic based on holding behavior, participation and meme-bank activity. It does not guarantee rewards, profit or payouts." />
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-mint backdrop-blur-xl">
        <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.04] px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-white/42 sm:px-6">
          <span>Hold time</span>
          <span>Tier</span>
          <span className="text-right">Multiplier</span>
        </div>
        {scoreTiers.map(([time, tier, multiplier]) => (
          <div key={tier} className="grid grid-cols-3 items-center border-b border-white/10 px-4 py-4 last:border-b-0 sm:px-6">
            <span className="text-sm font-bold text-white/58">{time}</span>
            <span className="text-sm font-black text-white">{tier}</span>
            <span className="text-right text-lg font-black text-pulse">{multiplier}</span>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-white/45">Multiplier is a social status mechanic, not a yield promise.</p>
    </section>
  )
}

function Statement({ walletInput, setWalletInput, statement, generateStatement }) {
  return (
    <section id="statement" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-pulse/25 bg-pulse/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-pulse">Statement</div>
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Your HealthBank Statement</h2>
          <p className="mt-5 text-base leading-8 text-white/60">Enter a Solana wallet address to generate a demo HealthBank statement. This does not connect a wallet and does not read private data.</p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/54">
            Never enter your seed phrase or private key. HealthBank will never ask for wallet recovery data.
          </div>
        </div>
        <div className="glass-card p-6">
          <label htmlFor="wallet" className="text-sm font-black text-white/70">Solana wallet address</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input id="wallet" value={walletInput} onChange={(event) => setWalletInput(event.target.value)} placeholder="Enter Solana wallet address" className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/25 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/24 focus:border-pulse/50" />
            <button onClick={generateStatement} className="btn-primary justify-center px-6">
              Generate Statement
            </button>
          </div>
          <div className="mt-6 rounded-[1.75rem] border border-pulse/20 bg-black/25 p-5">
            {statement ? (
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-pulse">Demo Account</p>
                    <h3 className="mt-2 text-2xl font-black">{statement.wallet}</h3>
                  </div>
                  <Wallet className="h-8 w-8 text-pulse" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['$HBANK Balance', statement.balance],
                    ['Days Held', statement.daysHeld],
                    ['HealthBank Score', statement.score],
                    ['Charity Fee Impact', statement.impact],
                    ['Tier', statement.tier],
                    ['Status', statement.status],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-xs text-white/38">{label}</p>
                      <p className="mt-2 text-sm font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid min-h-64 place-items-center text-center">
                <div>
                  <FileText className="mx-auto h-10 w-10 text-pulse" />
                  <p className="mt-4 text-xl font-black">Statement waiting</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">Generate a read-only demo statement with wallet status, score and charity-fee impact placeholders.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Tokenomics() {
  return (
    <section id="tokenomics" className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="Tokenomics" title="Simple, transparent placeholders" text="Final fee settings, liquidity structure and token configuration will be published before launch." />
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokenomics.map(([label, value]) => (
          <div key={label} className="glass-card p-5">
            <p className="text-sm text-white/42">{label}</p>
            <p className="mt-2 text-lg font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Roadmap() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="Roadmap" title="Launch, route, report" text="A phased rollout for brand, token launch, fee-routing reports and social meme-bank mechanics." />
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-5">
        {roadmap.map((phase, index) => (
          <div key={phase.title} className="glass-card p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-pulse">{phase.phase}</p>
            <h3 className="mt-3 text-xl font-black">{phase.title}</h3>
            <ul className="mt-5 grid gap-3">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-white/55">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pulse" /> {item}
                </li>
              ))}
            </ul>
            {index < roadmap.length - 1 && <div className="mt-6 h-px bg-gradient-to-r from-pulse/60 to-transparent lg:hidden" />}
          </div>
        ))}
      </div>
    </section>
  )
}

function Transparency() {
  const cards = [
    ['Public Wallets', 'Donation and fee wallets should be publicly listed for community verification.', Wallet],
    ['On-Chain Reports', 'Donation flows should be trackable through Solana explorers and regular transparency updates.', FileText],
    ['No Seed Phrases', 'HealthBank will never ask users for private keys, seed phrases or wallet recovery data.', LockKeyhole],
    ['Independent Recipients', 'Listed charities are independent recipients selected for the project fee-donation concept.', ShieldCheck],
  ]
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="Security" title="Transparency first" text="The site is designed to highlight public reporting, wallet safety and verifiable donation records." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(([title, text, Icon]) => (
          <div key={title} className="glass-card p-6">
            <Icon className="h-7 w-7 text-pulse" />
            <h3 className="mt-4 text-xl font-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionIntro eyebrow="FAQ" title="Read before you ape" text="Plain-language answers for the HealthBank fee-donation concept." />
      <div className="mx-auto grid max-w-4xl gap-3">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl open:border-pulse/25">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black">
              {q}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-pulse transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-sm leading-7 text-white/58">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function Footer({ navLinks, copyText }) {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/54">
              $HBANK is a community memecoin. HealthBank is not a bank, financial institution, investment product, medical provider, charity organization or gambling platform. Nothing on this website is financial, legal or medical advice. Listed organizations are independent donation recipients selected for the project fee-donation concept. Fee routing, donation execution and transparency reporting are subject to final token configuration, public wallet setup and on-chain verification. Never share your seed phrase or private keys.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.22em] text-white/40">Quick links</h4>
              <div className="mt-4 grid gap-3">
                {navLinks.map(([label, href]) => (
                  <a key={href} href={href} className="text-sm font-semibold text-white/62 transition hover:text-pulse">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.22em] text-white/40">Launch links</h4>
              <div className="mt-4 grid gap-3">
                {[
                  ['Buy', LINKS.BUY_LINK],
                  ['Dexscreener', LINKS.DEXSCREENER_LINK],
                  ['Telegram', LINKS.TELEGRAM_LINK],
                  ['X', LINKS.X_LINK],
                  ['Docs', LINKS.DOCS_LINK],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-white/62 transition hover:text-pulse">
                    {label} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
                <button onClick={() => copyText(LINKS.CONTRACT_ADDRESS, 'Contract')} className="btn-secondary mt-2 justify-center">
                  <Copy className="h-4 w-4" /> Copy CA
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 HealthBank. Built for Solana meme culture.</p>
          <p>Contract: {shortAddress(LINKS.CONTRACT_ADDRESS)}</p>
        </div>
      </div>
    </footer>
  )
}

function Toast({ message }) {
  return (
    <motion.div initial={false} animate={{ opacity: message ? 1 : 0, y: message ? 0 : 18 }} className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-pulse/25 bg-ink/90 px-5 py-3 text-sm font-black text-pulse shadow-glow backdrop-blur-xl">
      {message || 'Copied'}
    </motion.div>
  )
}

export default App
