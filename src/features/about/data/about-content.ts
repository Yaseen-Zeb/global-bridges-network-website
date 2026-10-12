/**
 * About page copy and imagery (approved Figma design).
 * Images live in /public/images/about.
 */

const IMG = "/images/about";

export const ABOUT_HERO = {
  eyebrow: "Who We Are",
  title: ["Building Belonging.", "Creating Opportunity."],
  description:
    "Global Bridges Network was founded by two former refugees. They know firsthand what it takes to start over, to leave everything behind and rebuild a life from scratch. That experience is the foundation of everything we do: the belief that every person deserves to feel safe, valued, and empowered, no matter where they come from. Give people real opportunity and support, and they don’t just get by. They thrive, and they strengthen the communities around them in the process.",
  // Background slideshow: each photo drifts slowly, then cross-fades into the next.
  images: [
    { src: `${IMG}/hero-circle.jpg`, alt: "A diverse group of people standing in a circle with their hands joined at the centre" },
    { src: `${IMG}/hero-camp.jpg`, alt: "A woman carrying a water bucket between rows of tents in a camp" },
  ],
};

export const MISSION_VISION = [
  {
    eyebrow: "Our Mission",
    title: ["Helping People", "Build Better Futures"],
    description:
      "Global Bridges Network empowers refugees, immigrants, asylees, and vulnerable individuals and families through resettlement assistance, employment, education, legal support, healthcare access, women’s empowerment, and community partnerships.",
  },
  {
    eyebrow: "Our Vision",
    title: ["A Future Where", "Everyone Can Thrive"],
    description:
      "We envision a world where every person can live with dignity, pursue their dreams, and feel that they truly belong. Stronger communities grow when people from different cultures, backgrounds, and generations have the opportunity to understand, contribute, and flourish together.",
  },
];

export const CORE_VALUES = {
  eyebrow: "Values",
  title: "Our Core Values",
  description: "Comprehensive local resettlement programs paired with global women empowerment initiatives.",
  image: { src: `${IMG}/core-values.jpg`, alt: "Wooden blocks stacked like rising steps beneath an upward arrow" },
  // Only "Compassion" copy is visible in the design; the rest are drafts to confirm with the client.
  items: [
    {
      id: "compassion",
      title: "Compassion",
      description:
        "People come first, always. We meet everyone with kindness, empathy, and respect, because every journey looks different, and every story deserves to be heard.",
    },
    {
      id: "hope",
      title: "Hope",
      description:
        "We believe every new beginning holds possibility. We help people see a way forward and walk alongside them as they build it.",
    },
    {
      id: "empowerment",
      title: "Empowerment",
      description:
        "We focus on lasting independence, giving people the skills, resources, and confidence to shape their own futures.",
    },
    {
      id: "community",
      title: "Community",
      description:
        "No one should face a new start alone. We build connections between neighbours, partners, and cultures so everyone can belong and contribute.",
    },
    {
      id: "promise",
      title: "Our Promise",
      description:
        "We show up with consistency and care, honouring the trust people place in us and following through on every commitment we make.",
    },
    {
      id: "integrity",
      title: "Integrity",
      description:
        "We act with honesty, transparency, and accountability in everything we do, and we steward every resource responsibly.",
    },
  ],
};

export const WHAT_WE_DO = {
  eyebrow: "What We Do",
  highlight: "Support",
  titleRest: "That",
  titleLine2: "Creates Opportunity",
  description:
    "We connect refugees, immigrants, and vulnerable communities with essential services, resources, and opportunities to move forward.",
  services: [
    {
      title: ["Refugee &", "Immigrant Support"],
      description:
        "Supporting refugees and immigrants with resettlement assistance, community orientation, and the resources they need to begin again.",
      layout: "featured",
    },
    {
      title: ["Overseas Women Empowerment"],
      description:
        "Empowering women through skills, resources, opportunities, and community partnerships that support greater independence.",
      layout: "wide",
    },
    {
      title: ["Legal Guidance"],
      description:
        "Connecting individuals and families with legal support and guidance to help them navigate important processes and challenges.",
      layout: "default",
    },
    {
      title: ["Health Navigation"],
      description: "Helping individuals and families access healthcare resources and navigate the services they need.",
      layout: "default",
    },
    {
      title: ["Employment Readiness"],
      description:
        "Connecting people with employment and vocational opportunities that support greater independence and self sufficiency.",
      layout: "default",
    },
    {
      title: ["Resettlement Services"],
      description:
        "Helping newly arrived individuals and families navigate resettlement and access the resources they need to establish their lives.",
      layout: "default",
    },
    {
      title: ["Education & Literacy"],
      description:
        "Connecting people with education, skills, and opportunities that support personal growth and long term independence.",
      layout: "default",
    },
  ],
} as const;

export const FOUNDERS_JOURNEY = {
  eyebrow: "Founders Journey",
  title: ["From Experience", "to Empowerment"],
  description:
    "Global Bridges Network grew from lived experience and decades of service into an organization focused on helping people build safe, healthy, and self sufficient lives.",
  milestones: [
    {
      eyebrow: "Where It Started",
      title: ["A Mission Rooted", "in Experience"],
      description:
        "Our founders are former refugees who understand the challenges of starting over. Their personal experiences shaped a commitment to help others find safety, opportunity, and a sense of belonging.",
      image: { src: `${IMG}/journey-start.jpg`, alt: "A hand pinning notes to a planning board", width: 900, height: 1350 },
    },
    {
      eyebrow: "Years of Service",
      title: ["Experience That", "Created Impact"],
      description:
        "Before Global Bridges Network, our founders spent decades serving refugees, immigrants, and vulnerable communities through resettlement, employment, education, humanitarian assistance, and community development.",
      image: { src: `${IMG}/journey-impact.jpg`, alt: "A team reviewing notes together around an office desk", width: 1200, height: 801 },
    },
    {
      eyebrow: "Global Bridges Network",
      title: ["A Broader", "Commitment"],
      description:
        "Today, Global Bridges Network brings this experience together to connect refugees, immigrants, asylees, and vulnerable families with the resources and opportunities they need to thrive and contribute to their communities.",
      image: { src: `${IMG}/journey-commitment.jpg`, alt: "Staff working in the Global Bridges Network office", width: 1200, height: 800 },
    },
    {
      eyebrow: "Looking Ahead",
      title: ["Creating Communities", "Where Everyone Belongs"],
      description:
        "The journey continues with a vision of stronger communities where people can live with dignity, pursue their dreams, and feel that they truly belong.",
      image: { src: `${IMG}/journey-ahead.jpg`, alt: "Hands stacked together in unity", width: 1200, height: 800 },
    },
  ],
};

export const LEADERSHIP = {
  eyebrow: "Leadership",
  title: ["Our Founders &", "Leadership Team"],
  description: "Guided by dedicated advocates with deep experience in international dialogue and community service.",
  members: [
    {
      name: "Hameed Girowal",
      role: "Co-Founder and CEO",
      image: `${IMG}/team-hameed-girowal.jpg`,
      bio: [
        "Hameed Girowal is an accomplished executive leader with more than 20 years of experience in nonprofit management, refugee resettlement, humanitarian assistance, and community development. Throughout his career, he has led complex programs and diverse teams dedicated to serving refugees, immigrants, and other vulnerable populations.",
        "Hameed holds a Bachelor of Business Administration. A former refugee himself, Hameed brings both personal understanding and professional expertise to his work. Prior to coming to the United States, he spent nearly a decade supporting the U.S. mission in Afghanistan, working alongside U.S. government and military partners in administrative, operational, and cross-cultural roles.",
        "As a nonprofit executive, he has successfully developed and expanded programs in refugee resettlement, employment, education, workforce development, legal services, and women’s empowerment, while strengthening partnerships with government agencies, community organizations, employers, and other stakeholders.",
      ],
    },
    {
      name: "Dr. Mamadou Sy",
      role: "Co-Founder and President",
      image: `${IMG}/team-mamadou-sy.jpg`,
      bio: [
        "Dr. Mamadou Sy is an accomplished executive leader with more than 20 years of experience in human services, nonprofit management, and the U.S. Refugee Admissions Program. Throughout his career, he has led complex, mission-driven organizations dedicated to serving refugees, immigrants, and other vulnerable populations.",
        "A former refugee himself, Dr. Sy has helped advance services that supported the successful resettlement and integration of more than 15,000 refugees in Virginia, Maryland, and Washington D.C.",
        "Dr. Sy holds a Ph.D. in Egyptology from Cheikh Anta Diop University in Dakar, Senegal. His dedication to public service is reflected in a range of civic leadership roles, including serving as a Commissioner on the Maryland Governor’s Commission on African Affairs, Chair of the Workforce Development Subcommittee for the Baltimore Mayor’s New Americans Task Force, a member of the Virginia Department of Behavioral Health and Developmental Services’ Cultural and Linguistic Competency Advisory Committee, and a member of the Maryland Governor’s Immigrant Rights Task Force-Crime Victims Subcommittee.",
      ],
    },
    {
      name: "Raymond R. Rawlins",
      role: "Chief Financial Officer",
      image: `${IMG}/team-raymond-rawlins.jpg`,
      bio: [
        "Raymond Rawlins is an accomplished Chief Financial Officer and Board Treasurer with more than two decades of experience strengthening the financial health, governance, and long-term sustainability of nonprofit, government, and private sector organizations. Known for delivering 23 consecutive clean audits and guiding multiple institutions from deficit to surplus, he brings a proven record of strategic financial leadership, operational transformation, and disciplined stewardship of public and philanthropic resources. His career reflects a deep commitment to transparency, accountability, and the responsible management of charitable and stewarded assets. He has solid experience in accounting and finance and guided organizations through fiscal recovery, restructuring, and growth to ensure financial sustainability. He has provided Federal regulations compliance training to all staff and board of directors, managed budgets from $7 million to $450 million and completed year-end audits with no findings in the last four years.",
      ],
    },
  ],
};
