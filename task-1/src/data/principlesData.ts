import type { PrincipleItem } from '../types/principles';

export const principlesList: PrincipleItem[] = [
  {
    id: 'circle-of-competence',
    number: '01',
    title: 'My Circle of Competence',
    tagline: 'Know what you understand.',
    summary: 'The size of your circle does not matter; knowing where its perimeter lies is everything. During the late 90s dot-com bubble, Wall Street analysts mocked Charlie and me for avoiding tech startups. I simply told them: I have no idea who will win or what these businesses will earn in ten years. If it’s outside my circle, I throw it in the "Too Hard" pile and move on.',
    coreRule: 'Never invest in a business you cannot understand. If you have to guess, pass.',
    breakdown: [
      {
        label: 'My Boundary Rule',
        description: 'I draw a sharp line between what I understand with near certainty versus what I merely have an opinion on.',
      },
      {
        label: 'The "Too Hard" Tray',
        description: 'If analyzing a business requires intricate forecasting or advanced tech predictions, I toss the prospectus straight into my "Too Hard" tray.',
      },
      {
        label: 'Predictable Human Habits',
        description: 'I stick to products people will still crave 20 years from today—whether it’s an ice-cold Coca-Cola, See’s chocolates, auto insurance, or an iPhone.',
      },
    ],
    visualType: 'circle',
  },
  {
    id: 'economic-moat',
    number: '02',
    title: 'The Economic Moat',
    tagline: 'Find businesses that can defend their castle.',
    summary: 'In a capitalist economy, high returns on capital are like honey to bees—they attract aggressive competitors who want to steal your profits. Charlie and I look for businesses with wide, durable economic moats that protect the castle against invading hordes year after year.',
    coreRule: 'I want an economic castle surrounded by an unbreachable moat, with an honest, able duke in charge.',
    breakdown: [
      {
        label: 'Pricing Power',
        description: 'If you have the power to raise prices without holding a prayer meeting or losing business to competitors, you own a wonderful company (like See’s Candies or Apple).',
      },
      {
        label: 'High Switching Costs',
        description: 'Customers face significant friction, financial pain, or operational headache if they try to switch to a rival.',
      },
      {
        label: 'Low-Cost Production Engine',
        description: 'Structural cost advantages—like GEICO’s low operational expense ratio—that rivals cannot match.',
      },
      {
        label: 'Network Effects',
        description: 'Every incremental user makes the network more valuable to all existing participants, as with American Express.',
      },
    ],
    visualType: 'moat',
  },
  {
    id: 'margin-of-safety',
    number: '03',
    title: 'The Margin of Safety',
    tagline: 'Price is what you pay. Value is what you get.',
    summary: 'My mentor Ben Graham taught me the three most important words in investing: Margin of Safety. You do not drive a 9,900-pound truck across a bridge rated for exactly 10,000 pounds. You look for a bridge posted for 30,000 pounds. That cushion protects my partners and me from bad luck, recessions, and analytical errors.',
    coreRule: 'Pay a price substantially below what the business is conservatively worth in cash.',
    breakdown: [
      {
        label: 'Intrinsic Value',
        description: 'The total discounted cash that can be extracted from a business between now and judgment day.',
      },
      {
        label: 'Mr. Market',
        description: 'The manic-depressive partner who quotes you prices every day. You never have to take his offer unless it works in your favor!',
      },
      {
        label: 'My Safety Cushion',
        description: 'The wider the gap between the price I pay and the conservative cash value of the business, the higher our returns and the lower our risk.',
      },
    ],
    visualType: 'margin',
  },
  {
    id: 'long-term-thinking',
    number: '04',
    title: 'My Long-Term Horizon',
    tagline: 'Time is the friend of the wonderful business.',
    summary: 'Wall Street measures performance by the quarter; Charlie and I measure it by the quarter-century. If you are not willing to own a stock for ten years, do not even think about owning it for ten minutes. When you own a piece of an extraordinary enterprise, the stock market’s daily gyrations are utterly irrelevant.',
    coreRule: 'Buy wonderful businesses, hold them through thick and thin, and let compounding do the heavy lifting.',
    breakdown: [
      {
        label: 'My Favorite Holding Period',
        description: '"Forever" — allowing earnings to compound tax-deferred inside Berkshire without paying unnecessary tolls to the government.',
      },
      {
        label: 'Inaction as My Superpower',
        description: 'Lethargy bordering on sloth remains the cornerstone of our investment style. You don’t make money by trading; you make it by waiting.',
      },
      {
        label: 'Ignoring Macroeconomic Noise',
        description: 'I never make an investment based on interest rate guesses, political elections, or economic forecasts. Nobody knows where they’re heading anyway.',
      },
    ],
    visualType: 'timeline',
  },
];
