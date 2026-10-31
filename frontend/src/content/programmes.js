import media from "./media-library.json";

const image = (id) => media.assets.find((asset) => asset.id === id);

export const programmes = [
  {
    slug: "agriculture",
    number: "01",
    title: "Modern Agriculture and Agribusiness Development",
    shortDescription:
      "The Foundation aims to improve agricultural productivity and profitability by promoting modern farming technologies and practices from planting to marketing.",
    previewImage: image("MSEF-06"),
    intro:
      "Supporting stronger livelihoods through farming knowledge, sustainable production, and opportunities across the agricultural value chain.",
    focus: [
      "Climate-smart farming methods and locally relevant growing practices.",
      "Soil and water management, appropriate seeds, and suitable technology.",
      "Value addition, food processing, packaging, and storage.",
      "Collective approaches and connections to reliable markets.",
    ],
    image: media.assets.find((asset) => asset.id === "MSEF-06"),
    imageCaption: "A farmer in a cultivated maize field.",
    note: "The Foundation Profile identifies these as areas of work. Ask MSEF which activities are currently available.",
  },
  {
    slug: "youth-and-recovery",
    number: "02",
    title: "Alcohol and Substance Abuse Mitigation and Youth Empowerment",
    shortDescription:
      "The Foundation seeks to reduce alcohol and substance abuse among young people and other vulnerable members of society through prevention, rehabilitation, counseling, mentorship, and community support.",
    previewImage: image("MSEF-15"),
    intro:
      "Supporting young people and communities through knowledge, mentorship, life skills, and recovery-related support pathways.",
    focus: [
      "Prevention education and awareness about alcohol and substance use.",
      "Mentorship, life skills, and positive community engagement.",
      "Family and community participation in supportive environments.",
      "Recovery-related work guided by appropriate professional expertise and safeguarding.",
    ],
    note: "The availability of rehabilitation, counselling, or clinical services has not been confirmed. This website is not an emergency service.",
  },
  {
    slug: "education-and-skills",
    number: "03",
    title: "Education, Skills Development, and Vocational Training",
    shortDescription:
      "The Foundation aims to empower young people and other community members with practical skills that improve employability, entrepreneurship, and self-reliance.",
    previewImage: image("MSEF-16"),
    intro:
      "Creating pathways to practical learning, vocational skills, and knowledge that can support work and enterprise.",
    focus: [
      "Vocational and trade skills relevant to local opportunities.",
      "Technology, entrepreneurship, and practical learning.",
      "Connections to apprenticeships and appropriate training institutions.",
      "Skills development delivered with qualified trainers where required.",
    ],
    note: "Confirm current courses, training partners, and any certification before describing them as available.",
  },
  {
    slug: "environment",
    number: "04",
    title: "Environmental Conservation and Climate Change Mitigation",
    shortDescription:
      "The Foundation seeks to protect the environment, promote sustainable resource use, and help communities respond to the challenges of climate change.",
    previewImage: image("MSEF-09"),
    intro:
      "Encouraging communities to care for natural resources and respond to environmental change through practical local action.",
    focus: [
      "Tree planting, agroforestry, and environmental education.",
      "Soil conservation, water harvesting, and responsible water use.",
      "Community clean-ups, waste reduction, and recycling.",
      "Climate-smart agriculture and suitable renewable-energy approaches.",
    ],
    image: media.assets.find((asset) => asset.id === "MSEF-09"),
    imageCaption: "Community members planting a young tree.",
    note: "Activities depend on community priorities and available partnerships and resources. Confirm the event context before publication.",
  },
  {
    slug: "economic-empowerment",
    number: "05",
    title: "Economic Empowerment, Savings, Credit, and Investment",
    shortDescription:
      "The Foundation aims to promote financial inclusion and economic independence by encouraging collective savings, responsible lending, entrepreneurship, and investment.",
    previewImage: image("MSEF-14"),
    intro:
      "Building knowledge and opportunities that can support financial confidence, enterprise, and more sustainable livelihoods.",
    focus: [
      "Financial literacy, budgeting, and business planning.",
      "Entrepreneurship and income-generating activities.",
      "Collective savings and responsible investment approaches.",
      "Community-led economic development and enterprise skills.",
    ],
    note: "No savings or lending product is being offered through this website. Any financial initiative would depend on applicable laws, transparent policies, and available capital.",
  },
  {
    slug: "other-services",
    number: "06",
    title: "Other Services",
    shortDescription:
      "Alongside our core programme areas, the Foundation supports related community needs through responsive services and partnerships.",
    previewImage: image("MSEF-17"),
    intro:
      "The Foundation may contribute to additional community needs through relevant services and collaboration with local partners.",
    focus: [
      "Community support shaped by locally identified needs.",
      "Collaboration with organizations and service providers.",
      "Additional initiatives aligned with the Foundation’s purpose.",
    ],
    note: "Specific services and availability should be confirmed with MSEF before referral or participation.",
  },
];
